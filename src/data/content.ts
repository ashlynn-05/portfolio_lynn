// Every number on the site comes from Lynn's CV (public/BD_resume.pdf).
// Anything not on the CV is a bracketed placeholder for Lynn to fill in.

export const contact = {
  name: 'Lynn Le',
  email: 'tlinhle05@gmail.com',
  phone: '0449 921 128',
  phoneHref: '+61449921128',
  linkedin: 'https://www.linkedin.com/in/lynn-le-9940b4307/',
  resume: 'BD_resume.pdf',
};

export type Fill = 'berry' | 'rose' | 'mist' | 'caramel' | 'jasmine';

/* Company logos, fetched from each company's own site or profile (October 2026).
   mark = square-ish icon for small tiles; full = the wide logo for the logo strip. */
export type LogoId = 'sidekick' | 'deakin' | 'codrops' | 'sw-education' | 'kim-beauty' | 'muse-crochet';
export interface Logo { name: string; mark: string; markW: number; markH: number; full?: string; fullW?: number; fullH?: number; round?: boolean; ink?: string; slug: string }
export const logos: Record<LogoId, Logo> = {
  'sidekick': { name: 'Sidekick', slug: 'sidekick', mark: 'img/logos/sidekick-mark.webp', markW: 192, markH: 185, ink: '#0F64F9' },
  'deakin': { name: 'Deakin University', slug: 'bgis', mark: 'img/logos/deakin-mark.webp', markW: 256, markH: 256, round: true, ink: '#151918' },
  'codrops': { name: 'Codrops', slug: 'codrops', mark: 'img/logos/codrops-mark.svg', markW: 240, markH: 240, full: 'img/logos/codrops-full.webp', fullW: 640, fullH: 71 },
  'sw-education': { name: 'SW Education', slug: 'elite-talks', mark: 'img/logos/sw-mark.webp', markW: 106, markH: 106, full: 'img/logos/sw-full.webp', fullW: 640, fullH: 91 },
  'kim-beauty': { name: 'Kim Beauty Warehouse', slug: 'kim-beauty', mark: 'img/logos/kim-mark.webp', markW: 192, markH: 99, full: 'img/logos/kim-full.webp', fullW: 640, fullH: 137 },
  'muse-crochet': { name: 'The Muse Crochet', slug: 'muse-crochet', mark: 'img/logos/muse-mark.webp', markW: 256, markH: 246 },
};
export const logoOrder: LogoId[] = ['sidekick', 'deakin', 'codrops', 'sw-education', 'kim-beauty', 'muse-crochet'];

export interface Project {
  slug: string;
  fill: Fill;
  icon: string; // Phosphor bold icon name
  label: string; // folder label
  meta: string; // folder meta line
  org: string;
  logo?: LogoId;
  role: string;
  where: string;
  dates: string;
  titleA: string;
  titleEm: string;
  chips: string[];
  problem: string;
  problemLabel?: string;
  did: (string | { text: string; href: string; link: string })[];
  metrics: { value: number | null; prefix?: string; suffix?: string; text?: string; caption: string }[];
  impactTitle: string;
  impactNote: string;
  impactOpen?: boolean;
  skills: string[];
  pos: { left: string; top: string };
}

