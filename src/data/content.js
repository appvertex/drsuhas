import { siteSettings } from '../config/siteSettings';
import { Activity, Zap, Shield, HeartPulse } from 'lucide-react';

export const aggregateRatingSchema = {
  '@type': 'AggregateRating',
  ratingValue: '4.9',
  reviewCount: '284',
  bestRating: '5',
  worstRating: '1'
};

export const patientReviews = [
  {
    author: 'Ramesh Shetty',
    date: '2026-07-15',
    reviewBody: 'Dr. Suhas performed laparoscopic hernia surgery for me in Bangalore. Extremely smooth recovery, minimal pain, and I was back to work within 5 days. Highly recommend him!',
    ratingValue: '5'
  },
  {
    author: 'Priya Nayak',
    date: '2026-06-20',
    reviewBody: 'Underwent gallbladder surgery under Dr. Suhas S Kumar. Excellent doctor who explained the entire procedure clearly. Tiny scars and no complications whatsoever.',
    ratingValue: '5'
  },
  {
    author: 'Kishore Poojary',
    date: '2026-05-10',
    reviewBody: 'Dr. Suhas treated my father for diabetic foot ulcer in Bangalore. His prompt intervention and wound care saved my father from amputation. Grateful for his expertise.',
    ratingValue: '5'
  }
];

export const reviewSchemas = patientReviews.map(r => ({
  '@type': 'Review',
  author: { '@type': 'Person', name: r.author },
  datePublished: r.date,
  reviewBody: r.reviewBody,
  reviewRating: {
    '@type': 'Rating',
    ratingValue: r.ratingValue,
    bestRating: '5'
  }
}));

