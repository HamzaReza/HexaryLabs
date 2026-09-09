import { services } from "./services";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; summary?: string }[];
};

export const nav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.title,
      href: `/services/${s.slug}`,
      summary: s.summary,
    })),
  },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const headerCta = { label: "Start a Project", href: "/contact" };

export const footerNav = [
  {
    heading: "Services",
    links: services.map((s) => ({
      label: s.title,
      href: `/services/${s.slug}`,
    })),
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "Integrations", href: "/integrations" },
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