export const projects: Project[] = [
  {
    slug: 'sidekick', fill: 'berry', icon: 'target', label: 'lead research', meta: 'Sidekick, 2026',
    org: 'Sidekick (YC S26)', logo: 'sidekick', role: 'Business Development Representative Intern', where: 'Remote', dates: 'Jun 2026 to now',
    titleA: 'Finding the first leads for a', titleEm: 'YC startup.',
    chips: ['AI automation start-up', 'remote'],
    problem: "An early-stage AI automation start-up needed B2B clients for its AI-powered SMS assistant, across manufacturing, auto dealership and retail.",
    did: [
      "Ran targeted outbound for Sidekick's AI-powered SMS assistant, sourcing ~300 B2B leads over three months.",
      "Prospected across manufacturing, auto dealership and retail, tailoring messaging to each segment's operational pain points and ROI drivers.",
      "Ran multi-touch follow-up across email, LinkedIn and phone to re-engage cold and stalled leads, then handed qualified opportunities to the AEs with full context.",
    ],
    metrics: [
      { value: 11, caption: 'qualified meetings generated for the AEs' },
      { value: 300, prefix: '~', caption: 'B2B leads sourced over three months' },
      { value: 4, prefix: '~', suffix: '%', caption: 'meeting rate from targeted outbound' },
    ],
    impactTitle: '11 qualified meetings',
    impactNote: 'Generated for the AEs from ~300 sourced leads in three months.',
    skills: ['pipeline generation', 'cold outreach and multi-touch sequencing', 'discovery and lead qualification', 'value and ROI-based messaging'],
    pos: { left: '5%', top: '11%' },
  },
  {
    slug: 'bgis', fill: 'caramel', icon: 'presentation-chart', label: 'margin roadmap', meta: 'Deakin x BGIS',
    org: 'Deakin University (BGIS client project)', logo: 'deakin', role: 'Consultant Intern', where: 'Melbourne', dates: 'Jul to Oct 2026',
    titleA: 'Seven people, three streams,', titleEm: 'one roadmap.',
    chips: ['client consulting project', 'Melbourne'],
    problem: "BGIS's People & Culture APAC executive needed a margin recovery plan, and it had to come out of three separate streams of analysis.",
    did: [
      'Led a 7-person consulting team across three analysis streams.',
      'Brought client feedback into the work and kept the team on the presentation timeline.',
      "Delivered a three-stage margin recovery roadmap to BGIS's People & Culture APAC executive.",
    ],
    metrics: [
      { value: 7, caption: 'people on the consulting team' },
      { value: 3, caption: 'analysis streams run in parallel' },
      { value: 3, caption: 'stages in the margin recovery roadmap' },
    ],
    impactTitle: 'A three-stage roadmap',
    impactNote: "Delivered to BGIS's People & Culture APAC executive.",
    skills: ['team leadership', 'stakeholder management', 'data-to-insight translation', 'project and time management'],
    pos: { left: '61%', top: '50%' },
  },
  {
    slug: 'codrops', fill: 'rose', icon: 'handshake', label: 'sponsor pipeline', meta: 'Codrops, 2026 to now',
    org: 'Codrops', logo: 'codrops', role: 'Partnership Associate', where: 'Remote', dates: 'Mar 2026 to now',
    titleA: 'Building a sponsor pipeline from', titleEm: 'scratch.',
    chips: ['frontend dev and UX/UI publication', '2M+ monthly readers', 'remote'],
    problem: 'Codrops reaches 2M+ readers a month, but there was no pipeline yet to find, track or qualify sponsors.',
    did: [
      'Sourced 60 leads a week from YC, Product Hunt and LinkedIn.',
      'Wrote personalised outreach sequences, managing 50+ active leads at once across LinkedIn and email.',
      'Kept a structured CRM spreadsheet tracking status, response rates and conversion at every stage.',
      'Ran discovery conversations on sponsor fit, budget and buying readiness, qualifying out poor-fit leads early.',
    ],
    metrics: [
      { value: 17, caption: 'signed sponsors' },
      { value: 15, prefix: '$', suffix: 'k', caption: 'in sponsorship signed' },
      { value: 20, suffix: '%', caption: 'response rate on outreach' },
    ],
    impactTitle: '17 signed sponsors',
    impactNote: 'Worth $15k, from a pipeline that did not exist before.',
    skills: ['lead sourcing', 'cold outreach and multi-touch sequencing', 'CRM management and hygiene', 'discovery and lead qualification'],
    pos: { left: '16%', top: '52%' },
  },
  {
    slug: 'elite-talks', fill: 'caramel', icon: 'megaphone', label: 'elite talks 2025', meta: 'SW Education',
    org: 'SW Education', logo: 'sw-education', role: 'Digital Marketing Intern', where: 'Melbourne', dates: 'Aug to Nov 2025',
    titleA: 'One event, three teams,', titleEm: 'one timeline.',
    chips: ['education and career services', 'Melbourne'],
    problem: 'Elite TALKS 2025 needed the events, partnerships and design teams to deliver together, each with its own priorities and deadlines.',
    did: [
      'Coordinated cross-functional delivery across the events, partnerships and design teams.',
      'Managed competing priorities and stakeholder timelines through to the event.',
    ],
    metrics: [
      { value: 300, suffix: '+', caption: 'registrations for Elite TALKS 2025' },
      { value: 21, prefix: '+', suffix: '%', caption: 'uplift in engagement' },
      { value: 3, caption: 'teams in step: events, partnerships and design' },
    ],
    impactTitle: '300+ registrations',
    impactNote: 'And a 21% uplift in engagement.',
    skills: ['stakeholder management', 'multi-workstream management', 'event marketing'],
    pos: { left: '28%', top: '12%' },
  },
  {
    slug: 'kim-beauty', fill: 'jasmine', icon: 'storefront', label: 'shop floor', meta: 'Kim Beauty Warehouse',
    org: 'Kim Beauty Warehouse', logo: 'kim-beauty', role: 'Sales Consultant', where: 'Melbourne', dates: 'Mar 2025 to Mar 2026',
    titleA: 'Reading a busy', titleEm: 'shop floor.',
    chips: ['Korean cosmetics', 'Melbourne'],
    problem: 'A high-intensity retail floor: 100+ customers a day who each needed the right product, and 100+ SKUs that had to sell themselves.',
    did: [
      'Gave consultative, personalised product recommendations on the floor.',
      'Maintained visual merchandising across 100+ SKUs.',
    ],
    metrics: [
      { value: 100, suffix: '+', caption: 'customers helped a day' },
      { value: 15, prefix: '+', suffix: '%', caption: 'repeat purchases over three months' },
      { value: 17, prefix: '+', suffix: '%', caption: 'impulse sales from merchandising' },
    ],
    impactTitle: '+15% repeat purchases',
    impactNote: 'Over three months, alongside a 17% lift in impulse sales.',
    skills: ['customer insight', 'consultative selling', 'visual merchandising'],
    pos: { left: '39%', top: '52%' },
  },
  {
    slug: 'muse-crochet', fill: 'mist', icon: 'yarn', label: 'crochet campaigns', meta: 'The Muse Crochet',
    org: 'The Muse Crochet', logo: 'muse-crochet', role: 'Sales & Customer Experience Associate', where: 'Melbourne', dates: 'Nov 2024 to Mar 2025',
    titleA: 'Testing posts like', titleEm: 'experiments.',
    chips: ['small business', 'Melbourne'],
    problem: 'A small crochet business whose customers lived in Instagram DMs and comments, and whose campaigns had to bring people through the door.',
    did: [
      'First point of contact for customer enquiries across socials: product questions, order concerns and feedback.',
      'Led Instagram and Facebook campaigns.',
      'Ran A/B-style content tests to see what actually worked.',
    ],
    metrics: [
      { value: 25, prefix: '+', suffix: '%', caption: 'digital engagement' },
      { value: 20, prefix: '+', suffix: '%', caption: 'foot traffic' },
      { value: 2, caption: 'platforms: Instagram and Facebook' },
    ],
    impactTitle: '+25% engagement',
    impactNote: 'And 20% more foot traffic.',
    skills: ['campaign testing', 'customer experience', 'social content'],
    pos: { left: '52%', top: '9%' },
  },
  {
    slug: 'hackathons', fill: 'berry', icon: 'trophy', label: 'hackathon run', meta: '4 events, 2026',
    org: 'Hackathons and competitions', role: 'Participant', where: 'Melbourne', dates: 'May to Sep 2026',
    titleA: 'Four events in', titleEm: 'five months.',
    chips: ['hackathons', 'competitions'],
    problemLabel: 'motive',
    problem: "I'm a business student, so I joined hackathons to see what building a product in real time with developers actually looks like. I took the PM seat to keep each build on track, learned from people who build tech for hard problems, and put myself in rooms more technical than I'm used to.",
    did: [
      "L'Oréal Brainstorm 2026 (May 2026)",
      { text: 'Watt The Hack by MLAI x Monash DeepNeuron (Jun 2026), where the team built SolarCycle', href: 'https://github.com/cobeo2004/hackathon-fork', link: 'see the code' },
      "AI Agentic Hackathon by GenFund AI (Jul 2026), placing in the Top 20 of 150 on the Founder's Track",
      { text: 'Forward AI in Business Hackathon by DSCubed x RAID x Eleno (Sep 2026), where the team built Trustlane', href: 'https://trustlane.house-of-imaginaries.com/', link: 'open Trustlane' },
    ],
    metrics: [
      { value: 4, caption: 'events between May and September 2026' },
      { value: null, text: 'Top 20', caption: "of 150 on the Founder's Track at the AI Agentic Hackathon" },
      { value: 3, caption: "hackathons, plus L'Oréal Brainstorm 2026" },
    ],
    impactTitle: 'Two builds you can open.',
    impactNote: 'Trustlane is live, and the SolarCycle code is on GitHub. Both links are in the list.',
    skills: ['AI tools', 'project management', 'working with technical teams'],
    pos: { left: '78%', top: '8%' },
  },
];

