export const site = {
  displayWord: 'PORTFOLIO',
  faceLetterIndex: 5,

  eyebrow: 'ACCOUNTING • DATA ANALYTICS • BUSINESS INTELLIGENCE',

  firstName: 'IMRAAN',
  signatureName: 'IMRAAN N',
  lastName: 'N',

  connect: {
    status: 'is open to opportunities',
    cta: "Let's connect",
    href: '#contact',
  },

  intro: {
    heading: 'HELLO',
    lede: "I'm IMRAAN N — an Accounting & Data Analytics Fresher.",
    paragraphs: [
      "I am a B.Com Professional Accounting student with practical internship experience in accounting, reconciliation, billing, GST support, and financial record management using Tally Prime.",
      "I am building my career at the intersection of accounting and data analytics, using Excel, Power BI, Tableau, SQL, and Python to clean data, create dashboards, and turn financial information into useful business insights.",
    ],
  },

  education: {
    heading: 'EDUCATION',
    items: [
      {
        degree: 'B.Com Professional Accounting',
        detail: '2024 — 2027 | NGM College (Autonomous), Pollachi',
      },
      {
        degree: 'Higher Secondary Education (Commerce)',
        detail: 'SKP Higher Secondary School, Udumalpet',
      },
    ],
  },

  skills: {
    heading: 'SKILLS',
    items: [
      { label: 'Advanced Excel', short: 'XL', src:  '/assets/skills/Advance excel.png', scale: 1 },
      { label: 'Power BI', short: 'BI', src: '/assets/skills/Power BI.png', scale: 1 },
      { label: 'Tableau', short: 'TB', src: '/assets/skills/Tableau.png', scale: 1 },
      { label: 'SQL', short: 'SQL', src: '/assets/skills/SQL.png', scale: 1 },
      { label: 'Python', short: 'PY', src: '/assets/skills/Python.png', scale: 1 },
      { label: 'Tally Prime', short: 'TP', src: '/assets/skills/Tally Prime.png', scale: 1 },
    ] as { label: string; short: string; src: string | null; scale: number }[],
  },

  studio: {
    heading: 'PROJECTS',
    items: [
      {
        quote: 'Sales Report using Excel',
        author: 'Excel • Pivot Tables • Pivot Charts',
        rotation: -5, drop: 0, shade: 0.2, skew: -0.9, indent: 1,
        objectPosition: '50% 50%', href: "https://github.com/imraan-n23/Projects/tree/f896d7414ba5653727642ec36688bb3fab9fde90/Excel%20Projects/Sales%20Report%202021%20Project",
      },
      {
        quote: 'Sales Analysis',
        author: 'Data Analysis • Dashboarding • Business Insights',
        rotation: 1.2, drop: 11, shade: 0.6, skew: 0.7, indent: 0,
        objectPosition: '50% 50%', href: "https://github.com/imraan-n23/Projects/tree/f896d7414ba5653727642ec36688bb3fab9fde90/Power%20BI%20Projects/Sales%20Analysis",
      },
      {
        quote: 'E-Commerce-Sales-Analytics',
        author: 'Power BI • Power Query • DAX',
        rotation: 4, drop: 3, shade: 0.35, skew: -0.5, indent: 2,
        objectPosition: '50% 50%', href: "https://github.com/imraan-n23/Projects/tree/f896d7414ba5653727642ec36688bb3fab9fde90/Power%20BI%20Projects/E-Commerce-Sales-Analytics",
      },
      {
        quote: 'Financial Accounting & MIS Analysis',
        author: 'Tally Prime • Excel • MIS Reporting',
        rotation: -2, drop: 0, shade: 0.45, skew: 0.4, indent: 1,
        objectPosition: '50% 50%', href: "https://github.com/imraan-n23/Projects/tree/f896d7414ba5653727642ec36688bb3fab9fde90/Excel%20Projects/Financial%20Accounting%20%26%20Mis%20Analysis",
      },
      {
        quote: 'Personal Finance & Expense Analytics Dashboard',
        author: 'Excel • Data Analysis • Dashboarding',
        rotation: 3, drop: 7, shade: 0.3, skew: -0.3, indent: 1,
        objectPosition: '50% 50%', href: "https://github.com/imraan-n23/Projects/tree/f896d7414ba5653727642ec36688bb3fab9fde90/Excel%20Projects/Personal%20Finance%20%26%20Expense%20Analytics%20Dashboard",
      },
    ],
  },

  experience: {
    heading: 'EXPERIENCE',
    items: [
      {
        period: 'INTERNSHIP EXPERIENCE',
        role: 'Accounting Intern',
        company: 'Chartered Accountant Office | Accounting, reconciliation, billing, GST support, financial records, and Tally Prime',
      },
    ],
  },

  certifications: {
  heading: 'CERTIFICATIONS',

  items: [
    {
      name: 'Power BI for Beginners',
      provider: 'Coursera',
      href: '/assets/certificates/Power BI for Beginners.pdf',
    },
    {
      name: 'Work Smarter with Microsoft Excel',
      provider: 'Coursera',
      href: '/assets/certificates/Work Smarter with Microsoft Excel.pdf',
    },
    {
      name: 'Data Analytics Essentials',
      provider: 'Cisco',
      href: '/assets/certificates/Data Analytics Essentials.pdf',
    },
    {
      name: 'Financial Reporting: Ledgers, Taxes, Auditing Best Practices',
      provider: 'Coursera',
      href: '/assets/certificates/Financial Reporting Ledgers, Taxes, Auditing Best Practices.pdf',
    },
    {
      name: 'Tally Prime',
      provider: 'Tally',
      href: '/assets/certificates/Tally Prime.pdf',
    },
    {
      name: 'ChatGPT and AI for Accountants',
      provider: 'Coursera',
      href: '/assets/certificates/ChatGPT and AI for Accountants.pdf',
    },
    {
      name: 'SQL Intermediate',
      provider: 'DataCamp',
      href: '/assets/certificates/SQL Intermediate.pdf',
    },
  ],
},

  footer: {
    heading: "Let's connect",
    acknowledged: 'See you there',
    sub: 'Open to opportunities in accounting, financial analysis, and data analytics roles.',
    location: 'Udumalpet, Tamil Nadu, India',
    href: 'mailto:imraannabi7@gmail.com' as string | null,
    marquee: ['IMRAAN N', 'ACCOUNTING', 'DATA ANALYTICS'],
    links: [
      { label: 'LinkedIn', href: "https://www.linkedin.com/in/imraan-nabi/"},
      { label: 'GitHub', href: 'https://github.com/imraan-n23'},
      { label: 'Email', href: 'mailto:imraannabi7@gmail.com' },
      { label: 'Resume', href:'/assets/Imraan_N_Resume.pdf' },
      { label: 'Contact Number', href:'tel:+91 88385 36765' },

    ],
  },
} as const

export type Site = typeof site
