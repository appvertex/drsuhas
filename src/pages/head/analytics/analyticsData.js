/**
 * analyticsData.js
 * ─────────────────────────────────────────────────────────────────
 * Rich Data Layer for Enterprise Analytics Dashboard.
 * Generates realistic metrics, time series, breakdown tables,
 * live real-time feeds, SEO rankings, and performance audits.
 */

export const DATE_RANGES = [
  { id: 'today',      label: 'Today' },
  { id: 'yesterday',  label: 'Yesterday' },
  { id: '7d',         label: 'Last 7 Days' },
  { id: '30d',        label: 'Last 30 Days' },
  { id: '90d',        label: 'Last 90 Days' },
  { id: 'this_month', label: 'This Month' },
  { id: 'last_month', label: 'Last Month' },
  { id: 'custom',     label: 'Custom Range' },
];

export const MOCK_KPIS = {
  visitors:       { value: 14280, prev: 12150, change: 17.5, trend: [420, 480, 510, 590, 620, 710, 680, 750, 820, 890, 940, 1020] },
  activeUsers:    { value: 24,    prev: 18,    change: 33.3, trend: [12, 15, 18, 22, 19, 24, 28, 24, 21, 25, 24] },
  sessions:       { value: 18940, prev: 16200, change: 16.9, trend: [580, 610, 690, 720, 780, 810, 890, 950, 1010, 1120] },
  pageViews:      { value: 42610, prev: 36800, change: 15.8, trend: [1200, 1350, 1420, 1580, 1710, 1890, 2010, 2150, 2300] },
  bounceRate:     { value: '31.4%', prev: '36.8%', change: -5.4, isGood: true, trend: [45, 42, 39, 38, 36, 35, 33, 31.4] },
  avgDuration:    { value: '3m 42s', prev: '3m 12s', change: 15.6, isGood: true, trend: [160, 175, 185, 195, 205, 210, 222] },
  conversions:    { value: 384,   prev: 310,   change: 23.8, isGood: true, trend: [12, 15, 18, 20, 24, 28, 32, 35, 41] },
  appointments:   { value: 142,   prev: 108,   change: 31.5, isGood: true, trend: [4, 6, 8, 7, 10, 12, 14, 15, 18] },
};

export const MOCK_TIMESERIES_DAILY = [
  { date: 'Mon',  visitors: 1240, sessions: 1680, pageViews: 3820, appointments: 12 },
  { date: 'Tue',  visitors: 1450, sessions: 1890, pageViews: 4150, appointments: 15 },
  { date: 'Wed',  visitors: 1620, sessions: 2100, pageViews: 4780, appointments: 19 },
  { date: 'Thu',  visitors: 1580, sessions: 2020, pageViews: 4510, appointments: 16 },
  { date: 'Fri',  visitors: 1890, sessions: 2410, pageViews: 5290, appointments: 24 },
  { date: 'Sat',  visitors: 2150, sessions: 2780, pageViews: 6120, appointments: 28 },
  { date: 'Sun',  visitors: 1950, sessions: 2540, pageViews: 5640, appointments: 22 },
];

export const MOCK_TRAFFIC_CHANNELS = [
  { channel: 'Organic Search', users: 7420, percent: 52, color: '#3b82f6', growth: '+18.4%' },
  { channel: 'Direct Access',   users: 3280, percent: 23, color: '#10b981', growth: '+12.1%' },
  { channel: 'Social Media',    users: 1850, percent: 13, color: '#8b5cf6', growth: '+28.6%' },
  { channel: 'Referrals',       users: 1140, percent: 8,  color: '#f59e0b', growth: '+8.2%' },
  { channel: 'Email Campaign',  users: 590,  percent: 4,  color: '#ec4899', growth: '+15.0%' },
];