export const jobs = [
  { icon: 'target', org: 'Sidekick', logo: 'sidekick' as LogoId, chip: 'YC S26', dates: 'Jun 2026 to now, remote', role: 'Business Development Representative Intern', note: 'Targeted outbound for an AI-powered SMS assistant: 11 qualified meetings for the AEs from ~300 sourced B2B leads in three months.', slug: 'sidekick' },
  { icon: 'presentation-chart', org: 'Deakin University', logo: 'deakin' as LogoId, chip: 'BGIS client project', dates: 'Jul to Oct 2026, Melbourne', role: 'Consultant Intern', note: "Led a 7-person consulting team across three analysis streams, bringing client feedback and presentation timelines together into a three-stage margin recovery roadmap for BGIS's People & Culture APAC executive.", slug: 'bgis' },
  { icon: 'handshake', org: 'Codrops', logo: 'codrops' as LogoId, dates: 'Mar 2026 to now, remote', role: 'Partnership Associate', note: 'Built the sponsorship pipeline from scratch: 60 new leads a week, a 20% response rate and 17 signed sponsors worth $15k.', slug: 'codrops' },
  { icon: 'storefront', org: 'Kim Beauty Warehouse', logo: 'kim-beauty' as LogoId, dates: 'Mar 2025 to Mar 2026, Melbourne', role: 'Sales Consultant', note: 'Personal recommendations for 100+ customers a day, which lifted repeat purchases by 15% over three months.', slug: 'kim-beauty' },
  { icon: 'megaphone', org: 'SW Education', logo: 'sw-education' as LogoId, dates: 'Aug 2025 to Nov 2025, Melbourne', role: 'Digital Marketing Intern', note: 'Kept events, partnerships and design in step for Elite TALKS 2025: 300+ registrations and a 21% lift in engagement.', slug: 'elite-talks' },
  { icon: 'yarn', org: 'The Muse Crochet', logo: 'muse-crochet' as LogoId, dates: 'Nov 2024 to Mar 2025, Melbourne', role: 'Sales & Customer Experience Associate', note: 'Ran Instagram and Facebook campaigns with A/B-style testing: 25% more engagement and 20% more foot traffic.', slug: 'muse-crochet' },
];

