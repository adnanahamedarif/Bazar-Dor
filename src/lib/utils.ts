export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(num: number | string): string {
  return String(num).replace(/[0-9]/g, (d) => bengaliDigits[Number(d)]);
}

export function formatPrice(price: number): string {
  return toBengaliNumber(price.toLocaleString("en-IN"));
}

const UNIT_BN: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  dozen: "প্রতি ডজন",
  hali: "প্রতি হালি",
};

export function getUnitBn(unit: string): string {
  return UNIT_BN[unit] ?? unit;
}

const BN_DAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const BN_MONTHS = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",];

export function getBanglaDate(): string {
  const d = new Date();
  return `${BN_DAYS[d.getDay()]}, ${toBengaliNumber(d.getDate())} ${BN_MONTHS[d.getMonth()]}, ${toBengaliNumber(d.getFullYear())}`;
}

const UNIT_SHORT_BN: Record<string, string> = {
  kg: "কেজি",
  lit: "লিটার",
  litre: "লিটার",
  liter: "লিটার",
  ltr: "লিটার",
  l: "লিটার",
  piece: "পিস",
  pcs: "পিস",
  dozen: "ডজন",
  hali: "হালি",
};

export function getUnitShortBn(unit: string): string {
  return UNIT_SHORT_BN[unit.toLowerCase()] ?? unit;
}