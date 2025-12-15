export type CulturalCode = {
  id: string;
  name: string;
  traits: string[];
  description: string;
};

export const culturalCodes: CulturalCode[] = [
  {
    id: "meraki",
    name: "Meraki",
    traits: [
      "craft",
      "detail",
      "hands-on",
      "intentional",
      "warm",
      "quality",
      "presence",
    ],
    description:
      "You put parts of yourself into what you create. Quality, care, and intention matter more than speed or scale.",
  },
  {
    id: "hygge",
    name: "Hygge",
    traits: [
      "cozy",
      "comfort",
      "intimacy",
      "warmth",
      "calm",
      "safety",
      "togetherness",
    ],
    description:
      "You gravitate toward comfort, emotional safety, and small meaningful moments shared with others.",
  },
  {
    id: "wabi-sabi",
    name: "Wabi-Sabi",
    traits: [
      "imperfection",
      "nature",
      "simplicity",
      "acceptance",
      "organic",
      "quiet",
    ],
    description:
      "You find beauty in imperfection, aging, and the natural flow of things as they are.",
  },
];