export const skills = [
  { label: 'pipeline generation', links: [0, 1], note: "11 qualified meetings for Sidekick's AEs and 17 signed sponsors at Codrops, both built from outbound." },
  { label: 'cold outreach and sequencing', links: [0, 1], note: 'Multi-touch follow-up across email, LinkedIn and phone at Sidekick, and personalised sequences to 60 new leads a week at Codrops.' },
  { label: 'discovery and qualification', links: [0, 1], note: "Sponsors qualified on fit, budget and buying readiness at Codrops, and qualified opportunities handed to Sidekick's AEs with full context." },
  { label: 'CRM management and hygiene', links: [0, 1], note: 'A structured CRM at Codrops tracking status, response rates and conversion at every stage, and clean handovers at Sidekick.' },
  { label: 'value and ROI messaging', links: [0, 3], note: "Messaging built on each segment's pain points and ROI at Sidekick, and consultative, needs-based selling on the floor at Kim Beauty." },
  { label: 'stakeholder management', links: [0, 1, 2, 3, 4, 5], note: "Stakeholders everywhere, from sponsors at Codrops to BGIS's People & Culture APAC executive." },
];

export const beamProjects = [
  { label: 'Sidekick', logo: 'sidekick', fill: 'berry', icon: 'target' },
  { label: 'Codrops', logo: 'codrops', fill: 'rose', icon: 'handshake' },
  { label: 'SW Education', logo: 'sw-education', fill: 'caramel', icon: 'megaphone' },
  { label: 'Kim Beauty', logo: 'kim-beauty', fill: 'jasmine', icon: 'storefront' },
  { label: 'The Muse Crochet', logo: 'muse-crochet', fill: 'mist', icon: 'yarn' },
  { label: 'Deakin x BGIS', logo: 'deakin', fill: 'caramel', icon: 'presentation-chart' },
] as const satisfies readonly { label: string; logo: LogoId; fill: string; icon: string }[];

