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
        title: "Governance &\ninstitutions",
        body: "A modern legal mandate and a Youth Outcome Compact binding government to shared accountability.",
      },
      {
        number: "02",
        title: "Evidence &\nforesight",
        body: "Liberia's first National Youth Intelligence System and an Annual State of Youth Report.",
      },
      {
        number: "03",
        title: "Pathway\nframework",
        body: "A national network of multi-service structures and digital-inclusion hubs connecting young people to opportunity.",
      },
      {
        number: "04",
        title: "Sport &\ndevelopment",
        body: "A structured industry and multi-sport talent pipeline, grounded locally and connected globally.",
      },
      {
        number: "05",
        title: "Creative\neconomy",
        body: "Formally claimed as a development sector, with creative economic activities across all fifteen counties.",
      },
      {
        number: "06",
        title: "Investment &\nresources",
        body: "A diversified financing mechanism, codified in law and built sustainably into the future.",
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
    // Placeholder video for layout review — swap for the real documentary once produced.
    youtubeId: "YE7VzlLtp-4",
  },
  footer: {
    credit: "Republic of Liberia\nUNGA 81 Side Event on Youth, Peace and Security",
    backToTop: "Back to top",
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