export const MOCK_TOP_PAGES = [
  { path: '/', title: 'Home — Dr. Suhas S Kumar', views: 14250, users: 9810, avgTime: '2m 15s', bounce: '28.2%', conversion: '4.2%' },
  { path: '/services', title: 'Surgical Services Directory', views: 8420, users: 5610, avgTime: '3m 05s', bounce: '32.1%', conversion: '6.8%' },
  { path: '/about', title: 'About Dr. Suhas S Kumar', views: 6180, users: 4210, avgTime: '2m 48s', bounce: '30.5%', conversion: '3.9%' },
  { path: '/services/laparoscopic-surgery', title: 'Laparoscopic Surgery Specialist', views: 5210, users: 3840, avgTime: '4m 12s', bounce: '24.8%', conversion: '8.5%' },
  { path: '/services/hernia-surgery', title: 'Advanced Hernia Repair', views: 4120, users: 2950, avgTime: '3m 52s', bounce: '26.4%', conversion: '7.9%' },
  { path: '/contact', title: 'Book Appointment & Contact', views: 3890, users: 3120, avgTime: '2m 10s', bounce: '21.0%', conversion: '28.4%' },
  { path: '/gallery', title: 'Clinic & Surgical Suite Gallery', views: 2450, users: 1890, avgTime: '1m 55s', bounce: '34.2%', conversion: '3.1%' },
  { path: '/blog', title: 'Medical Articles & Health Guides', views: 1980, users: 1450, avgTime: '3m 30s', bounce: '38.0%', conversion: '2.5%' },
];

export const MOCK_SERVICES_ANALYTICS = [
  { name: 'Laparoscopic Surgery', views: 5210, appointments: 42, ctr: '8.5%', avgTime: '4m 12s', status: 'Top Performer' },
  { name: 'Hernia Repair', views: 4120, appointments: 33, ctr: '7.9%', avgTime: '3m 52s', status: 'High Growth' },
  { name: 'Gallbladder Surgery', views: 3450, appointments: 28, ctr: '8.1%', avgTime: '3m 40s', status: 'Stable' },
  { name: 'Gastrointestinal Care', views: 2890, appointments: 19, ctr: '6.5%', avgTime: '3m 15s', status: 'Stable' },
  { name: 'Diabetic Foot Care', views: 2410, appointments: 16, ctr: '6.6%', avgTime: '3m 50s', status: 'High Intent' },
  { name: 'Thyroid Surgery', views: 1980, appointments: 12, ctr: '6.0%', avgTime: '2m 58s', status: 'Stable' },
  { name: 'Varicose Vein Surgery', views: 1750, appointments: 10, ctr: '5.7%', avgTime: '2m 45s', status: 'Opportunity' },
  { name: 'Piles & Fissure Care', views: 1620, appointments: 9,  ctr: '5.5%', avgTime: '3m 05s', status: 'Stable' },
];

export const MOCK_DEVICES = [
  { device: 'Mobile', users: 8420, percent: 59, icon: '📱', color: '#3b82f6' },
  { device: 'Desktop', users: 5140, percent: 36, icon: '💻', color: '#10b981' },
  { device: 'Tablet',  users: 720,  percent: 5,  icon: '🖳', color: '#8b5cf6' },
];

export const MOCK_COUNTRIES = [
  { country: 'India', code: 'IN', flag: '🇮🇳', users: 12450, percent: '87.2%', city: 'Bengaluru' },
  { country: 'United States', code: 'US', flag: '🇺🇸', users: 620, percent: '4.3%', city: 'San Jose' },
  { country: 'United Arab Emirates', code: 'AE', flag: '🇦🇪', users: 410, percent: '2.9%', city: 'Dubai' },
  { country: 'United Kingdom', code: 'GB', flag: '🇬🇧', users: 310, percent: '2.2%', city: 'London' },
  { country: 'Singapore', code: 'SG', flag: '🇸🇬', users: 190, percent: '1.3%', city: 'Singapore' },
  { country: 'Australia', code: 'AU', flag: '🇦🇺', users: 140, percent: '1.0%', city: 'Sydney' },
];

