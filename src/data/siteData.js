/* ═══════════════════════════════════════════
   ALL CONTENT — extracted directly from the
   NAMG & Co. PDF profile
═══════════════════════════════════════════ */

export const NAV_LINKS = ["Home", "About", "Services", "RERA", "Resources", "Team", "Contact"];

/* Primary WhatsApp number for the site (country code + number, no + or spaces) */
export const WHATSAPP_NUMBER = "919806509694";

/* ── INCOME TAX SLABS — FY 2025-26 / AY 2026-27 (resident individual, below 60) ──
   New regime figures per Finance Act 2025 (unchanged for FY 2026-27 per Budget 2026).
   Cess: 4% Health & Education Cess applies on tax + surcharge in both regimes. */
export const INCOME_TAX_NEW_REGIME = {
  standardDeduction: 75000,
  rebateLimit: 1200000, // taxable income up to which 87A rebate applies
  rebateAmount: 60000,
  slabs: [
    { upto: 400000, rate: 0 },
    { upto: 800000, rate: 5 },
    { upto: 1200000, rate: 10 },
    { upto: 1600000, rate: 15 },
    { upto: 2000000, rate: 20 },
    { upto: 2400000, rate: 25 },
    { upto: Infinity, rate: 30 },
  ],
};

export const INCOME_TAX_OLD_REGIME = {
  standardDeduction: 50000,
  rebateLimit: 500000,
  rebateAmount: 12500,
  slabs: [
    { upto: 250000, rate: 0 },
    { upto: 500000, rate: 5 },
    { upto: 1000000, rate: 20 },
    { upto: Infinity, rate: 30 },
  ],
};

/* ── GST RATE SLABS — GST 2.0, effective 22 Sep 2025 ── */
export const GST_RATE_SLABS = [
  {
    rate: "0% (Nil)",
    desc: "Essentials & exempt goods",
    examples: "Fresh produce, milk, life-saving drugs, educational materials, individual health & life insurance",
  },
  {
    rate: "5%",
    desc: "Daily essentials & priority goods",
    examples: "Packaged food, medicines, agricultural equipment, small cars/two-wheelers (specified), soaps & toiletries",
  },
  {
    rate: "18%",
    desc: "Standard rate — most goods & services",
    examples: "Most professional & business services, electronics, appliances, restaurants, general goods",
  },
  {
    rate: "40%",
    desc: "Luxury & sin goods",
    examples: "Pan masala, tobacco products, aerated/caffeinated drinks, luxury cars, high-end goods",
  },
];
export const GST_RATE_NOTE =
  "Simplified to a 3-slab structure (5% / 18% / 40%, plus Nil) after the GST Council's GST 2.0 reform effective 22 Sep 2025; a few niche rates (3% on gems/jewellery, 0.25% on rough diamonds) continue outside this table.";

/* ── RERA CHHATTISGARH — indicative registration fee slabs (₹ per sq.m) ──
   Source: publicly published CG RERA fee schedule. Confirm exact figures for
   your project with the firm before relying on them for filing. */
export const RERA_FEE_RATES = [
  { key: "residential", label: "Residential / Group Housing", upto1000: 5, above1000: 10 },
  { key: "commercial", label: "Commercial", upto1000: 20, above1000: 25 },
  { key: "mixed", label: "Mixed-Use (Residential + Commercial)", upto1000: 10, above1000: 15 },
  { key: "plotted", label: "Plotted / Layout Development", upto1000: 5, above1000: 5 },
];
export const RERA_FEE_CAP = 1000000; // indicative overall cap often applied

/* ── USEFUL LINKS ── */
export const USEFUL_LINKS = [
  {
    title: "Income Tax e-Filing Portal",
    desc: "File returns, check refund status, download forms & AIS/26AS",
    url: "https://www.incometax.gov.in",
  },
  {
    title: "GST Portal",
    desc: "GST registration, return filing, and e-way bill services",
    url: "https://www.gst.gov.in",
  },
  {
    title: "Chhattisgarh RERA (CG RERA)",
    desc: "Project registration, complaint filing & registered project search",
    url: "https://rera.cgstate.gov.in",
  },
  {
    title: "ICAI — Institute of Chartered Accountants of India",
    desc: "Firm & member verification, standards, and CPE resources",
    url: "https://www.icai.org",
  },
  {
    title: "MCA — Ministry of Corporate Affairs",
    desc: "Company/LLP incorporation and statutory filings",
    url: "https://www.mca.gov.in",
  },
];

