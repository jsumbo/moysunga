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
      href: "/#pathways",
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
    venueCity: "New York",
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
    body: "PATHWAYs turns aspiration into a practical, ten-year agenda for youth development in every county of Liberia.",
    yearsStart: "2026",
    yearsEnd: "2035",
    pillars: [
      {
        number: "01",
        title: "Skills &\nemployment",
        body: "Pathways to opportunity and dignified work.",
      },
      {
        number: "02",
        title: "Sport &\nwellbeing",
        body: "Healthier communities and stronger belonging.",
      },
      {
        number: "03",
        title: "Civic\nparticipation",
        body: "Young people shaping public life.",
      },
      {
        number: "04",
        title: "Peace &\nresilience",
        body: "Youth-led solutions for lasting peace.",
      },
    ] as const,
  },
  programme: {
    id: "programme",
    label: "03 / Programme",
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
    note: "Official partner logos will replace these placeholders.",
    inquiryHref: "/partners",
    inquiryLabel: "Partnership interest",
    logos: [
      {
        slug: "moys",
        name: "Ministry of Youth and Sports",
        primary: "MOYS",
        secondary: "Ministry of Youth\nand Sports",
        src: "/partners/moys.svg",
        isPlaceholder: false,
      },
      {
        slug: "mfa",
        name: "Ministry of Foreign Affairs",
        primary: "MFA",
        secondary: "Ministry of Foreign\nAffairs",
        src: "/partners/MOFA.svg",
        isPlaceholder: false,
      },
      {
        slug: "liberia-un-mission",
        name: "Liberia UN Mission",
        primary: "LIBERIA\nUN MISSION",
        src: "/partners/liberia-un-mission.jpg",
        isPlaceholder: false,
      },
      {
        slug: "un-resident-coordinator",
        name: "UN Resident Coordinator",
        primary: "UN",
        secondary: "Resident Coordinator",
        src: "/partners/uncoordinator-logo-en.svg",
        isPlaceholder: false,
      },
      {
        slug: "unfpa",
        name: "UNFPA",
        primary: "UNFPA",
        src: "/partners/unfpa.webp",
        isPlaceholder: false,
      },
      {
        slug: "undp",
        name: "UNDP",
        primary: "UNDP",
        src: "/partners/undp.png",
        isPlaceholder: false,
      },
    ] as const,
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
      "Places are limited and subject to confirmation. This reference does not confirm attendance.",
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
      "This is a mock acknowledgement. It does not confirm a partnership.",
  },
} as const;

export type EventContent = typeof eventContent;
export type PartnerLogo = (typeof eventContent.partners.logos)[number];
export type AgendaItem = (typeof eventContent.programme.items)[number];