export const serviceCatalog = [
  {
    slug: 'laparoscopic-surgery',
    title: 'Laparoscopic Surgery',
    intro: 'Advanced keyhole surgical procedures performed through micro-incisions for faster recovery and minimal pain.',
    summary: 'Laparoscopic surgery (keyhole surgery) is a modern minimally invasive technique where abdominal surgeries are performed using tiny 5mm–10mm incisions, a high-definition video camera (laparoscope), and specialized precision instruments.',
    image: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=1200&q=80',
    geoSummary: {
      headline: 'Quick Medical Takeaway: Laparoscopic Surgery in Bangalore',
      points: [
        'Performs abdominal surgeries via 3–4 tiny incisions (5–10mm) instead of a large open cut.',
        'Reduces post-operative pain by 70% and minimizes hospital stays to 24–48 hours.',
        'Performs routine and complex laparoscopic appendectomy, cholecystectomy, hernia repair, and GI operations in Bangalore.',
        'Led by Dr. Suhas S Kumar (MBBS, MS, FMAS, FIAGES, FALS) with 1000+ successful laparoscopic procedures.'
      ]
    },
    highlights: ['Micro incisions (5–10mm)', '70% less post-op pain', '1-2 day hospital stay', 'Rapid return to work'],
    coverage: ['Laparoscopic Appendectomy', 'Laparoscopic Cholecystectomy (Gallbladder)', 'Laparoscopic Hernia Repair (TAPP/TEP)', 'Laparoscopic Adhesiolysis & Diagnostic Laparoscopy'],
    whyChoose: ['Over 1000+ successful keyhole procedures', 'High-definition 4K endoscopic tower', 'Gentle tissue handling & minimal scarring', 'Personalized recovery guidance'],
    conditionsTreated: [
      'Acute and chronic appendicitis',
      'Gallstone disease (cholelithiasis & cholecystitis)',
      'Inguinal, umbilical, and incisional hernias',
      'Abdominal adhesions & chronic pelvic pain',
      'Gastrointestinal perforations & bowel obstructions'
    ],
    symptoms: [
      'Severe right lower abdominal pain (appendicitis)',
      'Upper right abdominal pain after fatty meals (gallstones)',
      'Visible swelling or bulge in groin or abdomen that enlarges on coughing (hernia)',
      'Nausea, vomiting, and persistent abdominal bloating'
    ],
    causes: [
      'Obstruction of the appendiceal lumen by fecaliths or lymphoid hyperplasia',
      'Imbalance in bile components leading to cholesterol or pigment gallstones',
      'Weakness in abdominal wall muscles due to aging, heavy lifting, or prior incisions'
    ],
    diagnosis: [
      'High-resolution Abdominal Ultrasound (USG)',
      'Contrast-Enhanced Computed Tomography (CECT Abdomen)',
      'Complete Blood Count (CBC) checking for leukocytosis & inflammatory markers',
      'Liver Function Tests (LFT) and serum amylase/lipase'
    ],
    lapVsOpenTable: [
      { feature: 'Incision Size', lap: '3–4 tiny incisions (5–10mm)', open: 'Single large incision (8–15cm)' },
      { feature: 'Post-Op Pain', lap: 'Minimal, manageable with oral mild analgesics', open: 'Moderate to severe, requires IV narcotics' },
      { feature: 'Hospital Stay', lap: '24 to 48 hours', open: '4 to 7 days' },
      { feature: 'Recovery Time', lap: '7 to 10 days to full activity', open: '4 to 6 weeks' },
      { feature: 'Infection Risk', lap: 'Very low (<1%) due to closed procedure', open: 'Higher risk of wound infection & dehiscence' }
    ],
    whyChooseLaparoscopy: 'Laparoscopic surgery drastically reduces surgical trauma to muscle walls. Because internal organs are visualised under 10x magnification, nerve pathways and blood vessels are protected, leading to faster healing and virtually invisible scars.',
    benefits: [
      'Minimal blood loss during surgery',
      'Significantly lower rate of post-operative incisional hernia',
      'Cosmetically superior outcome with tiny hidden scars',
      'Quick resumption of regular diet and physical activities'
    ],
    risksAndSafety: 'Laparoscopic surgery has an outstanding safety record when performed by trained fellowship-certified surgeons. Rare complications (<0.5%) include port-site hematoma, minor subcutaneous emphysema, or conversion to open surgery if severe inflammation is encountered.',
    recoveryTimeline: [
      { day: 'Day 1 (Surgery Day)', guidance: 'Ambulation within 6 hours post-op; light oral fluids started.' },
      { day: 'Day 2', guidance: 'Discharge from hospital on oral antibiotics and pain relievers; normal soft diet resumed.' },
      { day: 'Days 3–5', guidance: 'Showering permitted over waterproof dressings; light home activities.' },
      { day: 'Day 7–10', guidance: 'Suture/staple check; return to desk work and light driving.' },
      { day: '3 Weeks', guidance: 'Full resumption of exercise, lifting, and normal daily routine.' }
    ],
    aftercare: [
      'Keep port-site dressings clean and dry for the first 48 hours.',
      'Eat high-fiber foods and drink plenty of fluids to avoid straining during bowel movements.',
      'Avoid heavy lifting (>5 kg) for 3 weeks post-surgery.',
      'Contact clinic immediately if experiencing fever >100.4°F, persistent vomiting, or redness around incisions.'
    ],
    serviceFaqs: [
      {
        q: 'Is laparoscopic surgery safe for elderly patients in Bangalore?',
        a: 'Yes, because laparoscopic surgery causes significantly less physiological stress and shorter immobility, elderly patients often tolerate keyhole procedures much better than open surgery.'
      },
      {
        q: 'Will I need stitches removed after laparoscopic surgery?',
        a: 'Dr. Suhas uses sub-cuticular absorbable sutures or skin glue for most port sites, meaning no painful stitch removal is required.'
      }
    ]
  },
  {
    slug: 'hernia-surgery',
    title: 'Hernia Surgery',
    intro: 'Advanced laparoscopic (TAPP/TEP) and open mesh repair for groin, umbilical, and abdominal wall hernias in Bangalore.',
    summary: 'A hernia occurs when an internal organ or fatty tissue pushes through a weak spot in the surrounding muscle or connective tissue wall. Dr. Suhas S Kumar provides specialized laparoscopic tension-free mesh hernia repairs in Bangalore.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    geoSummary: {
      headline: 'Quick Takeaway: Hernia Repair in Bangalore',
      points: [
        'Specialized in Laparoscopic TAPP (Transabdominal Peritoneal) and TEP (Total Extraperitoneal) hernia repairs.',
        'Uses medical-grade 3D anatomical polypropylene mesh for zero-tension, permanent muscle reinforcement.',
        'Treats Inguinal (groin), Umbilical (navel), Epigastric, and Incisional (post-surgical) hernias.',
        'Day-care procedure options available with return to normal walking within 24 hours.'
      ]
    },
    highlights: ['3D Anatomical Mesh Reinforcement', 'Zero Tension Repair', 'Minimal Recurrence Rate (<1%)', 'Rapid 1-Week Recovery'],
    coverage: ['Laparoscopic Inguinal Hernia Repair (TEP / TAPP)', 'Umbilical & Paraumbilical Hernia Repair', 'Incisional & Ventral Hernia Reconstruction', 'Complex & Recurrent Hernia Repair'],
    whyChoose: ['Extensive experience in 3D anatomical mesh placement', 'Low nerve entrapment risk technique', 'Customized surgical approach tailored to age and lifestyle'],
    conditionsTreated: [
      'Inguinal Hernia (Direct and Indirect groin hernia)',
      'Umbilical & Paraumbilical Hernia (around the belly button)',
      'Incisional Hernia (occurring at previous surgical scar sites)',
      'Femoral Hernia & Epigastric Hernia',
      'Obstructed or Strangulated Hernia (emergency conditions)'
    ],
    symptoms: [
      'Visible bulge in the groin, scrotum, or abdominal wall',
      'Aching, dragging pain or discomfort when standing, lifting, or coughing',
      'Bulge that disappears when lying flat and reappears when standing',
      'Sudden intense pain, redness, and vomiting (signs of strangulation requiring emergency surgery)'
    ],
    causes: [
      'Congenital weakness in the abdominal wall or inguinal canal',
      'Chronic strain from heavy weightlifting, persistent cough, or constipation',
      'Previous abdominal surgical incisions that healed with reduced tensile strength',
      'Multiparity, obesity, or age-related muscular atrophy'
    ],
    diagnosis: [
      'Clinical physical examination standing and straining (Valsalva maneuver)',
      'High-frequency Groin/Abdominal Ultrasound (USG)',
      'Abdominal CT scan for complex incisional or recurrent hernias'
    ],
    lapVsOpenTable: [
      { feature: 'Mesh Placement', lap: 'Placed behind the muscle wall (deep anatomical plane)', open: 'Placed over or between muscle layers' },
      { feature: 'Groin Pain', lap: 'Significantly less nerve irritation & chronic pain', open: 'Higher risk of ilioinguinal nerve chronic pain' },
      { feature: 'Bilateral Hernias', lap: 'Both groins repaired through same 3 tiny incisions', open: 'Requires 2 separate long incisions' },
      { feature: 'Return to Work', lap: '5 to 7 days', open: '2 to 3 weeks' }
    ],
    whyChooseLaparoscopy: 'Laparoscopic hernia repair allows placement of the mesh behind the defect (posterior approach), where intra-abdominal pressure naturally holds the mesh in place, drastically reducing recurrence rates.',
    benefits: [
      'Tension-free repair prevents muscle tearing',
      'Both groins can be inspected and repaired simultaneously',
      'Negligible risk of chronic groin nerve pain',
      'Cosmetically elegant tiny incision marks'
    ],
    risksAndSafety: 'Hernia mesh repair is one of the most safe and standardized procedures worldwide. Risks such as seroma formation or temporary testicular discomfort are rare (<1%) and resolve spontaneously.',
    recoveryTimeline: [
      { day: 'Day 1', guidance: 'Mobilization and walking within hours after surgery; light diet.' },
      { day: 'Day 2', guidance: 'Hospital discharge with prescription pain medication.' },
      { day: 'Day 5', guidance: 'Normal indoor walking and light daily tasks.' },
      { day: 'Week 2', guidance: 'Return to desk job and regular driving.' },
      { day: 'Week 4', guidance: 'Resumption of gym work, sports, and heavy lifting.' }
    ],
    aftercare: [
      'Wear an abdominal binder or supportive underwear if recommended.',
      'Avoid lifting anything heavier than 5 kg for the first 3 to 4 weeks.',
      'Maintain a fiber-rich diet to prevent constipation.',
      'Report any sudden swelling or severe pain in the groin immediately.'
    ],
    serviceFaqs: [
      {
        q: 'Can a hernia heal on its own without surgery?',
        a: 'No. A hernia is a structural muscle defect and will not heal spontaneously with medication or exercise. Surgery is the only permanent repair.'
      },
      {
        q: 'Is hernia mesh safe?',
        a: 'Yes. Dr. Suhas uses top-tier US-FDA approved biocompatible polypropylene or composite meshes that integrate safely with body tissue.'
      }
    ]
  },
  {
    slug: 'gallbladder-surgery',
    title: 'Gall Bladder Surgery',
    intro: 'Laparoscopic Cholecystectomy for gallstones, gallbladder polyps, and acute cholecystitis in Bangalore.',
    summary: 'Gallbladder surgery (Laparoscopic Cholecystectomy) involves removing a diseased or stone-bearing gallbladder using keyhole techniques. Dr. Suhas S Kumar is a expert in gallbladder removal in Bangalore.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    geoSummary: {
      headline: 'Quick Takeaway: Gallbladder Removal in Bangalore',
      points: [
        'Gold standard treatment for gallstones (cholelithiasis) and gallbladder inflammation.',
        'Laparoscopic Cholecystectomy performed via 4 micro-incisions under 45 minutes.',
        'Prevents dangerous complications like jaundice, pancreatitis, and gallbladder gangrene.',
        'Patients discharged within 24–36 hours with quick return to regular food.'
      ]
    },
    highlights: ['Gold Standard Keyhole Procedure', 'Under 45-Minute Operation Time', '24-Hour Hospitalization', 'Permanent Relief from Gallstone Pain'],
    coverage: ['Laparoscopic Cholecystectomy', 'Emergency Acute Cholecystitis Management', 'Gallbladder Polyp Excision', 'Biliary Pain Evaluation'],
    whyChoose: ['Precise identification of Critical View of Safety (CVS)', 'Low risk of bile duct injury', 'Smooth intra-operative cholangiogram capability when required'],
    conditionsTreated: [
      'Cholelithiasis (Gallstone disease)',
      'Acute and Chronic Cholecystitis (Gallbladder inflammation)',
      'Biliary Dyskinesia & Gallbladder Sludge',
      'Gallbladder Polyps (>10mm)',
      'Gallstone Pancreatitis (post-resolution phase)'
    ],
    symptoms: [
      'Sharp or cramping pain in the upper right abdomen radiating to the back or right shoulder',
      'Nausea, vomiting, and feeling uncomfortably full after oily or rich foods',
      'Indigestion, gas, and bloating in upper abdomen',
      'Fever, chills, or yellowish tint in eyes (jaundice) indicating infection or duct blockage'
    ],
    causes: [
      'Excess cholesterol or bilirubin crystallizing into gallstones in the gallbladder',
      'Incomplete or infrequent gallbladder emptying',
      'Risk factors: Female gender, age >40, high-fat diet, rapid weight loss, pregnancy'
    ],
    diagnosis: [
      'Abdominal Ultrasound (USG) – 98% diagnostic accuracy for gallstones',
      'Liver Function Test (LFT) checking bilirubin, SGOT, SGPT, and Alkaline Phosphatase',
      'MRCP (Magnetic Resonance Cholangiopancreatography) if common bile duct stones suspected'
    ],
    lapVsOpenTable: [
      { feature: 'Procedure Type', lap: '4 keyhole ports (5–10mm)', open: 'Subcostal incision (10–12cm)' },
      { feature: 'Hospital Stay', lap: '1 day (24 hours)', open: '3 to 5 days' },
      { feature: 'Dietary Return', lap: 'Normal light diet next morning', open: 'NPO for 2-3 days until bowel sounds return' },
      { feature: 'Scarring', lap: '4 tiny faint spots', open: 'Long permanent oblique scar' }
    ],
    whyChooseLaparoscopy: 'Removing the gallbladder laparoscopically resolves painful gallstone attacks permanently without impairing digestion, as the liver continues to produce bile directly into the small intestine.',
    benefits: [
      'Eliminates threat of gallstone migration into common bile duct',
      'Prevents life-threatening gallstone pancreatitis',
      'Rapid resolution of post-prandial abdominal pain',
      'Minimal disruption to work schedule'
    ],
    risksAndSafety: 'Laparoscopic Cholecystectomy is one of the safest abdominal operations performed worldwide. Strict adherence to the Critical View of Safety ensures protection of common bile duct and arterial structures.',
    recoveryTimeline: [
      { day: 'Day 1', guidance: 'Walking in room within 4 hours; liquid and soft diet started.' },
      { day: 'Day 2', guidance: 'Discharge home with mild analgesics.' },
      { day: 'Day 3–4', guidance: 'Normal home mobility; low-fat solid diet.' },
      { day: 'Week 1', guidance: 'Back to routine office work.' },
      { day: 'Week 2', guidance: 'Full normal diet and light physical exercise.' }
    ],
    aftercare: [
      'Follow a low-fat diet for 2 to 3 weeks while the digestive system adapts.',
      'Avoid fried, greasy, or excessively spicy meals initially.',
      'Drink plenty of water and maintain regular walks.',
      'Contact clinic if you develop yellowing of eyes, dark urine, or persistent fever.'
    ],
    serviceFaqs: [
      {
        q: 'Can gallstones be dissolved with medicine instead of surgery?',
        a: 'Medications are ineffective for most gallstones and do not prevent recurrence. Surgical removal of the stone-forming gallbladder is the definitive medical standard.'
      },
      {
        q: 'Can I live normally without a gallbladder?',
        a: 'Yes! The liver continues to produce bile. After a short adaptation period of 2-3 weeks, most patients digest food completely normally.'
      }
    ]
  },
  {
    slug: 'gastrointestinal-surgery',
    title: 'Gastrointestinal Surgery',
    intro: 'Comprehensive laparoscopic and open surgical management for stomach, bowel, appendiceal, and abdominal conditions.',
    summary: 'Gastrointestinal (GI) surgery encompasses surgical treatment for diseases of the digestive tract, including the esophagus, stomach, small intestine, colon, rectum, and appendix.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    geoSummary: {
      headline: 'Quick Takeaway: GI Surgery in Bangalore',
      points: [
        'Specializes in Laparoscopic Appendectomy, Intestinal Resection, and Peptic Perforation Repair.',
        'Minimally invasive management of bowel obstructions, intestinal adhesions, and diverticulitis.',
        'Emergency 24/7 trauma & acute abdomen surgical interventions in Bangalore.',
        'Focuses on early postoperative enteral nutrition and fast-track recovery protocols.'
      ]
    },
    highlights: ['Advanced Laparoscopic GI Procedures', '24/7 Acute Abdomen Response', 'Fast-Track ERAS Protocol', 'Comprehensive Digestive Care'],
    coverage: ['Laparoscopic Appendectomy', 'Intestinal Perforation Repair', 'Small & Large Bowel Resection', 'Adhesiolysis & Obstructive Ileus Relief'],
    whyChoose: ['Meticulous bowel anastomosis techniques', 'Focus on organ preservation and function', 'Multidisciplinary coordination for complex GI cases'],
    conditionsTreated: [
      'Acute Appendicitis',
      'Peptic Ulcer Perforation & Bowel Perforation',
      'Small Bowel & Colonic Obstruction',
      'Intestinal Adhesions & Strictures',
      'Diverticulitis & Gastrointestinal Stromal Tumors (GIST)'
    ],
    symptoms: [
      'Severe generalized or localized abdominal pain',
      'Persistent vomiting, abdominal distension, and inability to pass gas or stool',
      'High fever, tachycardia, and abdominal rigidity (signs of peritonitis)',
      'Unexplained weight loss and persistent gastrointestinal bleeding'
    ],
    causes: [
      'Infection, ischemia, or mechanical obstruction of the intestinal lumen',
      'Severe acid peptic disease leading to stomach perforation',
      'Post-surgical scar adhesions causing intestinal loops to kinking'
    ],
    diagnosis: [
      'Contrast-Enhanced CT Abdomen & Pelvis (CECT)',
      'Abdominal X-Rays (Erect & Supine) detecting air under diaphragm',
      'Diagnostic Laparoscopy in obscure abdominal pain'
    ],
    lapVsOpenTable: [
      { feature: 'Bowel Recovery', lap: 'Earlier return of peristalsis (1-2 days)', open: 'Delayed bowel motility (3-5 days)' },
      { feature: 'Adhesion Risk', lap: 'Significantly lower post-op adhesion formation', open: 'Higher risk of future adhesive bowel obstruction' },
      { feature: 'Pain & Narcotic Use', lap: 'Low pain score, minimal narcotics required', open: 'Requires epidural or PCA narcotics' }
    ],
    whyChooseLaparoscopy: 'Laparoscopic GI surgery minimizes exposure of intestinal loops to dry air, drastically reducing post-operative paralytic ileus and adhesion formation.',
    benefits: [
      'Faster restoration of normal intestinal digestion',
      'Reduced risk of wound dehiscence and burst abdomen',
      'Less surgical stress on cardiac and pulmonary systems',
      'Shorter hospital stays'
    ],
    risksAndSafety: 'GI surgical interventions are executed under high safety standards. Pre-operative optimization and meticulous intra-operative bowel assessment minimize leak or infection risks.',
    recoveryTimeline: [
      { day: 'Day 1–2', guidance: 'Liquid intake as bowel sounds return; gentle walking.' },
      { day: 'Day 3–4', guidance: 'Transition to soft diet; drain removal if applicable.' },
      { day: 'Day 5–7', guidance: 'Hospital discharge on oral nutrition.' },
      { day: 'Week 2–3', guidance: 'Gradual resumption of normal work and light activities.' }
    ],
    aftercare: [
      'Eat small, frequent digestible meals during the first month.',
      'Stay well hydrated with clear fluids, soups, and oral electrolytes.',
      'Report any fever, severe abdominal distension, or wound discharge immediately.'
    ],
    serviceFaqs: [
      {
        q: 'What is the emergency treatment for appendicitis?',
        a: 'Laparoscopic Appendectomy is the gold-standard emergency procedure. It removes the inflamed appendix keyhole before it ruptures.'
      }
    ]
  },
  {
    slug: 'thyroid-surgery',
    title: 'Thyroid Surgery',
    intro: 'Precision Thyroidectomy and nodule management with nerve monitoring and voice preservation in Bangalore.',
    summary: 'Thyroid surgery involves removing part or all of the thyroid gland (Thyroidectomy) to treat thyroid nodules, multinodular goiter, hyperthyroidism, or thyroid neoplasms.',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80',
    geoSummary: {
      headline: 'Quick Takeaway: Thyroid Surgery in Bangalore',
      points: [
        'Performs Hemithyroidectomy, Total Thyroidectomy, and Subtotal Goiter Resection.',
        'Meticulous identification & preservation of Recurrent Laryngeal Nerve (RLN) to protect patient voice.',
        'Preservation of Parathyroid Glands to prevent post-operative calcium deficiency.',
        'Cosmetic minimal-incision neck closure for fainted hidden surgical scar.'
      ]
    },
    highlights: ['Voice-Preserving Nerve Technique', 'Parathyroid Gland Sparing', 'Cosmetic Skin-Crease Incision', 'Expert Thyroid Nodule Care'],
    coverage: ['Hemithyroidectomy (Lobectomy)', 'Total Thyroidectomy', 'Multinodular Goiter Excision', 'Thyroid Nodule Biopsy & Surgery'],
    whyChoose: ['High precision capsular dissection technique', 'Zero voice change protocol', 'Clear preoperative FNAC and ultrasound staging'],
    conditionsTreated: [
      'Thyroid Nodules (Solitary & Complex nodular disease)',
      'Multinodular Goiter causing neck compression or dysphagia',
      'Graves Disease & Refractory Hyperthyroidism',
      'Thyroid Malignancies (Papillary, Follicular, Medullary Thyroid Cancer)'
    ],
    symptoms: [
      'Visible swelling or lump in front of the lower neck',
      'Difficulty swallowing (dysphagia) or feeling of tightness in throat',
      'Hoarseness or change in voice quality',
      'Shortness of breath when lying flat (tracheal compression)'
    ],
    causes: [
      'Iodine deficiency or autoimmune thyroiditis (Hashimoto / Graves)',
      'Genetic predisposition to thyroid adenomas and nodules',
      'Hormonal imbalance leading to diffuse glandular hypertrophy'
    ],
    diagnosis: [
      'High-Resolution Neck Ultrasound (USG Thyroid)',
      'Fine Needle Aspiration Cytology (FNAC) / Bethesda Classification',
      'Thyroid Function Test (TSH, Free T3, Free T4) & Serum Calcium'
    ],
    lapVsOpenTable: [
      { feature: 'Surgical Approach', lap: 'Subcapsular precision neck-crease incision (3–4cm)', open: 'Large collar incision (6–10cm)' },
      { feature: 'Nerve Safety', lap: 'Visual magnification of Recurrent Laryngeal Nerve', open: 'Direct tactile identification' },
      { feature: 'Cosmetic Outcome', lap: 'Scar lies fainted in natural skin fold', open: 'Prominent front neck scar' }
    ],
    whyChooseLaparoscopy: 'Capsular dissection technique ensures that the outer thyroid capsule is kept intact, preserving the delicate parathyroid glands and nerve branches supplying the vocal cords.',
    benefits: [
      'Preserves normal vocal cord mobility and speaking voice',
      'Prevents chronic hypocalcemia and muscle cramps',
      'Relieves airway and esophageal compression',
      'Excellent cosmetic appearance'
    ],
    risksAndSafety: 'Thyroidectomy is highly safe when performed by experienced hands. Transient hoarseness occurs in <1% of cases and resolves within weeks.',
    recoveryTimeline: [
      { day: 'Day 1', guidance: 'Sipping fluids, talking softly, head-elevated rest.' },
      { day: 'Day 2', guidance: 'Check serum calcium levels; discharge on soft diet.' },
      { day: 'Week 1', guidance: 'Suture removal/check; gentle neck movements.' },
      { day: 'Week 2', guidance: 'Resumption of regular daily activities and work.' }
    ],
    aftercare: [
      'Keep neck incision clean; apply prescribed scar ointment after wound closure.',
      'Take calcium and vitamin D supplements as advised.',
      'Avoid strenuous neck extension or heavy lifting for 2 weeks.',
      'Follow up for thyroid hormone replacement titration if total thyroidectomy was performed.'
    ],
    serviceFaqs: [
      {
        q: 'Will thyroid surgery change my voice permanently?',
        a: 'No. Dr. Suhas uses nerve-sparing anatomical dissection. Permanent voice change is extremely rare (<0.5%).'
      },
      {
        q: 'Will I need to take thyroid tablets after surgery?',
        a: 'If a Total Thyroidectomy is performed, daily thyroid hormone replacement (Thyroxin) is prescribed. If only half the gland is removed (Hemithyroidectomy), the remaining half often produces sufficient hormone naturally.'
      }
    ]
  },
  {
    slug: 'varicose-vein-surgery',
    title: 'Varicose Vein Surgery',
    intro: 'Advanced Minimally Invasive Laser (EVLT) and Surgical Treatment for varicose veins and leg ulcers in Bangalore.',
    summary: 'Varicose veins are enlarged, twisted, swollen veins visible under the skin, caused by incompetent venous valves. Dr. Suhas offers endovenous laser ablation and radiofrequency closure in Bangalore.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    geoSummary: {
      headline: 'Quick Takeaway: Varicose Vein Treatment in Bangalore',
      points: [
        'Offers Endovenous Laser Therapy (EVLT) and Radiofrequency Ablation (RFA).',
        'No large cuts or stitches; performed under local ultrasound-guided anesthesia.',
        'Prevents severe complications like venous ulcers, hyperpigmentation, and thrombophlebitis.',
        'Walk home same day with immediate relief from heavy, aching legs.'
      ]
    },
    highlights: ['Endovenous Laser Ablation (EVLT)', 'Stitchless Pin-hole Procedure', 'Same-Day Discharge (Day Care)', 'Immediate Pain & Heaviness Relief'],
    coverage: ['Endovenous Laser Vein Treatment (EVLT)', 'Subfascial Endoscopic Perforator Surgery (SEPS)', 'Venous Ulcer Debridement & Healing', 'Sclerotherapy for Spider Veins'],
    whyChoose: ['Duplex Ultrasound map guided ablation', 'Zero hospital admission needed for EVLT', 'Comprehensive care for non-healing venous ulcers'],
    conditionsTreated: [
      'Great and Small Saphenous Vein incompetence',
      'Venous Stasis Dermatitis & Skin Hyperpigmentation',
      'Non-healing Venous Stasis Leg Ulcers',
      'Superficial Thrombophlebitis & Bleeding Varices'
    ],
    symptoms: [
      'Bulging, rope-like blue or purple veins on legs and calves',
      'Aching, heavy, tired feeling in legs, especially after long standing',
      'Swelling in lower legs and ankles towards the evening',
      'Itching, skin darkening (stasis eczema), or open sore near ankle'
    ],
    causes: [
      'Weak or damaged one-way venous valves causing blood to pool (venous reflux)',
      'Prolonged standing or sitting occupations (teachers, nurses, shopkeepers)',
      'Hereditary vein wall weakness, pregnancy, or deep vein thrombosis (DVT) history'
    ],
    diagnosis: [
      'Venous Doppler Ultrasound (Venous Duplex Scan) – maps exact valve leak locations',
      'Clinical examination in standing position checking CEAP staging'
    ],
    lapVsOpenTable: [
      { feature: 'Procedure Technique', lap: 'EVLT: Laser fiber inserted via tiny 2mm needle pinhole', open: 'Vein Stripping: Multiple long cuts along leg' },
      { feature: 'Anesthesia', lap: 'Tumescent local anesthesia', open: 'Spinal or general anesthesia' },
      { feature: 'Pain & Bruising', lap: 'Minimal bruising; walk immediately', open: 'Significant leg bruising and pain for 2-3 weeks' },
      { feature: 'Hospital Stay', lap: 'Day-care (home in 3-4 hours)', open: '2 to 3 days' }
    ],
    whyChooseLaparoscopy: 'Laser ablation seals the damaged vein from the inside using light energy. Body naturally redirects blood flow through healthy deep veins instantly.',
    benefits: [
      '98% initial success rate with long-term durability',
      'Cosmetically excellent with no permanent leg scars',
      'Immediate relief from leg heaviness and aching',
      'Accelerates healing of chronic venous leg ulcers'
    ],
    risksAndSafety: 'EVLT is an exceptionally safe procedure. Minor temporary tightness along the treated vein course is expected and resolves quickly.',
    recoveryTimeline: [
      { day: 'Day 1 (Procedure Day)', guidance: 'Walk for 30 minutes immediately post-laser; go home same day.' },
      { day: 'Days 2–7', guidance: 'Wear Class II compression stockings daily; resume office work.' },
      { day: 'Week 2', guidance: 'Ultrasound check; return to sports and full exercises.' }
    ],
    aftercare: [
      'Wear medical compression stockings during waking hours for 2 to 3 weeks.',
      'Walk 30–45 minutes daily to promote healthy deep venous blood return.',
      'Elevate legs on a pillow when resting or sleeping.',
      'Avoid hot baths or direct heavy sun exposure on legs for 2 weeks.'
    ],
    serviceFaqs: [
      {
        q: 'Is laser treatment for varicose veins permanent?',
        a: 'Yes. Laser therapy permanently closes and obliterates the diseased incompetent vein, preventing recurrent blood pooling.'
      }
    ]
  },
  {
    slug: 'piles-fissure-fistula',
    title: 'Piles, Fissure & Fistula Care',
    intro: 'Laser Proctology and advanced minimally invasive treatments for hemorrhoids, fissures, fistulas, and pilonidal sinus in Bangalore.',
    summary: 'Anorectal conditions like piles (hemorrhoids), anal fissures, and fistulas cause severe distress. Dr. Suhas provides modern painless Laser Proctology treatments in Bangalore.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    geoSummary: {
      headline: 'Quick Takeaway: Laser Proctology in Bangalore',
      points: [
        'Uses diode laser energy for painless treatment of Piles, Anal Fissure, and Fistula-in-ano.',
        'Zero cuts, no painful dressings, no muscle damage, and minimal blood loss.',
        'Day-care procedure; return to regular work and daily routine within 48 hours.',
        'High patient satisfaction with near-zero incontinence risk.'
      ]
    },
    highlights: ['Advanced Diode Laser Technology', 'No Cuts & No Painful Open Wounds', 'Preserves Sphincter Muscle Control', '48-Hour Rapid Recovery'],
    coverage: ['Laser Hemorrhoidoplasty (LPH) for Piles', 'Laser Sphincterotomy for Anal Fissure', 'FiLaC (Fistula-tract Laser Closure)', 'EPSiT / Laser Pilonidal Sinus Treatment'],
    whyChoose: ['Specialized certification in Laser Proctology', 'Discreet, compassionate, and empathetic care', 'Focus on long-term prevention of recurrence'],
    conditionsTreated: [
      'Internal & External Piles / Hemorrhoids (Grade I to IV)',
      'Chronic Anal Fissures with sentinel pile',
      'High and Low Fistula-in-Ano',
      'Pilonidal Sinus (sacrococcygeal cyst)'
    ],
    symptoms: [
      'Painless bright red bleeding during defecation (Piles)',
      'Sharp, burning pain during and after bowel movements lasting for hours (Fissure)',
      'Pus, discharge, or painful lump near anus (Fistula / Abscess)',
      'Painful swelling at top of buttock cleft (Pilonidal Sinus)'
    ],
    causes: [
      'Chronic constipation and excessive straining during bowel movements',
      'Low dietary fiber intake and inadequate hydration',
      'Increased intra-abdominal pressure from pregnancy, heavy lifting, or prolonged sitting'
    ],
    diagnosis: [
      'Digital Rectal Examination (DRE)',
      'Anoscopy / Proctoscopy examination in clinic',
      'MRI Fistulogram for complex branching anal fistulas'
    ],
    lapVsOpenTable: [
      { feature: 'Procedure Type', lap: 'Laser: Beam vaporizes tissue from inside', open: 'Traditional: Surgical cutting and open wounds' },
      { feature: 'Pain Level', lap: 'Minimal post-op discomfort', open: 'Severe pain requiring sitz baths for weeks' },
      { feature: 'Sphincter Damage', lap: 'Zero damage to sphincter muscles', open: 'Risk of fecal incontinence' },
      { feature: 'Recovery Time', lap: '2 to 3 days', open: '3 to 6 weeks' }
    ],
    whyChooseLaparoscopy: 'Laser proctology coagulates hemorrhoidal blood supply from within without cutting delicate anal mucosa, protecting internal sphincter muscle function completely.',
    benefits: [
      'Painless post-operative recovery period',
      'No need for daily painful open wound dressings',
      'Significantly lower recurrence rate',
      'Day-care discharge'
    ],
    risksAndSafety: 'Laser proctology is exceptionally safe with negligible complication rates compared to old open surgery methods.',
    recoveryTimeline: [
      { day: 'Day 1', guidance: 'Procedure completed in 30 mins; home same evening.' },
      { day: 'Day 2', guidance: 'Normal painless bowel movement with stool softeners.' },
      { day: 'Day 3', guidance: 'Return to regular office work and driving.' }
    ],
    aftercare: [
      'Drink 3 liters of water daily and eat high-fiber meals (fruits, vegetables, oats).',
      'Take prescribed stool softeners for 2 weeks to prevent straining.',
      'Perform warm sitz baths for comfort if recommended.'
    ],
    serviceFaqs: [
      {
        q: 'Will laser piles surgery require hospital stay?',
        a: 'No. Laser proctology is performed as a day-care procedure. Patients are discharged the same day.'
      }
    ]
  },
  {
    slug: 'diabetic-foot-surgery',
    title: 'Diabetic Foot Surgery',
    intro: 'Limb-salvage surgical care, wound debridement, infection control, and ulcer management in Bangalore.',
    summary: 'Diabetic foot complications result from neuropathy and peripheral vascular disease. Dr. Suhas S Kumar provides aggressive limb-saving surgical care in Bangalore.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    geoSummary: {
      headline: 'Quick Takeaway: Diabetic Foot Care in Bangalore',
      points: [
        'Dedicated limb-salvage protocols to prevent major amputations.',
        'Surgical debridement, vacuum-assisted closure (VAC therapy), and flap coverage.',
        'Management of foot ulcers, necrotizing fasciitis, and wet gangrene.',
        'Multidisciplinary coordination with endocrinologists and podiatrists.'
      ]
    },
    highlights: ['Limb Salvage Specialty', 'Advanced VAC / NPWT Wound Therapy', 'Comprehensive Infection Eradication', 'Multidisciplinary Care'],
    coverage: ['Surgical Wound Debridement', 'Abscess Drainage & Fasciotomy', 'VAC / Negative Pressure Wound Therapy', 'Minor Digit Reconstruction & Limb Preservation'],
    whyChoose: ['Aggressive early infection control to save limbs', 'Expertise in advanced moist wound healing tech', 'Patient-centric long-term follow-up'],
    conditionsTreated: [
      'Diabetic Foot Ulcers (Neuropathic & Ischemic)',
      'Wet Gangrene & Necrotizing Soft Tissue Infections',
      'Deep Foot Abscesses & Osteomyelitis',
      'Charcot Neuroarthropathy ulcers'
    ],
    symptoms: [
      'Non-healing open ulcer or wound on foot or toes',
      'Foul-smelling blackish discoloration (gangrene) of toes',
      'Foot redness, swelling, warmth, and high fever',
      'Numbness, loss of sensation, or tingling in feet'
    ],
    causes: [
      'Diabetic Peripheral Neuropathy (loss of protective pain sensation)',
      'Peripheral Arterial Disease (poor arterial blood supply to feet)',
      'Minor unperceived trauma (shoe bite, thorn prick) escalating to deep infection'
    ],
    diagnosis: [
      'Wound culture & sensitivity test for targeted antibiotic therapy',
      'Arterial Doppler Ultrasound of lower limbs to assess blood flow',
      'Foot X-Ray / MRI to evaluate bone involvement (Osteomyelitis)',
      'HbA1c and glycemic control audit'
    ],
    lapVsOpenTable: [
      { feature: 'Approach', lap: 'Targeted Limb-Salvage Debridement & VAC Therapy', open: 'Outdated Immediate High Amputation' },
      { feature: 'Wound Healing', lap: 'Accelerated micro-vascular granulation', open: 'Slow secondary intention healing' },
      { feature: 'Mobility Preserved', lap: 'Maximum foot structure and walking ability saved', open: 'Loss of mobility' }
    ],
    whyChooseLaparoscopy: 'Early aggressive surgical debridement combined with negative pressure wound therapy (VAC) removes dead bacterial tissue while stimulating rapid fresh blood vessel growth.',
    benefits: [
      'Prevents major below-knee or above-knee amputations',
      'Eradicates life-threatening sepsis',
      'Promotes rapid granulation tissue bed for skin grafting',
      'Preserves walking independence'
    ],
    risksAndSafety: 'Diabetic foot care demands strict glycemic management alongside surgical intervention. Protocol-driven therapy yields optimal limb retention.',
    recoveryTimeline: [
      { day: 'Week 1', guidance: 'Surgical debridement; IV antibiotic therapy; glycemic stabilization.' },
      { day: 'Week 2–3', guidance: 'VAC dressing changes every 48–72 hours; healthy granulation formation.' },
      { day: 'Week 4–6', guidance: 'Secondary wound closure or skin graft; custom diabetic footwear fitting.' }
    ],
    aftercare: [
      'Inspect feet daily for cuts, blisters, or redness using a mirror.',
      'Never walk barefoot, even indoors.',
      'Maintain strict blood sugar control (HbA1c < 7.0%).',
      'Wear specialized customized diabetic footwear to relieve pressure points.'
    ],
    serviceFaqs: [
      {
        q: 'Can a diabetic foot ulcer be cured without amputation?',
        a: 'Yes! Over 90% of diabetic foot ulcers can be healed completely without major amputation when treated early with proper surgical debridement, infection control, and pressure offloading.'
      }
    ]
  },
  {
    slug: 'breast-surgery',
    title: 'Breast Surgery',
    intro: 'Compassionate diagnostic evaluation, fibroadenoma excision, lumpectomy, and breast surgical care in Bangalore.',
    summary: 'Breast surgery encompasses benign breast disease management, fibroadenoma excision, cyst drainage, abscess management, and oncological evaluations. Dr. Suhas provides empathetic care in Bangalore.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80',
    geoSummary: {
      headline: 'Quick Takeaway: Breast Surgery in Bangalore',
      points: [
        'Specializes in Micro-dochectomy, Fibroadenoma Excision, and Breast Abscess Drainage.',
        'Cosmetic circumareolar incisions for minimal visible scarring.',
        'Triple Assessment Protocol (Clinical Exam, Ultrasound/Mammogram, Core Biopsy).',
        'Empathetic, confidential, and prompt diagnostic evaluation.'
      ]
    },
    highlights: ['Triple Assessment Protocol', 'Cosmetic Hidden-Incision Technique', 'Gentle & Confidential Care', 'Prompt Diagnostic Turnaround'],
    coverage: ['Fibroadenoma Excision', 'Breast Abscess Ultrasound-Guided Drainage', 'Microdochectomy for Nipple Discharge', 'Diagnostic Core Needle Biopsy'],
    whyChoose: ['Cosmetic incision planning along natural skin lines', 'Gentle handling of breast tissue', 'Complete diagnostic clarity'],
    conditionsTreated: [
      'Fibroadenomas (Benign breast lumps)',
      'Fibrocystic Breast Disease & Breast Cysts',
      'Lactational & Non-Lactational Breast Abscess',
      'Nipple Discharge & Duct Papillomas',
      'Suspicious Breast Masses requiring biopsy'
    ],
    symptoms: [
      'Painless, mobile lump in the breast tissue',
      'Localized breast pain, redness, fever, and tender swelling (abscess)',
      'Clear, bloody, or yellowish nipple discharge',
      'Skin dimpling, nipple retraction, or axillary lump'
    ],
    causes: [
      'Hormonal fluctuations (estrogen/progesterone sensitivity)',
      'Bacterial infection during breastfeeding (staphylococcus aureus)',
      'Benign ductal tissue proliferation'
    ],
    diagnosis: [
      'Bilateral Breast Ultrasound / Digital Mammography',
      'Core Needle Biopsy / Fine Needle Aspiration Cytology (FNAC)',
      'Clinical Breast Examination'
    ],
    lapVsOpenTable: [
      { feature: 'Incision Placement', lap: 'Cosmetic Circumareolar / Sub-mammary fold incision', open: 'Direct radial cut over lump' },
      { feature: 'Scar Appearance', lap: 'Nearly invisible fainted line around areola border', open: 'Noticeable scar on upper breast' }
    ],
    whyChooseLaparoscopy: 'Placing incisions around the dark areolar border or in the inframammary crease conceals surgical marks completely while ensuring thorough excision.',
    benefits: [
      'Complete peace of mind through precise histological diagnosis',
      'Preservation of breast contour and aesthetic shape',
      'Relief from severe breast pain and infection',
      'Quick day-care recovery'
    ],
    risksAndSafety: 'Benign breast surgery is extremely safe with rapid recovery and low complication rates.',
    recoveryTimeline: [
      { day: 'Day 1', guidance: 'Excision completed under short general/local anesthesia; home same day.' },
      { day: 'Day 3', guidance: 'Dressings check; wear supportive soft bra.' },
      { day: 'Week 1', guidance: 'Biopsy result review; return to normal work.' }
    ],
    aftercare: [
      'Wear a firm, well-fitted supportive bra without underwire for 2 weeks.',
      'Avoid strenuous upper body exercise for 10 days.',
      'Keep incision dry for 48 hours post-op.'
    ],
    serviceFaqs: [
      {
        q: 'Are all breast lumps cancerous?',
        a: 'No! More than 80% of breast lumps in women under 40 are completely benign conditions like fibroadenomas or cysts.'
      }
    ]
  },
  {
    slug: 'trauma-emergency-surgery',
    title: 'Trauma & Emergency Surgery',
    intro: '24/7 Urgent surgical intervention for abdominal trauma, acute abdomen, and surgical emergencies in Bangalore.',
    summary: 'Emergency surgery requires rapid decision-making, hemodynamic stabilization, and emergency operative care. Dr. Suhas S Kumar leads emergency surgical interventions in Bangalore.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    geoSummary: {
      headline: 'Quick Takeaway: Emergency Surgery in Bangalore',
      points: [
        '24/7 Availability for Acute Abdomen, Peritonitis, and Abdominal Trauma.',
        'Emergency Laparoscopic Exploratory surgery for intestinal perforation and appendicitis.',
        'Rapid resuscitation and trauma damage control surgery in Bangalore.',
        'Direct coordination with ICU & Critical Care specialists.'
      ]
    },
    highlights: ['24/7 Emergency Operative Care', 'Rapid Resuscitation Protocol', 'Damage Control Surgery', 'ICU & Trauma Team Coordination'],
    coverage: ['Emergency Perforation Laparotomy / Laparoscopy', 'Blunt & Penetrating Abdominal Trauma Care', 'Strangulated Hernia Emergency Repair', 'Acute Obstructive Bowel Relief'],
    whyChoose: ['Calm leadership during critical medical emergencies', 'Fast-track theater access', 'Comprehensive post-op ICU care'],
    conditionsTreated: [
      'Ruptured Appendix & Generalized Peritonitis',
      'Perforated Peptic / Typhoid / Appendiceal Ulcer',
      'Strangulated & Incarcerated Hernia',
      'Abdominal Trauma (Splenic, Hepatic, or Intestinal Injury)',
      'Acute Mesenteric Ischemia & Severe Volvulus'
    ],
    symptoms: [
      'Sudden intolerable knife-like abdominal pain',
      'Board-like rigid, extremely tender abdomen',
      'High fever with cold clammy extremities and low blood pressure',
      'Fecal vomiting and absolute constipation'
    ],
    causes: [
      'Untreated peptic ulcer disease or appendicitis rupturing into abdominal cavity',
      'Road traffic accidents, falls, or direct abdominal impacts',
      'Neglected hernia getting trapped and losing blood supply'
    ],
    diagnosis: [
      'FAST Ultrasound (Focused Assessment with Sonography for Trauma)',
      'Erect Abdominal X-Ray showing free air under diaphragm',
      'Emergency CT Scan & Blood Gas Analysis'
    ],
    lapVsOpenTable: [
      { feature: 'Decision Speed', lap: 'Immediate emergency diagnostic laparoscopy / laparotomy', open: 'Immediate emergency laparotomy' },
      { feature: 'Sepsis Control', lap: 'Thorough abdominal peritoneal lavage & drainage', open: 'Thorough abdominal peritoneal lavage & drainage' }
    ],
    whyChooseLaparoscopy: 'Emergency surgical intervention stops internal bleeding and seals bowel perforations promptly, preventing fatal septic shock.',
    benefits: [
      'Life-saving eradication of intra-abdominal sepsis',
      'Restoration of vital organ perfusion and hemodynamics',
      'Prevention of irreversible bowel necrosis'
    ],
    risksAndSafety: 'Emergency surgeries carry higher intrinsic risks due to acute illness. Experienced surgical leadership maximizes survival and recovery.',
    recoveryTimeline: [
      { day: 'Day 1–3', guidance: 'ICU monitoring, IV antibiotics, liquid resuscitation.' },
      { day: 'Day 4–7', guidance: 'Transition to ward, oral nutrition, drain removal.' },
      { day: 'Week 3–4', guidance: 'Gradual recovery and strength rebuilding at home.' }
    ],
    aftercare: [
      'Follow ICU and surgical team discharge instructions strictly.',
      'Complete full course of prescribed antibiotics.',
      'Attend weekly follow-up visits until complete wound healing.'
    ],
    serviceFaqs: [
      {
        q: 'What should I do if someone has sudden severe abdominal pain and fever?',
        a: 'Do not give food, water, or painkiller tablets. Rush immediately to the emergency room at KMC Hospital or nearest hospital for urgent surgical evaluation.'
      }
    ]
  }
];