export const MOCK_SEO_KEYWORDS = [
  { keyword: 'laparoscopic surgeon in bengaluru', position: 1.4, impressions: 8420, clicks: 1240, ctr: '14.7%' },
  { keyword: 'best hernia surgeon jayanagar', position: 1.8, impressions: 6150, clicks: 890, ctr: '14.5%' },
  { keyword: 'dr suhas s kumar general surgeon', position: 1.1, impressions: 4200, clicks: 1410, ctr: '33.5%' },
  { keyword: 'gallbladder stone surgery cost bengaluru', position: 2.3, impressions: 3890, clicks: 420, ctr: '10.8%' },
  { keyword: 'diabetic foot ulcer specialist bengaluru', position: 2.1, impressions: 2980, clicks: 310, ctr: '10.4%' },
  { keyword: 'laser treatment for fissure jayanagar', position: 1.6, impressions: 2450, clicks: 290, ctr: '11.8%' },
];

export const MOCK_CORE_WEB_VITALS = {
  lighthouse: 98,
  performance: 96,
  accessibility: 98,
  seo: 100,
  bestPractices: 96,
  metrics: [
    { name: 'Largest Contentful Paint (LCP)', value: '1.2s', status: 'Good', target: '< 2.5s', score: 98 },
    { name: 'Cumulative Layout Shift (CLS)', value: '0.01', status: 'Good', target: '< 0.1', score: 99 },
    { name: 'Interaction to Next Paint (INP)', value: '48ms', status: 'Good', target: '< 200ms', score: 96 },
    { name: 'First Contentful Paint (FCP)', value: '0.8s', status: 'Good', target: '< 1.8s', score: 99 },
    { name: 'Time to First Byte (TTFB)', value: '120ms', status: 'Good', target: '< 800ms', score: 97 },
  ]
};

export const MOCK_LIVE_EVENTS = [
  { id: 1, time: 'Just now', type: 'Appointment Request', desc: 'Patient requested consultation for Laparoscopic Surgery', location: 'Bengaluru, India', device: 'Mobile' },
  { id: 2, time: '2m ago', type: 'Page View', desc: 'Viewed /services/hernia-surgery', location: 'Bengaluru, India', device: 'Desktop' },
  { id: 3, time: '4m ago', type: 'Gallery View', desc: 'Opened Operating Theatre image in Lightbox', location: 'Dubai, UAE', device: 'Mobile' },
  { id: 4, time: '6m ago', type: 'Blog Read', desc: 'Reading "Comparative study of laparoscopic appendectomy"', location: 'San Jose, USA', device: 'Desktop' },
  { id: 5, time: '9m ago', type: 'Appointment Request', desc: 'Patient requested consultation for Gallbladder Surgery', location: 'Bengaluru, India', device: 'Mobile' },
  { id: 6, time: '12m ago', type: 'Contact Message', desc: 'Inquiry submitted regarding laser varicose vein care', location: 'London, UK', device: 'Mobile' },
];

export const MOCK_APPOINTMENTS_LIST = [
  { id: 'APT-1048', name: 'Ananya Rao', phone: '+91 98450 12345', service: 'Laparoscopic Surgery', date: '2026-08-27', time: 'Morning (10:00 AM)', status: 'Confirmed', source: 'Direct Form' },
  { id: 'APT-1047', name: 'Vikram Mehta', phone: '+91 97412 88900', service: 'Hernia Surgery', date: '2026-08-27', time: 'Evening (5:30 PM)', status: 'Confirmed', source: 'WhatsApp' },
  { id: 'APT-1046', name: 'Sujata Kulkarni', phone: '+91 99001 45678', service: 'Gallbladder Surgery', date: '2026-08-28', time: 'Morning (11:30 AM)', status: 'Pending', source: 'Organic Search' },
  { id: 'APT-1045', name: 'Rajesh Kumar', phone: '+91 98860 33445', service: 'Diabetic Foot Care', date: '2026-08-28', time: 'Evening (6:00 PM)', status: 'Pending', source: 'Direct Form' },
  { id: 'APT-1044', name: 'Pooja Hegde', phone: '+91 94480 77123', service: 'Thyroid Surgery', date: '2026-08-29', time: 'Morning (10:30 AM)', status: 'Completed', source: 'Referral' },
];
