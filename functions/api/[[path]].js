/**
 * Cloudflare Pages Functions API Handler (`functions/api/[[path]].js`)
 * 
 * Endpoints handled:
 *  - POST   /api/auth/login     -> Password verification
 *  - GET    /api/blogs          -> Get all blogs from D1
 *  - POST   /api/blogs          -> Create blog in D1
 *  - PUT    /api/blogs/:id      -> Update blog in D1
 *  - DELETE /api/blogs/:id      -> Delete blog from D1
 *  - GET    /api/gallery        -> Get all gallery items from D1
 *  - POST   /api/gallery        -> Create gallery item in D1
 *  - PUT    /api/gallery/:id    -> Update gallery item in D1
 *  - DELETE /api/gallery/:id    -> Delete gallery item from D1
 *  - POST   /api/upload         -> Upload image file to Cloudflare R2 bucket
 *  - GET    /api/images/:key    -> Serve image file from Cloudflare R2 bucket
 */

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // If request is NOT for /api/*, delegate directly to static asset router (index.html)
  if (!url.pathname.startsWith('/api')) {
    return context.next();
  }

  const path = url.pathname.replace(/^\/api\/?/, '').split('/').filter(Boolean);
  const method = request.method;

  // CORS Headers for API
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  function errorResponse(message, status = 400) {
    return jsonResponse({ error: message }, status);
  }

  try {
    // -------------------------------------------------------------
    // AUTHENTICATION: POST /api/auth/login
    // -------------------------------------------------------------
    if (path[0] === 'auth' && path[1] === 'login' && method === 'POST') {
      const body = await request.json();
      const expectedPassword = env.ADMIN_PASSWORD || 'admin123';
      if (body.password === expectedPassword) {
        return jsonResponse({ success: true, token: 'authenticated' });
      }
      return errorResponse('Invalid password', 401);
    }

    // -------------------------------------------------------------
    // R2 IMAGE UPLOAD: POST /api/upload
    // -------------------------------------------------------------
    if (path[0] === 'upload' && method === 'POST') {
      if (!env.IMAGES_BUCKET) {
        return errorResponse('R2 Storage Bucket (IMAGES_BUCKET) not configured', 500);
      }

      const formData = await request.formData();
      const file = formData.get('file');

      if (!file) {
        return errorResponse('No file uploaded', 400);
      }

      // Generate unique file key
      const fileExt = file.name.split('.').pop() || 'png';
      const key = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

      // Upload binary to Cloudflare R2
      await env.IMAGES_BUCKET.put(key, file.stream(), {
        httpMetadata: {
          contentType: file.type || 'image/jpeg',
        },
      });

      // Construct public image URL
      const imageUrl = `${url.origin}/api/images/${key}`;
      return jsonResponse({ success: true, url: imageUrl, key });
    }

    // -------------------------------------------------------------
    // R2 IMAGE SERVING: GET /api/images/:key
    // -------------------------------------------------------------
    if (path[0] === 'images' && path[1] && method === 'GET') {
      if (!env.IMAGES_BUCKET) {
        return errorResponse('R2 Storage Bucket (IMAGES_BUCKET) not configured', 500);
      }

      const key = path[1];
      const object = await env.IMAGES_BUCKET.get(key);

      if (!object) {
        return new Response('Image not found', { status: 404 });
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      Object.entries(corsHeaders).forEach(([k, v]) => headers.set(k, v));

      return new Response(object.body, { headers });
    }

    // -------------------------------------------------------------
    // BLOGS API
    // -------------------------------------------------------------
    if (path[0] === 'blogs') {
      if (!env.DB) {
        return errorResponse('D1 Database (DB) not configured', 500);
      }

      // GET /api/blogs
      if (method === 'GET') {
        const { results } = await env.DB.prepare('SELECT * FROM blogs ORDER BY created_at DESC').all();
        return jsonResponse(results || []);
      }

      // POST /api/blogs
      if (method === 'POST') {
        const body = await request.json();
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const slug = body.slug || `${Date.now()}`;

        await env.DB.prepare(`
          INSERT INTO blogs (id, slug, title, excerpt, content, date, author, category, image)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          id,
          slug,
          body.title || 'Untitled',
          body.excerpt || '',
          body.content || '',
          body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          body.author || 'Dr. Suhas S Kumar',
          body.category || 'General',
          body.image || ''
        ).run();

        const newPost = { ...body, id, slug };
        return jsonResponse(newPost, 201);
      }

      // PUT /api/blogs/:id
      if (method === 'PUT' && path[1]) {
        const id = path[1];
        const body = await request.json();

        await env.DB.prepare(`
          UPDATE blogs
          SET title = ?, excerpt = ?, content = ?, date = ?, author = ?, category = ?, image = ?
          WHERE id = ?
        `).bind(
          body.title,
          body.excerpt,
          body.content,
          body.date,
          body.author,
          body.category,
          body.image,
          id
        ).run();

        return jsonResponse({ success: true, id });
      }

      // DELETE /api/blogs/:id
      if (method === 'DELETE' && path[1]) {
        const id = path[1];
        await env.DB.prepare('DELETE FROM blogs WHERE id = ?').bind(id).run();
        return jsonResponse({ success: true, id });
      }
    }

    // -------------------------------------------------------------
    // GALLERY API
    // -------------------------------------------------------------
    if (path[0] === 'gallery') {
      if (!env.DB) {
        return errorResponse('D1 Database (DB) not configured', 500);
      }

      // GET /api/gallery
      if (method === 'GET') {
        const { results } = await env.DB.prepare('SELECT * FROM gallery ORDER BY created_at DESC').all();
        return jsonResponse(results || []);
      }

      // POST /api/gallery
      if (method === 'POST') {
        const body = await request.json();
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

        await env.DB.prepare(`
          INSERT INTO gallery (id, src, title, label, span)
          VALUES (?, ?, ?, ?, ?)
        `).bind(
          id,
          body.src || '',
          body.title || 'Untitled',
          body.label || '',
          body.span || 'normal'
        ).run();

        const newItem = { ...body, id };
        return jsonResponse(newItem, 201);
      }

      // PUT /api/gallery/:id
      if (method === 'PUT' && path[1]) {
        const id = path[1];
        const body = await request.json();

        await env.DB.prepare(`
          UPDATE gallery
          SET src = ?, title = ?, label = ?, span = ?
          WHERE id = ?
        `).bind(
          body.src,
          body.title,
          body.label,
          body.span,
          id
        ).run();

        return jsonResponse({ success: true, id });
      }

      // DELETE /api/gallery/:id
      if (method === 'DELETE' && path[1]) {
        const id = path[1];
        await env.DB.prepare('DELETE FROM gallery WHERE id = ?').bind(id).run();
        return jsonResponse({ success: true, id });
      }
    }

    return errorResponse('Route not found', 404);
  } catch (err) {
    return errorResponse(err.message || 'Internal Server Error', 500);
  }
}