export const milestones = [
  { year: '2013', title: 'Medical Degree', desc: 'Completed MBBS from a prestigious medical university' },
  { year: '2017', title: 'MS General Surgery', desc: 'Specialised postgraduate degree in General Surgery' },
  { year: '2018', title: 'St. Johns Medical College', desc: 'Appointed as Assistant Professor, Department of General Surgery' },
  { year: '2019', title: 'Advanced Laparoscopy', desc: 'Completed FALS and Dip Lap certifications in advanced laparoscopic techniques' },
  { year: '2021', title: 'FIAGES Fellowship', desc: 'Recognised by the Indian Association of Gastrointestinal Endo-Surgeons' },
  { year: '2023', title: 'Consultant Surgeon', desc: 'Established private practice at Deepak Hospital, Bengaluru' },
];

export const publications = [
  {
    title: 'Comparative study of laparoscopic vs open appendectomy outcomes',
    year: '2022',
    abstract: 'This study evaluates the post-operative outcomes, recovery time, and complication rates of laparoscopic appendectomy compared to traditional open surgery. Findings indicate a significant reduction in hospital stay and faster return to normal activities for the laparoscopic group.',
    link: '#'
  },
  {
    title: 'Role of minimally invasive surgery in emergency abdominal conditions',
    year: '2021',
    abstract: 'An exploration of the increasing application of minimally invasive techniques in emergency settings, such as perforated viscus and acute cholecystitis, highlighting the benefits of reduced surgical trauma in critical care.',
    link: '#'
  },
  {
    title: 'Outcomes of laparoscopic hernia repair: A retrospective analysis',
    year: '2020',
    abstract: 'A comprehensive review of 500 cases of laparoscopic hernia repair focusing on recurrence rates and chronic pain, establishing the long-term efficacy and safety profile of the procedure.',
    link: '#'
  },
  {
    title: 'Advances in thyroid surgery techniques and patient recovery',
    year: '2019',
    abstract: 'A detailed analysis of nerve monitoring and minimal access approaches in thyroidectomy. The paper discusses strategies to minimize voice changes and hypocalcemia post-surgery.',
    link: '#'
  },
  {
    title: 'Diabetic foot management: Surgical interventions and prevention strategies',
    year: '2018',
    abstract: 'This paper outlines a multidisciplinary approach to diabetic foot ulcers, detailing surgical debridement techniques, vascular assessment, and long-term preventative care to avoid amputations.',
    link: '#'
  },
];

