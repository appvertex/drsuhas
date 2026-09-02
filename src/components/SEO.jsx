import { Helmet } from 'react-helmet-async';
import { siteSettings } from '../config/siteSettings';

const SITE_NAME = siteSettings.name;
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80';
const DEFAULT_DESCRIPTION = `Dr. Suhas S Kumar is a Consultant General & Laparoscopic Surgeon in Udupi, Karnataka, specialising in keyhole hernia repair, gallbladder surgery, thyroid, breast care, diabetic foot, and emergency abdominal surgery.`;
const DEFAULT_KEYWORDS = `General Surgeon in Udupi, Laparoscopic Surgeon in Udupi, Hernia Surgery Udupi, Gallbladder Surgery Udupi, Appendix Surgery Udupi, Breast Surgery Udupi, Thyroid Surgery Udupi, Diabetic Foot Care Udupi, Laparoscopic Cholecystectomy Udupi, Dr Suhas S Kumar`;

/**
 * SEO - Enterprise SEO component using react-helmet-async.
 * Manages dynamic <head> tags per page: title, meta, OG, Twitter, JSON-LD.
 *
 * @param {string}   title       - Page title (appended with | Site Name)
 * @param {string}   description - Meta description for this page
 * @param {string}   keywords    - Meta keywords for local SEO
 * @param {string}   image       - OG/Twitter image URL
 * @param {string}   pathname    - Route pathname for canonical URL
 * @param {object[]} schema      - Array of JSON-LD schema objects
 * @param {string}   robots      - Robots meta directive
 */
export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  pathname = '/',
  schema = [],
  robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Senior General & Laparoscopic Surgeon in Udupi`;
  const cleanSiteUrl = (siteSettings.siteUrl || '').replace(/\/$/, '');
  const cleanPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const canonicalUrl = `${cleanSiteUrl}${cleanPathname}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Favicon */}
      <link rel="icon" type="image/png" href={`${import.meta.env.BASE_URL}favicon.png`} />
      <link rel="icon" type="image/x-icon" href={`${import.meta.env.BASE_URL}favicon.ico`} />
      <link rel="apple-touch-icon" href={`${import.meta.env.BASE_URL}apple-touch-icon.png`} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {schema.map((entry, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(entry).replace(/</g, '\\u003c')}
        </script>
      ))}
    </Helmet>
  );
}
