import { siteSettings } from '../config/siteSettings';
import { Activity, Zap, Shield, HeartPulse } from 'lucide-react';

export const serviceCatalog = [
  {
    slug: 'laparoscopic-surgery',
    title: 'Laparoscopic Surgery',
    intro: 'Minimally invasive surgery with smaller wounds, less pain and faster recovery.',
    summary: 'Laparoscopic surgery allows Dr. Suhas to perform carefully planned procedures through tiny incisions with excellent visual control and a smoother recovery journey.',
    image: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Smaller scars', 'Less postoperative pain', 'Shorter hospital stay', 'Quicker return to daily life'],
    coverage: ['Appendix surgery', 'Gallbladder surgery', 'Basic and advanced laparoscopic procedures'],
    whyChoose: ['Precise surgical planning', 'Advanced laparoscopic equipment', 'Personalised post-op guidance'],
  },
  {
    slug: 'gastrointestinal-surgery',
    title: 'Gastrointestinal Surgery',
    intro: 'Specialised treatment for digestive tract conditions with thoughtful surgical care.',
    summary: 'From stomach and bowel conditions to complex abdominal concerns, Dr. Suhas offers comprehensive evaluation and surgical expertise with a patient-first approach.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Digestive tract care', 'Abdominal condition management', 'Personalised treatment planning', 'Compassionate recovery support'],
    coverage: ['Stomach and bowel conditions', 'Complex abdominal surgery', 'Diagnostic and operative care'],
    whyChoose: ['Clear explanation of surgery options', 'Safe recovery planning', 'Experience in advanced abdominal care'],
  },
  {
    slug: 'hernia-surgery',
    title: 'Hernia Surgery',
    intro: 'Reliable repair for inguinal, umbilical and other hernias with a focus on comfort and recovery.',
    summary: 'Hernia surgery is planned carefully to restore strength and reduce the chance of recurrence while helping patients feel confident during recovery.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Repair for common and complex hernias', 'Reduced recurrence risk', 'Calm recovery guidance', 'Improved comfort and mobility'],
    coverage: ['Inguinal and umbilical hernias', 'Recurrent hernia repair', 'Day-to-day recovery support'],
    whyChoose: ['Detailed pre-op assessment', 'Modern surgical technique', 'Long-term follow-up care'],
  },
  {
    slug: 'gallbladder-surgery',
    title: 'Gall Bladder Surgery',
    intro: 'Expert treatment for gallstones and related gallbladder conditions.',
    summary: 'Gallbladder surgery is offered with careful evaluation and precise technique so patients can move comfortably into recovery and resume normal routines sooner.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Treatment for gallstones', 'Symptom relief', 'Modern minimally invasive approach', 'Short recovery windows'],
    coverage: ['Cholecystectomy', 'Gallbladder pain management', 'Post-op recovery support'],
    whyChoose: ['Clear diagnosis and planning', 'Compassionate support', 'Focused on faster healing'],
  },
  {
    slug: 'thyroid-surgery',
    title: 'Thyroid Surgery',
    intro: 'Specialised thyroid procedures carried out with precision and careful patient support.',
    summary: 'Dr. Suhas provides expert care for thyroid conditions that require surgery, guiding patients through diagnosis, operation and recovery with reassurance and clarity.',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Thyroid nodule and enlargement treatment', 'Careful pre-op planning', 'Precise surgical technique', 'Supportive follow-up'],
    coverage: ['Thyroidectomy', 'Thyroid enlargement care', 'Post-surgery guidance'],
    whyChoose: ['Experienced surgical judgement', 'Strong communication', 'Patient-centred recovery care'],
  },
  {
    slug: 'varicose-vein-surgery',
    title: 'Varicose Vein Surgery',
    intro: 'Treatment for painful and visible varicose veins that affects comfort and mobility.',
    summary: 'Varicose vein surgery helps improve appearance, reduce discomfort and restore confidence while supporting a smoother return to daily activities.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Relief from discomfort', 'Improved mobility', 'Aesthetic and functional improvement', 'Tailored treatment plans'],
    coverage: ['Varicose vein evaluation', 'Surgical treatment options', 'Recovery guidance'],
    whyChoose: ['Focused on symptom relief', 'Thoughtful surgical planning', 'Clear recovery advice'],
  },
  {
    slug: 'piles-fissure-fistula',
    title: 'Piles, Fissure & Fistula Care',
    intro: 'Comfort-focused care for anorectal conditions such as piles, fissures and fistulas.',
    summary: 'These conditions can be uncomfortable and affect daily life, and Dr. Suhas offers careful assessment and treatment with a strong focus on symptom relief and recovery.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Piles treatment', 'Fissure care', 'Fistula management', 'Improved quality of life'],
    coverage: ['Laser and surgical options', 'Detailed evaluation', 'Recovery and follow-up'],
    whyChoose: ['Compassionate consultation', 'Modern treatment options', 'Practical recovery support'],
  },
  {
    slug: 'diabetic-foot-surgery',
    title: 'Diabetic Foot Surgery',
    intro: 'Specialist surgical care for diabetic foot complications and chronic wounds.',
    summary: 'Diabetic foot surgery is approached with careful assessment and infection control to help preserve mobility and support healing as safely as possible.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Foot ulcer and complication care', 'Infection-focused treatment', 'Mobility-preserving surgery', 'Supportive postoperative care'],
    coverage: ['Ulcer management', 'Foot surgery planning', 'Recovery support'],
    whyChoose: ['Careful multidisciplinary approach', 'Attention to wound healing', 'Patient-focused follow-up'],
  },
  {
    slug: 'breast-surgery',
    title: 'Breast Surgery',
    intro: 'Compassionate surgical support for breast conditions, including oncological care.',
    summary: 'Breast surgery is handled with empathy, precision and a clear explanation of every step so patients feel informed and supported.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Breast condition evaluation', 'Oncology-focused treatment', 'Clear communication', 'Gentle recovery support'],
    coverage: ['Breast surgery consultation', 'Treatment planning', 'Post-surgery follow-up'],
    whyChoose: ['Thoughtful patient guidance', 'Detailed surgical planning', 'Compassionate care'],
  },
  {
    slug: 'trauma-emergency-surgery',
    title: 'Trauma & Emergency Surgery',
    intro: 'Urgent surgical care for injuries and acute abdominal conditions.',
    summary: 'Emergency surgery requires quick judgement and calm execution, and Dr. Suhas offers experienced support when time-sensitive decisions matter most.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Urgent intervention', 'Rapid assessment', 'Experienced handling of critical cases', 'Immediate follow-up care'],
    coverage: ['Trauma care', 'Emergency abdominal surgery', 'Critical surgical support'],
    whyChoose: ['Rapid response', 'Experienced leadership', 'Clear communication during emergencies'],
  },
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
    src: `${import.meta.env.BASE_URL}images/hero-doctor.png`,
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
  name: siteSettings.name,
  url: siteSettings.siteUrl,
  telephone: siteSettings.phone,
  email: siteSettings.email,
  image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80',
  address: {
    '@type': 'PostalAddress',
    ...siteSettings.address
  },
  areaServed: ['Bengaluru', 'Jayanagar', 'Karnataka'],
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteSettings.name,
  jobTitle: siteSettings.role,
  url: siteSettings.siteUrl,
  image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80',
  worksFor: {
    '@type': 'MedicalBusiness',
    name: siteSettings.name,
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteSettings.name,
  url: siteSettings.siteUrl,
};

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.item,
  })),
});

