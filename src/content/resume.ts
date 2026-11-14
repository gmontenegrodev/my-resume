// All text shown on the site lives in this file.
// To update the site, edit this file and replace public/resume.pdf.
// Components must read from here and never hardcode resume text.

export type Link = { label: string; url: string };

export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  /** Free text, e.g. "2019 – Present". Empty string hides the dates. */
  period: string;
  location?: string;
  highlights: string[];
  tech?: string[];
};

export type Project = {
  title: string;
  status?: string;
  role: string;
  description: string;
  highlights: string[];
  tech: string[];
  codeUrl?: string;
  demoUrl?: string;
  /**
   * Screenshot or cover image. Put the file in public/images/projects/
   * (16:9, e.g. 1600x900, .webp or .png) and use a path like
   * "/images/projects/ballgameai.webp". `alt` describes what the image shows.
   * Until it is set, the card shows a neutral placeholder.
   */
  image?: { src: string; alt: string };
};

export type SkillGroup = { group: string; items: string[] };

export type Education = { title: string; institution: string; period: string };

export type Resume = {
  name: string;
  title: string;
  focus: string;
  tagline: string;
  location: string;
  availability: string;
  email: string;
  /** Path to the downloadable CV in public/, e.g. "/resume.pdf". Leave undefined to hide the button. */
  resumePdf?: string;
  links: { linkedin: string; github?: string };
  about: string[];
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  languages: string[];
};

export const resume: Resume = {
  name: "German Montenegro",
  title: "Engineering & Applied AI Leader",
  focus: "Baseball Intelligence & Decision Systems",
  tagline:
    "I build production software and help engineering teams adopt AI responsibly, with people still making the final decisions.",
  location: "Sunrise, FL",
  availability: "Open to engineering leadership and applied AI roles",
  email: "gmontenegro500@gmail.com",
  // TODO: add public/resume.pdf, then set this to "/resume.pdf".
  resumePdf: undefined,
  links: {
    linkedin: "https://www.linkedin.com/in/german-montenegro-engineer",
    // TODO: add GitHub profile URL, or remove this line to hide the link.
    github: undefined,
  },

  about: [
    "I'm an engineering and applied AI leader with 10+ years of experience building production software, cloud platforms, APIs, and AI-assisted engineering workflows.",
    "I lead cross-team AI tooling and adoption: I set engineering standards, mentor developers, run workshops, and turn new technology into practical day-to-day practices.",
    "I'm also the founder of BallGameAI, an early-stage baseball decision-intelligence platform that explores how real-time game data, deterministic analytics, and AI can support evidence-based decisions in professional baseball. I'm continuing my education in generative AI and baseball scouting.",
  ],

  skills: [
    {
      group: "Leadership & AI Adoption",
      items: [
        "Cross-Team Technical Leadership",
        "AI Tooling Strategy & Enablement",
        "Standards, Mentoring & Workshops",
        "Human Review & AI Verification",
      ],
    },
    {
      group: "Applied AI & Data",
      items: [
        "LLM Integrations",
        "OpenAI API",
        "Tool-Based AI Workflows",
        "Structured Outputs",
        "Prompt Engineering",
        "AWS Bedrock",
        "Coding Agents",
      ],
    },
    {
      group: "Engineering & Cloud",
      items: [
        "Python",
        "TypeScript",
        "JavaScript",
        "FastAPI",
        "Node.js",
        "REST APIs",
        "React",
        "Next.js",
        "PostgreSQL",
        "AWS Lambda",
        "AWS RDS",
        "AWS API Gateway",
        "AWS S3",
      ],
    },
  ],

  experience: [
    {
      role: "Lead AI Engineering Tooling & Adoption",
      company: "NextEra Energy, Inc.",
      companyUrl: "https://www.nexteraenergy.com",
      // No dates shown for this role, by choice.
      period: "",
      highlights: [
        "Lead adoption and enablement of AI-powered engineering tools across development teams, including GitHub Copilot, Claude Code, Windsurf, and emerging AI agents.",
        "Partner with engineering leadership and platform teams to set standards, onboarding guidance, governance practices, and repeatable workflows for responsible AI-assisted development.",
        "Guide engineers in scoping, reviewing, and validating AI-assisted work while keeping human oversight, code quality, security, and accountability.",
        "Run workshops, demos, and technical documentation that speed up AI adoption and improve developer effectiveness.",
        "Evaluate emerging developer tools and help teams see where AI adds value and where human judgment remains essential.",
      ],
      tech: ["GitHub Copilot", "Claude Code", "Windsurf", "AI Agents"],
    },
    {
      role: "Lead React Developer",
      company: "Jazwares LLC",
      companyUrl: "https://www.jazwares.com",
      period: "2019 – 2025",
      highlights: [
        "Lead full-stack initiatives across React, TypeScript, APIs, and AWS; shape application architecture for scalable, production-grade customer-facing experiences.",
        "Own technical planning across frontend architecture, API integration, cloud services, performance, accessibility, and production delivery.",
        "Mentor engineers, set code-quality expectations, and review technical approaches, working with backend, design, product, marketing, and business teams from requirements to release.",
        "Turn business requirements into maintainable solutions, balancing delivery speed, user experience, reliability, and long-term quality.",
      ],
      tech: ["React", "TypeScript", "Node.js", "AWS", "REST APIs"],
    },
    {
      role: "Software Engineer II",
      company: "Jazwares LLC",
      companyUrl: "https://www.jazwares.com",
      period: "2019",
      highlights: [
        "Delivered full-stack web solutions with AWS and API integrations for marketing and e-commerce platforms, from design and content through deployment and production support.",
      ],
      tech: ["JavaScript", "AWS", "REST APIs"],
    },
  ],

  projects: [
    {
      title: "BallGameAI",
      status: "In development",
      role: "Founder / Applied AI Engineer",
      description:
        "An early-stage baseball decision-intelligence platform that explores how AI, real-time MLB data, historical performance, and analytical models can support evidence-based decisions in professional baseball.",
      highlights: [
        "Live pitching decision-support concept that reads game context and pitcher-performance signals and gives explainable KEEP / MONITOR / CHANGE recommendations, while people keep the final decision.",
        "Clear separation of retrieved facts, deterministic computations, and LLM reasoning, so every recommendation is grounded in traceable evidence.",
        "MLB data ingestion and backend workflows covering players, teams, rosters, performance, matchups, and live-game context.",
      ],
      tech: ["Python", "FastAPI", "PostgreSQL", "REST APIs", "LLMs"],
      // TODO: add image (required for every project), and codeUrl / demoUrl if public.
    },
  ],

  education: [
    {
      title: "B.S. Computer Engineering",
      institution: "Florida International University",
      period: "2007 – 2011",
    },
    {
      title: "AWS Certified Generative AI Developer – Professional",
      institution: "Amazon Web Services",
      period: "In progress",
    },
    {
      title: "Baseball Scouting Program",
      institution: "TheScoutHub",
      period: "In progress",
    },
  ],

  languages: ["English", "Spanish"],
};
