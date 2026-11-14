// Text for the /privacy page. Keep it true: update it if the site ever adds
// analytics, a contact form, embedded videos, or anything else that collects data.

export const privacy = {
  lastUpdated: "November 14, 2026",
  intro:
    "This is a personal resume website. I want it to be simple and respectful of your privacy, so here is exactly what happens when you visit.",
  sections: [
    {
      heading: "No cookies, analytics, or tracking",
      body: [
        "This site does not use cookies, analytics tools, advertising, or tracking of any kind. It does not store anything in your browser, and it does not load fonts, scripts, or images from other companies.",
      ],
    },
    {
      heading: "Hosting and server logs",
      body: [
        "The site is hosted on Firebase Hosting, a Google service. Like most web hosts, Firebase keeps standard server logs, which can include your IP address, browser type, the page you requested, and the time of the request. Google uses these logs to keep the service secure and working, and I don't use them to identify you.",
        "You can read how Google handles this data in the Firebase privacy information.",
      ],
      link: { label: "Firebase privacy and security", url: "https://firebase.google.com/support/privacy" },
    },
    {
      heading: "If you contact me",
      body: [
        "If you email me or message me on LinkedIn, I use your name, contact details, and message only to reply to you and continue our conversation. I don't sell or share them, and I don't add you to any mailing list. You can ask me to delete our conversation at any time.",
      ],
    },
    {
      heading: "Links to other websites",
      body: [
        "This site links to other websites, such as LinkedIn and my project sites. Those sites have their own privacy policies, which apply when you visit them.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "If anything on this site changes how data is handled, I'll update this page and the date at the top.",
      ],
    },
  ],
} as const;
