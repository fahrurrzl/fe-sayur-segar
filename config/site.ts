export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Sayur Segar",
  description: "Sayur Segar dari Petani Lokal",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Explore",
      href: "/explore",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