export const STATS = [
  { num: "95+", lbl: "RERA Projects" },
  { num: "4", lbl: "Expert Partners" },
  { num: "2016", lbl: "Established" },
  { num: "3", lbl: "Office Locations" },
];

export const CREDENTIALS = [
  { label: "RBI Category II", sub: "Unique Code: 1023479" },
  { label: "MEF No.", sub: "MEF112948" },
  { label: "ICAI Firm Reg.", sub: "021640C" },
  { label: "IBBI Registered Valuer", sub: "IBBI/RV/05/2020/13613" },
];

export const SERVICES = [
  {
    icon: "/services/gst-advisory.png",
    title: "GST Advisory & Litigations",
    desc: "Expert guidance on Goods & Services Tax compliance, refunds, departmental audits, and appellate proceedings.",
  },
  {
    icon: "/services/income-tax.png",
    title: "Income Tax Services",
    desc: "Comprehensive advisory, litigation support, audits, and strategic tax planning solutions.",
  },
  {
    icon: "/services/regulatory-compliances.png",
    title: "Regulatory & Compliances",
    desc: "Ensuring full adherence to statutory requirements across all regulatory frameworks.",
  },
  {
    icon: "/services/transaction-advisory.png",
    title: "Transaction Advisory",
    desc: "Strategic guidance for mergers, acquisitions, and complex business transactions.",
  },
  {
    icon: "/services/audit-assurance.png",
    title: "Audit & Assurance",
    desc: "Statutory audits, internal audits, bank audits, and specialised audit services.",
  },
  {
    icon: "/services/corporate-finance.png",
    title: "Corporate Finance",
    desc: "Project finance, financial modelling, and comprehensive corporate financing solutions.",
  },
  {
    icon: "/services/securities-valuation.png",
    title: "Securities & Financial Assets Valuation",
    desc: "Merger and equity valuations, start-up and hedge-fund valuations, DCF and buyback valuations, financial modelling expertise.",
  },
  {
    icon: "/services/corporate-law.png",
    title: "Corporate Law",
    desc: "Company formation and structuring, corporate governance advisory, and legal compliance management.",
  },
  {
    icon: "/services/corporate-training.png",
    title: "Corporate Training",
    desc: "GST and Income Tax workshops, CPE training sessions for professionals, and industry-specific knowledge sessions.",
  },
  {
    icon: "/services/virtual-cfo.png",
    title: "Virtual CFO Services",
    desc: "Strategic financial management, MIS and reporting systems, cash flow and budgeting support.",
  },
];

export const RERA_STEPS = [
  {
    num: "01",
    title: "Project Registration",
    desc: "End-to-end support for RERA project registration with regulatory authorities.",
  },
  {
    num: "02",
    title: "Quarterly Compliances",
    desc: "Timely filing of quarterly progress reports and compliance documentation.",
  },
  {
    num: "03",
    title: "Annual Compliances",
    desc: "Comprehensive annual compliance management and audit support.",
  },
  {
    num: "04",
    title: "RERA Litigations",
    desc: "Expert representation in RERA appellate proceedings and dispute resolution.",
  },
];

export const RERA_CITIES = ["Raipur", "Bilaspur", "Durg", "Bhilai", "Korba", "Raigarh"];