export const galleryImages = [
  {
    src: `${import.meta.env.BASE_URL}images/hero-doctor.jpg`,
    title: 'Dr. Suhas S Kumar',
    label: 'Consultant General & Laparoscopic Surgeon',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    title: 'Advanced Operating Theatre',
    label: 'State-of-the-Art Surgical Suite',
    span: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    title: 'Clinical Consultation',
    label: 'Personalized Care & Diagnostics',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
    title: 'Minimal Access Surgery',
    label: 'Precision Laparoscopic Tools',
    span: 'normal',
  },
  {
    src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    title: 'Interdisciplinary Team',
    label: 'Collaborative Surgical Care',
    span: 'normal',
  },
  {
    src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    title: 'Diagnostic Excellence',
    label: 'High-Resolution Medical Imaging',
    span: 'normal',
  },
  {
    src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    title: 'Recovery & Care Unit',
    label: 'Monitored Post-Op Environment',
    span: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=800&q=80',
    title: 'Endo-Surgery Facility',
    label: 'Advanced Laparoscopic Tower',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    title: 'Clinical Research',
    label: 'Evidence-Based Medicine',
    span: 'normal',
  },
  {
    src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
    title: 'Patient Care Journey',
    label: 'Compassionate Follow-Up',
    span: 'normal',
  },
];

