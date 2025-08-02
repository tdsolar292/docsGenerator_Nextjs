const config = {
  // Email Configuration
  email: {
    service: 'gmail', // or 'outlook', 'yahoo', etc.
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    adminEmail: 'admin@tdsolar.in',
    adminEmailSenderMailID:'contact@tdsolar.in',
    adminPassword: '', // Use App Password for Gmail
  },
  
  // Company Information
  company: {
    name: 'TD Solar Solutions',
    address: 'GF- G2&G5, Rajnandini Villa, 45, Thana Road, Panchanntala, Jole Doba Para, Khardaha, West Bengal 700117',
    phone: '97755 50672',
    email: 'contact@tdsolar.in',
    website: 'www.tdsolar.in',
    logo: '/logo.jpg' // Place your logo in public folder
  },
  
  // PDF Configuration
  pdf: {
    format: 'a4',
    margin: {
      top: 10,
      bottom: 10,
      left: 5,
      right: 5
    }
  },
  
  // Document Templates
  documentTypes: [
    'Solar Module Installation Proposal',
    'Solar System Maintenance Agreement',
    'Solar Installation Completion Certificate',
    'Solar System Warranty Document'
  ]
};

module.exports = config;