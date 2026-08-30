export const eventContent = {
  meta: {
    title: "Rooting & Rising | Liberia at UNGA 81",
    description:
      "Rooting and Rising: Liberia's Vision for Youth, Peace and Security",
  },
  navigation: [
    { href: "/#moment", label: "The Moment" },
    { href: "/#pathways", label: "PATHWAYs" },
    { href: "/#programme", label: "Programme" },
    { href: "/#partners", label: "Partners" },
  ] as const,
  registerCta: {
    href: "/register",
    label: "Register",
  },
  hero: {
    city: "New York City",
    dateShort: "18 September 2026",
    eyebrow: "Investing in the PATHWAYs Reform Mandate",
    titleLead: "Rooting and Rising:",
    titleHighlight: "Liberia's Vision for Youth, Peace and Security",
    primaryAction: {
      href: "/register",
      label: "Attend the event",
    },
    secondaryAction: {
      href: "/api/pathways-vision",
      label: "Explore PATHWAYs",
    },
  },
  details: {
    dateLabel: "Date",
    dateValue: "Friday, 18 September",
    timeLabel: "Time",
    timeValue: "10:00 AM - 12:00 Noon",
    venueLabel: "Venue",
    venueValue: "Nelson Mandela Hall",
    venueOrg: "African Union Permanent UN Mission",
    venueStreet: "305 East 47th Street",
    venueCity: "New York, NY 10017",
    programmeHref: "/#programme",
    programmeLabel: "View programme",
  },
  moment: {
    id: "moment",
    label: "01 / The moment",
    titleBefore: "Young people are not a risk to manage.",
    titleEmphasis: "They are the future to invest in.",
    body: "Liberia arrives at UNGA 81 with a record of peaceful democratic transitions, a seat on the United Nations Security Council, and a generation ready to lead. This is an invitation to build the next chapter together.",
    action: {
      href: "/register",
      label: "Be part of the conversation",
    },
    quote:
      "Liberia has a plan. Liberia has leadership. Liberia is open for partnership and investment in its young people.",
    quoteSource: "THE EVENT VISION",
  },
  pathways: {
    id: "pathways",
    label: "02 / The reform vision",
    titleBefore: "Building the",
    titleEmphasis: "conditions",
    titleAfter: "to thrive.",
    body: "PATHWAYs turns aspiration into a practical, ten-year agenda for youth and sports development in every county of Liberia.",
    yearsStart: "2026",
    yearsEnd: "2035",
    pillars: [
      {
        number: "01",
        title: "Governance, Systems, and Institutional Reform",
        body: "Nothing in this vision is durable without a legal and institutional foundation that can hold it. The Ministry of Youth and Sports has operated since 1982 under a decree that predates the internet, predates Liberia's democratic reconstruction, and predates the recognition of the creative economy as a development sector. Pillar One is the foundation on which everything else stands – modernizing the legal mandate, creating the inter-governmental architecture for shared accountability, and establishing the national standards that make the Ministry's ambitions enforceable.",
      },
      {
        number: "02",
        title: "Evidence, Design, and Foresight",
        subtitle: "The Ministry's Intelligence",
        body: "A Ministry that does not know what it is doing, whether it is working, or where the country is headed cannot govern a sector of this consequence. For too long, the Ministry has designed programs without an adequate evidence base, managed performance without a data system, and made policy without a foresight function. Pillar Two intends to end that era. It institutionalizes the capacity that makes all other pillars credible, and it does so through what is, without question, the boldest institutional reform this document proposes.",
      },
      {
        number: "03",
        title: "Pathway Framework",
        subtitle: "From Exclusion to Agency",
        body: "With governance foundations in place and intelligence systems operational, the Ministry can build delivery with confidence. Pillar Three reimagines the Ministry's core service delivery mandate as a coherent and permanent pathway structure, elevated beyond a portfolio of programs that appear and disappear with funding cycles. A pathway is the network through which a young Liberian navigates from wherever they begin to wherever their talent and effort can take them. This pillar builds that ecosystem, at scale, across all fifteen counties.",
      },
      {
        number: "04",
        title: "Sport as a National Development System",
        body: "Liberia's grassroots sports culture is one of the most powerful and most under-leveraged assets in the Ministry's portfolio. The 2026 county tour documented active sports participation in all fifteen counties. Communities are building leagues, maintaining pitches, and producing athletes with no institutional backing whatsoever. Architecture is the problem, not talent. Pillar Four builds the system that converts grassroots energy into a talent pipeline, an economic sector, and",
      },
      {
        number: "05",
        title: "The Creative Economy",
        subtitle: "New Ground",
        body: "This is the pillar that expands the boundaries of what this Ministry is responsible for. For the first time in Liberia's governance history, the creative economy is a formal development mandate of the Ministry of Youth and Sports. In every county visited during the 2026 tour, the Ministry's field teams found musicians, designers, visual artists, digital creators, and cultural entrepreneurs with genuine talent and commercial potential, working without a single instrument of institutional support. The era of the creative sector being treated as a cultural footnote ends here.",
      },
      {
        number: "06",
        title: "Strategic Investment and Resource Mobilization",
        body: "A vision of this scope requires a financing architecture of equivalent ambition. The Ministry of Youth and Sports is not, at present, resourced at a level commensurate with the mandate this document describes. That gap will not be closed by requesting more of the same. It will be closed by the Ministry becoming, for the first time, an active and capable architect of its own financing – with the institutional capacity to attract, mobilize, manage, and account for the investment this vision requires. Pillar Six builds that case.",
      },
    ] as const,
  },
  programme: {
    id: "programme",
    label: "03 / Draft Programme",
    items: [
      {
        time: "10:00",
        title: "Setting the pace",
        detail: "Liberia's Permanent Mission to the UN / MoYS",
        number: "01",
      },
      {
        time: "10:05",
        title: "Opening statement",
        detail:
          "H.E. Joseph Nyuma Boakai, President of the Republic of Liberia",
        number: "02",
      },
      {
        time: "10:20",
        title: "PATHWAYs launch",
        detail:
          "Progress on Youth, Peace and Security and the new reform vision",
        number: "03",
      },
      {
        time: "10:35",
        title: "Open dialogue",
        detail: "Leveraging partnerships to accelerate youth development",
        number: "04",
      },
      {
        time: "11:25",
        title: "Closing & next steps",
        detail: "Followed by networking and informal engagements",
        number: "05",
      },
    ] as const,
  },
  registration: {
    id: "register",
    eyebrow: "Join the conversation",
    titleBefore: "There is a seat",
    titleEmphasis: "your voice.",
    body: "Registration is open to the public and Liberian diaspora. Places are limited and subject to confirmation.",
    actionLabel: "Register to attend",
    supportingText:
      "Attendance is capacity-managed. A confirmation is required before you attend.",
  },
  partners: {
    id: "partners",
    label: "04 / Convened by",
    body: "Convened by the Ministry of Youth and Sports, Republic of Liberia, with national and international partners committed to youth-led progress.",
    inquiryHref: "/partners",
    inquiryLabel: "Partnership interest",
    poweredByLabel: "Powered by",
    partnersLabel: "Partners",
    logos: [
      {
        slug: "moys",
        name: "Ministry of Youth and Sports",
        primary: "MOYS",
        src: "/partners/Logo.png",
        isPlaceholder: false,
        group: "powered-by",
      },
      {
        slug: "mfa",
        name: "Ministry of Foreign Affairs, Republic of Liberia",
        primary: "MFA",
        secondary: "Ministry of Foreign\nAffairs",
        src: "/partners/02.png",
        isPlaceholder: false,
        group: "partner",
      },
      {
        slug: "liberia-un-mission",
        name: "Permanent Mission of Liberia to the United Nations",
        primary: "LIBERIA\nUN MISSION",
        src: "/partners/01.png",
        isPlaceholder: false,
        group: "partner",
      },
      {
        slug: "undp",
        name: "UNDP",
        primary: "UNDP",
        src: "/partners/03.png",
        isPlaceholder: false,
        group: "partner",
      },
      {
        slug: "unfpa",
        name: "UNFPA",
        primary: "UNFPA",
        src: "/partners/04.png",
        isPlaceholder: false,
        group: "partner",
      },
      {
        slug: "liberia-seal",
        name: "Coat of Arms of the Republic of Liberia",
        primary: "REPUBLIC\nOF LIBERIA",
        src: "/partners/LiberiaSeal-01.png",
        isPlaceholder: false,
        group: "partner",
      },
    ] as const,
  },
  documentary: {
    id: "documentary",
    label: "05 / The film",
    title: "A documentary is coming.",
    body: "We're producing a short film following Liberia's PATHWAYs journey, from Rooting to Rising. It will premiere here.",
    placeholderLabel: "Coming soon",
  },
  footer: {
    credit: "Republic of Liberia\nUNGA 81 Side Event on Youth, Peace and Security",
    backToTop: "Back to top",
    email: "info@moys.gov.lr",
    wordmark: "Rooting & Rising",
  },
  registerPage: {
    label: "Registration",
    titleBefore: "There is a seat",
    titleEmphasis: "your voice.",
    intro:
      "Registration is open to the public and Liberian diaspora. Attendance is capacity-managed. Places are limited, and a confirmation is required before you attend.",
    successTitle: "Registration received.",
    successBody:
      "Places are limited and subject to confirmation. This registration does not confirm attendance.",
    conceptNote: {
      label: "Concept note",
      title: "Read the full concept note",
      body: "The official PATHWAYs: Rooting and Rising concept note, covering event rationale, agenda context, and partnership framing.",
      actionLabel: "Download the concept note",
      fileType: "PDF",
    },
  },
  partnersPage: {
    label: "Partnership",
    titleBefore: "Built in",
    titleEmphasis: "partnership.",
    caseStudy: [
      "PATHWAYs: Rooting and Rising Liberia's Youth, 2026-2035 turns aspiration into a practical, ten-year agenda for youth development in every county of Liberia.",
      "Convened by the Ministry of Youth and Sports, Republic of Liberia, with national and international partners committed to youth-led progress.",
      "This page is an interest form only. It does not confirm a partnership, funding commitment, or speaking role.",
    ] as const,
    successTitle: "Inquiry received.",
    successBody:
      "The convening team will follow up. This does not confirm a partnership.",
  },
} as const;

export type EventContent = typeof eventContent;
export type PartnerLogo = (typeof eventContent.partners.logos)[number];
export type AgendaItem = (typeof eventContent.programme.items)[number];