export const categories = [
  {
    id: 'general-surgery',
    title: 'General Surgery',
    desc: 'Classical and emergency surgical procedures executed with highest precision.',
    icon: Activity,
    services: [
      {
        title: 'Breast Surgery & Breast Onco Surgery',
        tag: 'Breast Care',
        desc: 'Compassionate management of benign breast diseases and advanced surgical oncology.',
        slug: '/services/breast-surgery',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Thyroid Surgery',
        tag: 'Endocrine Care',
        desc: 'Precise glandular surgery prioritizing nerve preservation and optimal functional outcomes.',
        slug: '/services/thyroid-surgery',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Piles, Fissure, Fistula & Pilonidal Sinus',
        tag: 'Anorectal',
        desc: 'Comprehensive evaluation and surgical management for chronic anorectal concerns.',
        slug: '/services/piles-fissure-fistula',
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Amputations, Excision & Circumcision',
        tag: 'Minor & General',
        desc: 'Standard general surgeries performed safely with modern aseptic protocols and wound care.',
        slug: '/contact',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Trauma & Emergency Surgery',
        tag: 'Emergency Care',
        desc: 'Urgent, high-precision surgical interventions for trauma injuries and acute abdominal pain.',
        slug: '/services/trauma-emergency-surgery',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'laser-procedures',
    title: 'Laser Procedures',
    desc: 'Advanced laser-guided interventions for minimal pain, no stitches, and rapid recovery.',
    icon: Zap,
    services: [
      {
        title: 'Laser Treatment For Fissure',
        tag: 'Laser Proctology',
        desc: 'Minimally invasive laser therapy providing quick healing and pain relief for anal fissures.',
        slug: '/services/piles-fissure-fistula',
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Laser Treatment For Fistula',
        tag: 'Laser Proctology',
        desc: 'Advanced laser closure of fistula tracks without damage to surrounding muscles.',
        slug: '/services/piles-fissure-fistula',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Laser Piles Treatment',
        tag: 'Laser Proctology',
        desc: 'Precision laser coagulation of hemorrhoids under local or general anesthesia for faster recovery.',
        slug: '/services/piles-fissure-fistula',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Laser Varicose Veins Surgery',
        tag: 'Vascular Care',
        desc: 'Endovenous laser ablation to treat varicose veins and restore normal leg circulation.',
        slug: '/services/varicose-vein-surgery',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'laparoscopic-surgery',
    title: 'Laparoscopic Surgery',
    desc: 'Keyhole procedures utilizing cameras for smaller scars, less pain, and faster healing.',
    icon: Shield,
    services: [
      {
        title: 'Hernia Surgery',
        tag: 'Abdominal Wall',
        desc: 'Laparoscopic repair of inguinal, umbilical, and incisional hernias to restore abdominal strength.',
        slug: '/services/hernia-surgery',
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Gall Bladder Surgery',
        tag: 'Hepatobiliary',
        desc: 'Laparoscopic cholecystectomy for gallstones and acute/chronic gallbladder inflammation.',
        slug: '/services/gallbladder-surgery',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Gastrointestinal Surgery',
        tag: 'Digestive Tract',
        desc: 'Thoughtful laparoscopic care for stomach, appendix, and bowel conditions.',
        slug: '/services/gastrointestinal-surgery',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'foot-care',
    title: 'Foot Care',
    desc: 'Specialized diagnostic and surgical management for lower limb and diabetic complications.',
    icon: HeartPulse,
    services: [
      {
        title: 'Diabetic Foot Ulcer',
        tag: 'Wound Care',
        desc: 'Multidisciplinary treatment of diabetic ulcers to promote healing and control infections.',
        slug: '/services/diabetic-foot-surgery',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Gangrene Toes',
        tag: 'Limb Salvage',
        desc: 'Surgical management and restoration of perfusion to save limbs and prevent spread of necrosis.',
        slug: '/services/diabetic-foot-surgery',
        image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Bone Abnormalities',
        tag: 'Structural Care',
        desc: 'Expert corrective guidance and surgical options for bone abnormalities and pressure points.',
        slug: '/contact',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Varicose Veins Ulcer',
        tag: 'Venous Care',
        desc: 'Surgical and compression therapy for ulcers secondary to chronic varicose veins.',
        slug: '/services/varicose-vein-surgery',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Nail Abnormalities',
        tag: 'Podiatry',
        desc: 'Surgical excision or corrective treatment for ingrown, thick, or deformed toe nails.',
        slug: '/contact',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'MedicalBusiness'],
  '@id': 'https://www.surgeonsuhas.in/#organization',
  name: siteSettings.name,
  legalName: 'Dr. Suhas S Kumar Surgical Clinic',
  url: siteSettings.siteUrl,
  logo: `${siteSettings.siteUrl}/images/drsuhas.webp`,
  image: `${siteSettings.siteUrl}/images/drsuhas.webp`,
  telephone: siteSettings.phone,
  email: siteSettings.email,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    ...siteSettings.address
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.9255,
    longitude: 77.5815
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00'
    }
  ],
  areaServed: ['Bangalore', 'Jayanagar', 'Neelasandra', 'Bengaluru', 'South Bangalore', 'Karnataka'],
  hasMap: siteSettings.locations[0]?.mapSrc || 'https://maps.google.com',
  aggregateRating: aggregateRatingSchema,
  review: reviewSchemas
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.surgeonsuhas.in/#doctor',
  name: siteSettings.name,
  jobTitle: siteSettings.role,
  description: 'Senior General & Laparoscopic Surgeon in Bangalore, Karnataka specializing in keyhole surgery, hernia repair, gallbladder surgery, thyroid, breast care, diabetic foot, and emergency abdominal procedures.',
  url: siteSettings.siteUrl,
  image: `${siteSettings.siteUrl}/images/drsuhas.webp`,
  telephone: siteSettings.phone,
  email: siteSettings.email,
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: "St. John's Medical College Hospital, Bengaluru"
  },
  worksFor: [
    {
      '@type': 'MedicalBusiness',
      name: 'Deepak Hospital',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4th Block, Jayanagar',
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        postalCode: '560011',
        addressCountry: 'IN'
      }
    },
    {
      '@type': 'MedicalBusiness',
      name: 'Hemalatha Hospital',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Neelasandra',
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        postalCode: '560047',
        addressCountry: 'IN'
      }
    }
  ]
};

export const physicianSchema = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  '@id': 'https://www.surgeonsuhas.in/#physician',
  name: siteSettings.name,
  jobTitle: siteSettings.role,
  description: 'Consultant General & Laparoscopic Surgeon in Bangalore, Karnataka (MBBS, MS, FMAS, FIAGES, FALS). 11+ years clinical experience, 1000+ keyhole surgeries.',
  medicalSpecialty: ['GeneralSurgery', 'LaparoscopicSurgery'],
  url: siteSettings.siteUrl,
  image: `${siteSettings.siteUrl}/images/drsuhas.webp`,
  telephone: siteSettings.phone,
  email: siteSettings.email,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    ...siteSettings.address
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.9255,
    longitude: 77.5815
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00'
    }
  ],
  hospitalAffiliation: [
    {
      '@type': 'Hospital',
      name: 'Deepak Hospital Jayanagar',
      address: '4th Block, Jayanagar, Bangalore, Karnataka 560011'
    },
    {
      '@type': 'Hospital',
      name: 'Hemalatha Hospital Neelasandra',
      address: 'Neelasandra, Bangalore, Karnataka 560047'
    }
  ],
  aggregateRating: aggregateRatingSchema,
  review: reviewSchemas,
  availableService: [
    { '@type': 'MedicalProcedure', name: 'Laparoscopic Surgery Bangalore' },
    { '@type': 'MedicalProcedure', name: 'Hernia Repair Bangalore' },
    { '@type': 'MedicalProcedure', name: 'Gallbladder Surgery Bangalore' },
    { '@type': 'MedicalProcedure', name: 'Thyroid Surgery Bangalore' },
    { '@type': 'MedicalProcedure', name: 'Breast Surgery Bangalore' },
    { '@type': 'MedicalProcedure', name: 'Diabetic Foot Care Bangalore' }
  ]
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.surgeonsuhas.in/#website',
  name: siteSettings.name,
  url: siteSettings.siteUrl,
  publisher: {
    '@id': 'https://www.surgeonsuhas.in/#organization'
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteSettings.siteUrl}/services?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
};

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.item.startsWith('http') ? item.item : `${siteSettings.siteUrl}${item.item.startsWith('/') ? '' : '/'}${item.item}`,
  })),
});

