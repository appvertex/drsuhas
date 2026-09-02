import { Helmet } from 'react-helmet-async';
import { siteSettings } from '../config/siteSettings';

const SITE_NAME = siteSettings.name;
const DEFAULT_IMAGE = 'https://www.surgeonsuhas.in/images/drsuhas.webp';
const DEFAULT_DESCRIPTION = `Dr. Suhas S Kumar is a Consultant General & Laparoscopic Surgeon in Bangalore, Karnataka, specialising in keyhole hernia repair, gallbladder surgery, thyroid, breast care, diabetic foot, and emergency abdominal surgery. Practicing at Deepak Hospital Jayanagar and Hemalatha Hospital Neelasandra.`;
const DEFAULT_KEYWORDS = `General Surgeon in Bangalore, Laparoscopic Surgeon in Bangalore, Hernia Surgery Bangalore, Gallbladder Surgery Bangalore, Appendix Surgery Bangalore, Breast Surgery Bangalore, Thyroid Surgery Bangalore, Diabetic Foot Care Bangalore, Laparoscopic Cholecystectomy Bangalore, Surgeon Jayanagar, Surgeon Neelasandra, Deepak Hospital Jayanagar surgeon, Hemalatha Hospital Neelasandra surgeon, Dr Suhas S Kumar`;

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
 * @param {string}   ogType      - Open Graph type (default: website)
 */
export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  pathname = '/',
  schema = [],
  robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  ogType = 'website',
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Senior General & Laparoscopic Surgeon in Bangalore`;
  const cleanSiteUrl = (siteSettings.siteUrl || 'https://www.surgeonsuhas.in').replace(/\/$/, '');
  const cleanPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const canonicalUrl = `${cleanSiteUrl}${cleanPathname}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="author" content={SITE_NAME} />
      <meta name="publisher" content={cleanSiteUrl} />
      <meta name="theme-color" content="#2D6BFF" />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Dr. Suhas" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Favicon */}
      <link rel="icon" type="image/png" href={`${import.meta.env.BASE_URL}favicon.png`} />
      <link rel="icon" type="image/x-icon" href={`${import.meta.env.BASE_URL}favicon.ico`} />
      <link rel="apple-touch-icon" href={`${import.meta.env.BASE_URL}apple-touch-icon.png`} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
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