export const faqItems = [
  {
    question: 'What is laparoscopic surgery?',
    answer: 'Laparoscopic surgery is a minimally invasive surgical technique where operations are performed through small incisions using a camera and specialized instruments, resulting in less pain and faster recovery.'
  },
  {
    question: 'What are the benefits compared to traditional surgery?',
    answer: 'Benefits include smaller incisions, less pain, reduced blood loss, shorter hospital stays, quicker recovery, and less scarring.'
  },
  {
    question: 'How long is the recovery time?',
    answer: 'Most patients can return to normal activities within 1-2 weeks, though this varies depending on the procedure. Dr. Suhas provides personalised recovery guidance for every patient.'
  },
  {
    question: 'Is laparoscopic surgery safe?',
    answer: 'Yes, laparoscopic surgery is widely regarded as safe and effective. Dr. Suhas has performed over 1000 successful procedures with a strong track record of patient safety.'
  },
  {
    question: 'What conditions can be treated with laparoscopic surgery?',
    answer: 'Common conditions include gallstones, hernias, appendicitis, gastrointestinal issues, and certain types of cancer. Dr. Suhas can advise whether laparoscopic surgery is appropriate for your condition.'
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
  '@type': 'Service',
  name: service.title,
  description: service.summary,
  provider: {
    '@type': 'MedicalBusiness',
    name: siteSettings.name,
    url: siteSettings.siteUrl,
  },
  areaServed: 'Bengaluru',
  serviceType: service.title,
});
