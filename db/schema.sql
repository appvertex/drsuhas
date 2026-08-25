-- Cloudflare D1 Database Schema
-- Dr. Suhas Website (Blogs & Gallery)

-- 1. Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  src TEXT NOT NULL,
  title TEXT NOT NULL,
  label TEXT NOT NULL,
  span TEXT DEFAULT 'normal',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Initial Seed Data for Blogs
INSERT OR IGNORE INTO blogs (id, slug, title, excerpt, content, date, author, category, image) VALUES
(
  '1',
  'understanding-laparoscopic-surgery',
  'Understanding Laparoscopic Surgery: What to Expect',
  'Laparoscopy has revolutionized surgery. Learn about the benefits of minimally invasive procedures, preparation, and what to expect during recovery.',
  'Laparoscopic surgery, often referred to as keyhole surgery, represents one of the most significant advancements in modern surgical practice. By utilizing small incisions typically ranging from 0.5 to 1.5 centimeters, surgeons insert a high-definition camera (laparoscope) and specialized instruments to perform complex operations with high visual precision.\n\n### Key Advantages of Laparoscopy\n- **Significantly Reduced Pain**: Smaller incisions lead to less tissue trauma and significantly reduced postoperative discomfort.\n- **Shorter Hospitalization**: Most patients are discharged within 24 to 48 hours following surgery.\n- **Faster Return to Daily Routine**: Patients generally resume normal daily activities within 1 to 2 weeks.\n- **Minimal Scarring**: Scars are minimal and fade considerably over time.\n\n### Preparing for Surgery\nPrior to laparoscopic surgery, Dr. Suhas conducts a thorough clinical evaluation, pre-operative blood work, and imaging. Detailed instructions regarding fasting and medication management are provided to ensure optimal patient safety.',
  'Oct 12, 2025',
  'Dr. Suhas S Kumar',
  'Laparoscopy',
  'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=800&q=80'
),
(
  '2',
  'recovery-after-hernia-repair',
  'Recovery After Hernia Repair: A Patient Guide',
  'A successful recovery depends heavily on post-operative care. Read our comprehensive guide on resting, movement, and returning to daily activities safely.',
  'Recovering from hernia repair requires a balanced approach between rest and gentle, progressive movement. Whether undergoing laparoscopic mesh repair or traditional open surgery, adhering to medical guidelines accelerates healing and minimizes recurrence risk.\n\n### Post-Operative Care Guidelines\n- **Avoid Heavy Lifting**: Refrain from lifting anything over 5 kg for at least 4 to 6 weeks.\n- **Wound Care**: Keep the incision site clean and dry. Follow dressing change instructions meticulously.\n- **Dietary Management**: Maintain a high-fiber diet and stay well-hydrated to prevent constipation and strain on abdominal muscles.\n- **Gradual Activity**: Gentle walking is encouraged from the first day to promote circulation and prevent blood clots.',
  'Sep 28, 2025',
  'Dr. Suhas S Kumar',
  'Hernia Care',
  'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'
),
(
  '3',
  'managing-diabetic-foot-ulcers',
  'Managing Diabetic Foot Ulcers: Treatment and Care',
  'Diabetic foot complications require immediate, expert attention. Learn about wound care, infection control, and when surgical intervention is necessary.',
  'Diabetic foot ulcers are serious complications of diabetes requiring prompt multidisciplinary care. Poor blood circulation and peripheral neuropathy mean minor injuries can escalate quickly if unmonitored.\n\n### Prevention & Daily Inspection\n- Inspect feet daily for cuts, blisters, redness, or swelling.\n- Keep feet clean and well-moisturized (avoiding between toes).\n- Wear comfortable, well-fitted footwear designed for diabetic feet.\n\n### Clinical & Surgical Management\nEarly surgical debridement of non-viable tissue, specialized offloading dressings, and strict glycemic control are key steps to promote ulcer healing and prevent limb loss.',
  'Aug 15, 2025',
  'Dr. Suhas S Kumar',
  'Diabetic Foot',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
),
(
  '4',
  'varicose-veins-laser-vs-traditional',
  'Varicose Veins: Modern Laser vs Traditional Surgery',
  'Explore the differences between endovenous laser treatment and traditional surgical vein stripping, focusing on recovery times and clinical outcomes.',
  'Varicose veins cause pain, leg heaviness, and aesthetic concerns. Modern endovenous laser ablation (EVLA) has transformed vascular surgical care.\n\n### Laser Ablation vs Open Stripping\n- **Laser Treatment (EVLA)**: Performed under local anesthesia as a day-care procedure. Uses thermal energy to seal diseased veins internally. No large incisions or stitches required.\n- **Recovery Comparison**: Patients undergoing laser treatment walk out immediately after the procedure and resume work within 48 hours, compared to 2-3 weeks for traditional vein stripping.',
  'Jul 22, 2025',
  'Dr. Suhas S Kumar',
  'Vein Surgery',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
);

-- 4. Initial Seed Data for Gallery
INSERT OR IGNORE INTO gallery (id, src, title, label, span) VALUES
('g1', '/images/hero-doctor.png', 'Dr. Suhas S Kumar', 'Consultant General & Laparoscopic Surgeon', 'tall'),
('g2', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80', 'Advanced Operating Theatre', 'State-of-the-Art Surgical Suite', 'wide'),
('g3', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80', 'Clinical Consultation', 'Personalized Care & Diagnostics', 'tall'),
('g4', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80', 'Minimal Access Surgery', 'Precision Laparoscopic Tools', 'normal'),
('g5', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', 'Interdisciplinary Team', 'Collaborative Surgical Care', 'normal'),
('g6', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', 'Diagnostic Excellence', 'High-Resolution Medical Imaging', 'normal'),
('g7', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', 'Recovery & Care Unit', 'Monitored Post-Op Environment', 'wide'),
('g8', 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=800&q=80', 'Endo-Surgery Facility', 'Advanced Laparoscopic Tower', 'tall'),
('g9', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80', 'Clinical Research', 'Evidence-Based Practice', 'normal');
