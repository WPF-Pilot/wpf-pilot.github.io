// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "WPF Pilot",
  tagline: "Next gen automation testing",
  url: 'https://wpfpilot.dev',
  baseUrl: `/`,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.png",
  trailingSlash: false,

  // GitHub pages deployment config.
  organizationName: "WPF-Pilot",
  projectName: "WpfPilotDocs",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: "WPF Pilot",
        logo: {
          alt: "WPF Pilot Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "tutorial",
            position: "left",
            label: "Docs",
          },
          {
            type: "doc",
            docId: "api/app-driver",
            position: "left",
            label: "API",
          },
          {
            position: "left",
            label: "Pricing",
            href: '/pricing',
          },
          {
            href: 'https://github.com/WPF-Pilot/WpfPilot',
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Reference",
            items: [
              {
                label: "Docs",
                to: "/docs/tutorial",
              },
              {
                label: "API",
                to: "/docs/api/app-driver",
              },
            ],
          },
          {
            title: "Support",
            items: [
              {
                label: "Email",
                href: "mailto:support@wpfpilot.dev",
              },
              {
                label: "Open A Ticket",
                href: "https://github.com/WPF-Pilot/WpfPilot/issues/new/choose",
              },
            ],
          },
          {
            title: "More",
            items: [
              { label: "Pricing", href: "/pricing" },
              {
                label: "GitHub",
                href: `https://github.com/WPF-Pilot/WpfPilot`,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ichigo, LLC.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["csharp", "powershell"],
      },
    }),
};

module.exports = config;
