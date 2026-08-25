# Cloudflare Deployment Guide (Pages + Workers + D1 + R2)

This project is built to run on Cloudflare's serverless stack:
- **Frontend**: Cloudflare Pages
- **Backend API**: Cloudflare Workers / Pages Functions (`functions/api/[[path]].js`)
- **Database**: Cloudflare D1 (SQL)
- **Image Storage**: Cloudflare R2

---

## Step 1: Install Wrangler & Login to Cloudflare

If you haven't already, install Cloudflare `wrangler` CLI:
```bash
npm install -g wrangler
# or use npx wrangler
```

Log in to your Cloudflare account:
```bash
npx wrangler login
```

---

## Step 2: Create Cloudflare D1 Database

Run the command to create your D1 SQL database:
```bash
npx wrangler d1 create dr-suhas-db
```

Output will display your **database_id**. Copy that ID and paste it into `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "dr-suhas-db"
database_id = "PASTE_YOUR_D1_DATABASE_ID_HERE"
```

### Initialize Database Tables & Seed Data
Execute the SQL schema on your production D1 database:
```bash
npx wrangler d1 execute dr-suhas-db --file=./db/schema.sql
```

*(For local development testing with wrangler)*:
```bash
npx wrangler d1 execute dr-suhas-db --local --file=./db/schema.sql
```

---

## Step 3: Create Cloudflare R2 Storage Bucket

Create the R2 object storage bucket for images:
```bash
npx wrangler r2 bucket create dr-suhas-images
```

Verify your `wrangler.toml` binding match:
```toml
[[r2_buckets]]
binding = "IMAGES_BUCKET"
bucket_name = "dr-suhas-images"
```

---

## Step 4: Set Admin Password Secret

Set your custom secure admin password for production:
```bash
npx wrangler secret put ADMIN_PASSWORD
```
*(Enter your desired password when prompted)*

---

## Step 5: Deploy to Cloudflare Pages

Build the project and deploy directly to Cloudflare Pages:

```bash
# 1. Build React app
npm run build

# 2. Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=dr-suhas-site
```

Alternatively, link your GitHub Repository directly in the **Cloudflare Dashboard**:
1. Go to **Cloudflare Dashboard** -> **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
2. Select your repository.
3. Build Settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Under **Settings** -> **Functions** -> **D1 Database Bindings**:
   - Variable name: `DB`
   - D1 Database: `dr-suhas-db`
5. Under **Settings** -> **Functions** -> **R2 Bucket Bindings**:
   - Variable name: `IMAGES_BUCKET`
   - R2 Bucket: `dr-suhas-images`
6. Under **Settings** -> **Environment Variables**:
   - Add `ADMIN_PASSWORD` secret.

---

## ⚡ How it Works at Runtime

- Public site pages load posts and images from `/api/blogs` and `/api/gallery` backed by Cloudflare D1.
- Admin Panel uploads image files directly to Cloudflare R2 via `/api/upload`.
- Images are served instantly from Cloudflare R2 with global edge CDN caching via `/api/images/*`.