export interface Chapter {
  date: string;
  icon: string;
  fill: Fill;
  title: string;
  body: string;
  chips?: string[];
  big?: { value: number | null; prefix?: string; suffix?: string; text?: string; caption: string };
  sticker?: { fill: string; status: string; title: string };
  todo?: boolean;
  hack?: { name: string; meta: string; href?: string; link?: string }[];
}

export const chapters: Chapter[] = [
  {
    date: '2024', icon: 'graduation-cap', fill: 'rose', title: 'New city, new degree',
    body: 'Started a Bachelor of Business Analytics at Deakin on the Deakin International Student Merit Scholarship, and took on Finance Officer at the Melbourne Overseas Vietnamese Student Association.',
    big: { value: 83, suffix: '/100', caption: 'High Distinction average so far' },
    sticker: { fill: 'caramel', status: 'ongoing', title: 'Keep the books' },
  },
  {
    date: 'Nov 2024', icon: 'yarn', fill: 'mist', title: 'Crochet small biz era',
    body: 'Became the voice of The Muse Crochet in Instagram DMs and comments, and ran Instagram and Facebook campaigns with A/B-style content tests.',
    chips: ['+25% engagement', '+20% foot traffic'],
    big: { value: 25, prefix: '+', suffix: '%', caption: 'digital engagement' },
    sticker: { fill: 'jasmine', status: 'complete', title: 'Run a shop on real data' },
  },
  {
    date: 'Mar 2025', icon: 'storefront', fill: 'jasmine', title: 'Learned to read a shop floor',
    body: 'Sales Consultant at Kim Beauty Warehouse: 100+ customers a day, and 100+ SKUs of visual merchandising to keep looking good.',
    chips: ['+15% repeat purchases', '+17% impulse sales'],
    big: { value: 15, prefix: '+', suffix: '%', caption: 'repeat purchases over three months' },
  },
  {
    date: 'Aug 2025', icon: 'megaphone', fill: 'caramel', title: 'Herded an event',
    body: 'Digital Marketing Intern at SW Education, keeping the events, partnerships and design teams on one timeline for Elite TALKS 2025.',
    chips: ['300+ registrations', '+21% engagement'],
    big: { value: 300, suffix: '+', caption: 'registrations for Elite TALKS 2025' },
    sticker: { fill: 'mist', status: 'ongoing', title: 'Crew the campus' },
  },
  {
    date: 'Late 2025', icon: 'users-three', fill: 'rose', title: 'Picked the human side',
    body: "After trying every role I could get my hands on, I noticed a pattern. I can handle the data, but I would rather use it as evidence than make it the whole job. What pulls me in is the human side: working with clients, building relationships that last, and helping people solve their problems. So I pivoted to SDR and BDR work.",
    chips: ['data as evidence', 'people as the job'],
    big: { value: null, text: 'people', caption: 'the side of the work I chose, with data as my evidence' },
  },
  {
    date: 'Mar 2026', icon: 'handshake', fill: 'rose', title: 'Said yes to cold outreach',
    body: 'Joined Codrops as Partnership Associate and built a sponsorship pipeline from scratch: 60 leads a week from YC, Product Hunt and LinkedIn, personalised sequences, and a CRM spreadsheet for every stage.',
    chips: ['17 signed sponsors', '$15k signed', '20% response rate'],
    big: { value: 17, caption: 'signed sponsors, worth $15k' },
    sticker: { fill: 'plain', status: 'ongoing', title: 'Say yes to cold outreach' },
  },
  {
    date: 'Mar to Sep 2026', icon: 'trophy', fill: 'berry', title: 'Five events in seven months',
    body: "A certification, L'Oréal Brainstorm and three hackathons, back to back.",
    hack: [
      { name: 'UX Design Certification', meta: 'Google and Coursera, Mar 2026' },
      { name: "L'Oréal Brainstorm 2026", meta: 'May 2026' },
      { name: 'Watt The Hack', meta: 'MLAI x Monash DeepNeuron, Jun 2026', href: 'https://github.com/cobeo2004/hackathon-fork', link: 'SolarCycle' },
      { name: "AI Agentic Hackathon, Founder's Track", meta: 'GenFund AI, Jul 2026' },
      { name: 'Forward AI in Business Hackathon', meta: 'DSCubed x RAID x Eleno, Sep 2026', href: 'https://trustlane.house-of-imaginaries.com/', link: 'Trustlane' },
    ],
    big: { value: 5, caption: 'events between March and September 2026' },
    sticker: { fill: 'plain', status: 'levelling up', title: 'One new tool a quarter' },
  },
  {
    date: 'Jun 2026', icon: 'rocket-launch', fill: 'berry', title: 'Joined a YC startup',
    body: 'BDR intern at Sidekick (YC S26), an AI automation start-up: prospecting manufacturing, auto dealership and retail, and handing qualified meetings to the AEs.',
    big: { value: 11, caption: 'qualified meetings from ~300 sourced leads' },
    sticker: { fill: 'berry', status: 'ongoing', title: 'Mentor first-years' },
  },
  {
    date: '2026, expected', icon: 'sparkle', fill: 'mist', title: 'Graduation day', todo: true,
    body: 'Bachelor of Business Analytics, sitting at 83/100 so far. Still being written.',
    sticker: { fill: 'blush', status: 'in progress', title: 'Finish with the HD intact' },
  },
  {
    date: 'next', icon: 'plus-circle', fill: 'jasmine', title: '[next chapter]', todo: true,
    body: 'Unwritten. Could have your team in it.',
  },
];

