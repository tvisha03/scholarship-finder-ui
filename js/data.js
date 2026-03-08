/**
 * data.js — Generate 250 dummy scholarship objects
 */

const COUNTRIES = [
  { name: "USA", flag: "🇺🇸" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Switzerland", flag: "🇨🇭" },
];

const STREAMS = ["STEM", "Business", "Law", "IR", "Arts", "Medicine"];

const LEVELS = ["UG", "PG", "PhD"];

const FUNDING_TYPES = ["Full", "Partial", "Tuition Only", "Living Stipend"];

const UNIVERSITIES = {
  USA: [
    "Stanford University",
    "MIT",
    "Harvard University",
    "Yale University",
    "Columbia University",
    "Princeton University",
    "UC Berkeley",
    "Caltech",
    "University of Chicago",
    "Duke University",
  ],
  UK: [
    "University of Oxford",
    "University of Cambridge",
    "Imperial College London",
    "UCL",
    "LSE",
    "University of Edinburgh",
    "King's College London",
    "University of Manchester",
    "University of Bristol",
    "University of Warwick",
  ],
  Canada: [
    "University of Toronto",
    "McGill University",
    "UBC",
    "University of Alberta",
    "University of Waterloo",
    "University of Montreal",
    "Queen's University",
    "McMaster University",
    "Western University",
    "Dalhousie University",
  ],
  Germany: [
    "TU Munich",
    "LMU Munich",
    "Heidelberg University",
    "Humboldt University",
    "RWTH Aachen",
    "Free University of Berlin",
    "University of Freiburg",
    "TU Berlin",
    "University of Göttingen",
    "University of Tübingen",
  ],
  France: [
    "Sorbonne University",
    "École Polytechnique",
    "Sciences Po",
    "ENS Paris",
    "HEC Paris",
    "Paris-Saclay University",
    "Université PSL",
    "Toulouse School of Economics",
    "ESSEC Business School",
    "INSEAD",
  ],
  Australia: [
    "University of Melbourne",
    "University of Sydney",
    "ANU",
    "UNSW",
    "Monash University",
    "University of Queensland",
    "University of Adelaide",
    "Macquarie University",
    "University of Western Australia",
    "Deakin University",
  ],
  Netherlands: [
    "University of Amsterdam",
    "Delft University",
    "Leiden University",
    "Utrecht University",
    "Erasmus University",
    "VU Amsterdam",
    "University of Groningen",
    "Eindhoven University",
    "Wageningen University",
    "Radboud University",
  ],
  Sweden: [
    "KTH Royal Institute",
    "Lund University",
    "Uppsala University",
    "Stockholm University",
    "Chalmers University",
    "Gothenburg University",
    "Karolinska Institute",
    "Linköping University",
    "Umeå University",
    "Malmö University",
  ],
  Japan: [
    "University of Tokyo",
    "Kyoto University",
    "Osaka University",
    "Tohoku University",
    "Tokyo Institute of Technology",
    "Nagoya University",
    "Hokkaido University",
    "Keio University",
    "Waseda University",
    "Tsukuba University",
  ],
  Switzerland: [
    "ETH Zurich",
    "EPFL",
    "University of Zurich",
    "University of Geneva",
    "University of Bern",
    "University of Basel",
    "University of Lausanne",
    "University of St. Gallen",
    "University of Fribourg",
    "University of Lucerne",
  ],
};

const SCHOLARSHIP_PREFIXES = [
  "Global Scholars",
  "International Excellence",
  "Future Leaders",
  "Academic Merit",
  "Research Innovation",
  "Diversity & Inclusion",
  "Chancellor's",
  "Presidential",
  "Dean's",
  "Provost's",
  "Commonwealth",
  "Graduate Research",
  "Emerging Talent",
  "World Class",
  "Horizon",
  "Bright Futures",
  "NextGen",
  "Pioneer",
  "Visionary",
  "Impact",
  "Global Reach",
  "Fulbright",
  "Rhodes Inspired",
  "Endeavour",
  "Chevening Style",
  "DAAD Exchange",
  "Erasmus Plus",
  "Rotary Peace",
  "Gates Cambridge",
  "Marshall Plan",
];

const DESCRIPTIONS = {
  STEM: [
    "Scholarship for outstanding STEM students pursuing cutting-edge research.",
    "Supporting the next generation of scientists and engineers.",
    "Funding innovative research in science, technology, engineering, and mathematics.",
    "For students demonstrating exceptional aptitude in STEM disciplines.",
    "Empowering future innovators to drive technological progress.",
  ],
  Business: [
    "For aspiring business leaders with a global perspective.",
    "Supporting future entrepreneurs and business innovators.",
    "Scholarship for MBA and business program applicants.",
    "Enabling talented students to pursue excellence in business studies.",
    "For students committed to making an impact in the business world.",
  ],
  Law: [
    "For students pursuing a career in international law.",
    "Supporting future legal professionals and advocates.",
    "Scholarship for law students focused on human rights and justice.",
    "Funding the next generation of legal scholars.",
    "For students dedicated to advancing the rule of law.",
  ],
  IR: [
    "For students of international relations and diplomacy.",
    "Supporting future diplomats and policy makers.",
    "Scholarship for students passionate about global governance.",
    "Enabling cross-cultural understanding through academic excellence.",
    "For students committed to international peace and cooperation.",
  ],
  Arts: [
    "For creative minds in fine arts, literature, and humanities.",
    "Supporting artistic expression and cultural scholarship.",
    "Scholarship for students in visual arts, music, or performing arts.",
    "Funding the next generation of artists and cultural leaders.",
    "For students dedicated to preserving and advancing the arts.",
  ],
  Medicine: [
    "For aspiring medical professionals and healthcare leaders.",
    "Supporting students in medicine, nursing, and public health.",
    "Scholarship for students dedicated to improving global health.",
    "Funding research-driven medical education.",
    "For students committed to healthcare innovation and service.",
  ],
};

/**
 * Seeded pseudo-random number generator for reproducible data
 */
function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Generate 250 scholarship objects with diverse, realistic data
 */
function generateDummyData() {
  const scholarships = [];
  const rand = seededRandom(42);

  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const pickAmount = () => {
    const amounts = [
      5000, 8000, 10000, 12000, 15000, 18000, 20000, 25000, 30000, 35000,
      40000, 45000, 50000, 60000, 75000, 100000,
    ];
    return amounts[Math.floor(rand() * amounts.length)];
  };

  const generateDeadline = (index) => {
    // Spread deadlines across the next ~2 years from current date
    const now = new Date();
    const currentYear = now.getFullYear();
    // Items 1-125 get deadlines this year & next, 126-250 get next year & beyond
    const yearOffset = Math.floor(index / 125);
    const year = currentYear + yearOffset;
    const month = (index % 12) + 1;
    const day = Math.floor(rand() * 28) + 1;
    // If generated date is in the past, push it forward by 1 year
    const generated = new Date(year, month - 1, day);
    const finalYear = generated <= now ? year + 1 : year;
    return `${finalYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  for (let i = 1; i <= 250; i++) {
    const country = pick(COUNTRIES);
    const stream = pick(STREAMS);
    const level = pick(LEVELS);
    const fundingType = pick(FUNDING_TYPES);
    const university = pick(UNIVERSITIES[country.name]);
    const prefix = pick(SCHOLARSHIP_PREFIXES);
    const amount = pickAmount();
    const description = pick(DESCRIPTIONS[stream]);

    scholarships.push({
      id: i,
      title: `${prefix} ${stream} ${level === "PhD" ? "Doctoral" : level === "PG" ? "Graduate" : "Undergraduate"} Award`,
      country: country.name,
      flag: country.flag,
      stream,
      level,
      amount,
      fundingType,
      deadline: generateDeadline(i),
      university,
      description,
    });
  }

  return scholarships;
}
