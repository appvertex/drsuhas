export const siteSettings = {
  name: 'Dr. Suhas S Kumar',
  role: 'Consultant General & Laparoscopic Surgeon',
  phone: '+91 95387 65487',
  phoneUrl: '+919538765487',
  whatsappNumber: '919538765487',
  email: 'suhassk2@gmail.com',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://www.surgeonsuhas.in',
  address: {
    streetAddress: 'Jayanagar & Neelasandra',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    postalCode: '560011',
    addressCountry: 'IN',
  },
  locations: [
    {
      name: 'Deepak Hospital',
      area: 'Jayanagar, Bangalore',
      address: 'Deepak Hospital, 33rd Cross Rd, 7th Block, Jayanagar, Bengaluru, Karnataka 560082',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5230543847545!2d77.58185347473823!3d12.925771815619775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1597abaf55eb%3A0xa61dbcf3bb6df6e1!2sDeepak%20Hospital!5e0!3m2!1sen!2sin!4v1725280000000!5m2!1sen!2sin',
      mapsUrl: 'https://maps.google.com/?q=Deepak+Hospital+Jayanagar+Bangalore'
    },
    {
      name: 'Hemalatha Hospital',
      area: 'Neelasandra, Bangalore',
      address: 'Hemalatha Hospital, Neelasandra, Bengaluru, Karnataka 560047',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.6123456789!2d77.61669501145074!3d12.953531471448763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae153b2a1f4f31%3A0xb12bcd0e45678901!2sHemalatha%20Hospital%2C%20Neelasandra!5e0!3m2!1sen!2sin!4v1725280000001!5m2!1sen!2sin',
      mapsUrl: 'https://www.google.com/maps?q=12.953531471448763,77.61669501145074'
    }
  ],
  socials: {
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: ''
  }
};