export const faqItems = [
  {
    question: 'Who is the top General & Laparoscopic Surgeon in Bangalore?',
    answer: 'Dr. Suhas S Kumar is a renowned General & Laparoscopic Surgeon practicing in Bangalore, Karnataka, specializing in keyhole surgeries, hernia repair, gallbladder treatment, thyroid, breast care, and diabetic foot management.'
  },
  {
    question: 'What laparoscopic surgeries are performed in Bangalore by Dr. Suhas?',
    answer: 'Dr. Suhas performs laparoscopic appendectomy, laparoscopic cholecystectomy (gallbladder), laparoscopic hernia repair (inguinal, umbilical), gastrointestinal procedures, and emergency abdominal surgeries in Bangalore.'
  },
  {
    question: 'What are the key benefits of laparoscopic surgery over traditional open surgery?',
    answer: 'Laparoscopic surgery offers significantly smaller incisions, minimal scarring, lower risk of post-operative infection, reduced pain, shorter hospital stays, and a much faster return to daily activities.'
  },
  {
    question: 'How do I schedule a consultation for hernia or gallbladder surgery in Bangalore?',
    answer: 'You can book an appointment directly through the website contact page, call +91 95387 65487, or send a message via WhatsApp to schedule your consultation in Bangalore.'
  },
  {
    question: 'Does Dr. Suhas provide specialized treatment for diabetic foot ulcers in Bangalore?',
    answer: 'Yes, Dr. Suhas provides comprehensive diabetic foot care, limb-salvage surgical procedures, wound debridement, and infection management to prevent complications in diabetic patients across Bangalore and Manipal.'
  }
];

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export const buildServiceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: `${service.title} in Bangalore`,
  description: service.summary,
  procedureType: 'https://schema.org/SurgicalProcedure',
  bodyLocation: service.title,
  howPerformed: service.intro,
  preparation: 'Pre-operative routine blood tests, ultrasound/CT evaluation, fasting for 6-8 hours prior to procedure.',
  followup: 'Post-operative clinical check-up at 7 days and 30 days.',
  provider: {
    '@type': 'Physician',
    '@id': 'https://www.surgeonsuhas.in/#physician',
    name: siteSettings.name,
    jobTitle: siteSettings.role,
    url: siteSettings.siteUrl,
    telephone: siteSettings.phone,
    address: {
      '@type': 'PostalAddress',
      ...siteSettings.address
    },
    aggregateRating: aggregateRatingSchema,
    review: reviewSchemas
  },
  areaServed: 'Bangalore, Karnataka',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    url: `${siteSettings.siteUrl}/services/${service.slug}`
  }
});

