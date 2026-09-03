import type { Locale } from "@/lib/i18n";
import type { Dict } from "./schema";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { de } from "./de";
import { pt } from "./pt";
import { ru } from "./ru";
import { ka } from "./ka";

const DICTS: Record<Locale, Dict> = { en, es, fr, de, pt, ru, ka };

export function getDict(locale: Locale): Dict {
  return DICTS[locale] ?? en;
}

export type { Dict } from "./schema";