export const TEAM = [
  {
    name: "CA Nitin Goyal",
    quals: "FCA, CS, CMA, LL.M, IBBI Registered Valuer",
    mem: "432043",
    rank: "All India Rank 48 in CA Final",
    expertise:
      "Leading expert in tax litigation, GST advisory, and securities valuation. Regular contributor to ICAI journals and conducts CPE training for professional institutes. Specialises in appellate proceedings, departmental audits, and complex financial modelling.",
    email: "nitin@namg.in",
    mobile: "8770132482",
    photo: "/team/nitin-goyal.jpg",
    linkedin: "https://www.linkedin.com/in/nitin-goyal-423997b8/?skipRedirect=true"
  },
  {
    name: "CA Aniket Goel",
    quals: "FCA, B.Com",
    mem: "165892",
    rank: "Over a decade of experience",
    expertise:
      "Over a decade of experience in taxation and strategic advisory. Leads practice areas in Indirect Taxation, Foreign Trade Policy, Project Finance, Virtual CFO services, and Mergers & Acquisitions. Passionate about driving value-added strategies for business growth and financial efficiency.",
    email: "aniket@namg.in",
    mobile: "90211-85551",
    photo: "/team/aniket-goel.jpg",
    linkedin: "https://www.linkedin.com/in/ca-aniket-mahendra-goel-9661925b/",
  },
  {
    name: "CA Ankit Goyal",
    quals: "FCA, B.Com",
    mem: "430953",
    rank: "95+ RERA project registrations",
    expertise:
      "Spearheads the firm's RERA practice with over 95 successful project registrations across Chhattisgarh. Expert in statutory audits, bank audits, business setup, and finance syndication. Manages the Bilaspur office and specialises in economic feasibility studies and project report preparation.",
    email: "ankit@namg.in",
    mobile: "98065-09694",
    photo: "/team/ankit-goyal.jpg",
    linkedin: "https://www.linkedin.com/in/ca-ankit-goyal-80691977/",
  },
  {
    name: "CA Aditi Agrawal",
    quals: "ACA, B.Com",
    mem: "460703",
    rank: "Bank audit specialist",
    expertise:
      "Specialises in bank audits including statutory branch audits, stock audits, and concurrent audits. Expert in income tax compliance, trust and society registrations, and management consultancy services including MIS development and management audits.",
    email: "aditi@namg.in",
    mobile: "75871-52490",
    photo: "/team/aditi-agrawal.jpg",
  },
];

export const OFFICES = [
  {
    city: "Raipur",
    offices: [
      {
        addr: "Samta Colony - 205, 2nd Floor, Samta Shopping Arcade, Samta Colony, Raipur (Chhattisgarh) - 492001",
        ph: "+91 87701 32482",
      },
      {
        addr: "Currency Tower: 4058 & 4059, 4th Floor, Currency Tower, VIP Chowk, Raipur - 492001",
        ph: "+91 90211 85551",
      },
    ],
  },
  {
    city: "Bilaspur",
    offices: [
      {
        addr: "Bilaspur Branch: B-205, 2nd Floor, Narayan Plaza, Link Road, Bilaspur - 495001",
        ph: "98065 09694",
      },
    ],
  },
];

export const WHY = [
  {
    icon: "🏆",
    title: "Proven Track Record",
    desc: "95+ RERA projects registered across Chhattisgarh, RBI empanelment, and recognition from professional institutes.",
  },
  {
    icon: "🎯",
    title: "Comprehensive Expertise",
    desc: "Multidisciplinary team offering integrated solutions across taxation, audit, valuation, and corporate advisory.",
  },
  {
    icon: "🤝",
    title: "Client-Centric Approach",
    desc: "Dedicated to delivering personalised, value-driven solutions that drive business growth and regulatory excellence.",
  },
  {
    icon: "📍",
    title: "Strategic Locations",
    desc: "Presence in key Chhattisgarh cities ensures accessibility and deep understanding of regional business dynamics.",
  },
];

export const ADDITIONAL_SERVICES = [
  {
    title: "Securities & Financial Assets Valuation",
    items: ["Merger and equity valuations", "Start-up and hedge-fund valuations", "DCF and buyback valuations", "Financial modelling expertise"],
  },
  {
    title: "Corporate Law",
    items: ["Company formation and structuring", "Corporate governance advisory", "Legal compliance management"],
  },
  {
    title: "Corporate Training",
    items: ["GST and Income Tax workshops", "CPE training sessions for professionals", "Industry-specific knowledge sessions"],
  },
  {
    title: "Virtual CFO Services",
    items: ["Strategic financial management", "MIS and reporting systems", "Cash flow and budgeting support"],
  },
];
