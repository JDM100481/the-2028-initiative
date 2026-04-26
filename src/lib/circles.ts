export const circles = [
  { slug: "ksa", name: "KSA OFW Circle" },
  { slug: "uae", name: "UAE OFW Circle" },
  { slug: "qatar", name: "Qatar OFW Circle" },
  { slug: "kuwait", name: "Kuwait OFW Circle" },
  { slug: "singapore", name: "Singapore OFW Circle" },
  { slug: "hongkong", name: "Hong Kong OFW Circle" },
  { slug: "taiwan", name: "Taiwan OFW Circle" },
  { slug: "japan", name: "Japan OFW Circle" },
  { slug: "canada", name: "Canada OFW Circle" },
  { slug: "usa", name: "USA OFW Circle" },
] as const;

export type Circle = (typeof circles)[number];