export const stickers = [
  { fill: 'jasmine', icon: 'yarn', status: 'complete', title: 'Run a shop on real data', note: 'Crochet posts picked by A/B tests, not vibes. +25% engagement.', l: '3%', t: '40px', r: -4 },
  { fill: 'plain', icon: 'paper-plane-tilt', status: 'ongoing', title: 'Say yes to cold outreach', note: '50+ live leads later, rejection stopped stinging.', l: '27%', t: '74px', r: 3 },
  { fill: 'berry', icon: 'chalkboard-teacher', status: 'ongoing', title: 'Mentor first-years', note: 'B&L Peer Mentor. Explaining it is how I learn it twice.', l: '51%', t: '30px', r: -2 },
  { fill: 'caramel', icon: 'piggy-bank', status: 'ongoing', title: 'Keep the books', note: 'Finance Officer at MOVSA. Small budgets, real consequences.', l: '75%', t: '64px', r: 4 },
  { fill: 'mist', icon: 'confetti', status: 'ongoing', title: 'Crew the campus', note: 'DUSA Crew. Events on time, people in the right room.', l: '5%', t: '362px', r: 3 },
  { fill: 'plain', icon: 'lightning', status: 'levelling up', title: 'One new tool a quarter', note: 'BigQuery, then DAX, then whatever the next role needs.', l: '29%', t: '340px', r: -3 },
  { fill: 'blush', icon: 'seal-check', status: 'in progress', title: 'Finish with the HD intact', note: '83/100 and a merit scholarship. Final stretch.', l: '53%', t: '356px', r: 2 },
  { fill: 'jasmine', icon: 'wallet', status: 'ongoing', title: 'Pay my own way', note: 'Financially independent since I landed in Australia. Restaurants, markets, retail and a theatre bar paid the bills alongside study.', l: '77%', t: '330px', r: -3 },
  { fill: 'plain', icon: 'chats-circle', status: 'ongoing', title: 'Learn from every shift', note: "Colleagues and customers taught me how to talk to people, value their time and own my part. That's where the resilience came from.", l: '4%', t: '668px', r: -2 },
  { fill: 'caramel', icon: 'mountains', status: 'ongoing', title: 'Leave the comfort zone', note: 'Theory and grades are a compass. Growing up came from pushing past my limits, staying patient and saying yes to new rooms.', l: '28%', t: '640px', r: 3 },
  { fill: 'berry', icon: 'linkedin-logo', status: 'unlocked', title: 'Show up on LinkedIn', note: 'The day I built my LinkedIn properly, I saw the potential. Doors open once you show what you can do.', l: '52%', t: '674px', r: -2 },
];

/** CRM and prospecting tools from the CV, shown on the works page. */
export const crmTools = ['Salesforce', 'HubSpot', 'LinkedIn Sales Navigator'];

export const tools = ['Salesforce', 'HubSpot', 'LinkedIn Sales Navigator', 'Figma', 'Jira', 'Canva', 'Oracle', 'Python'];
