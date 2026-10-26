import type { Lang } from "./messages.ts";

// Dates are shown in the wedding's local time zone, on server and client alike.
export const TIME_ZONE = "Europe/Berlin";

const locales: Record<Lang, string> = { de: "de-DE", en: "en-GB" };

export function formatDate(date: Date | string, lang: Lang) {
  return new Intl.DateTimeFormat(locales[lang], {
    dateStyle: "long",
    timeZone: TIME_ZONE,
  })
    .format(new Date(date))
    .replace(/ /g, "\u00a0");
}

// The wedding date as engraved on the invitation: "Samstag, den 29. Mai 2027".
// Falls back to the raw text when it is not DD.MM.YYYY.
export function formatEventDate(date: string, lang: Lang) {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(date);
  if (!match) return date;
  const [, day, month, year] = match;
  const formatted = new Intl.DateTimeFormat(locales[lang], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(+year, +month - 1, +day)));
  return lang === "de" ? formatted.replace(", ", ", den ") : formatted;
}

export function formatDateTime(date: Date | string, lang: Lang) {
  return new Intl.DateTimeFormat(locales[lang], {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: TIME_ZONE,
  }).format(new Date(date));
}

export function firstName(name: string) {
  return name.split(" ")[0];
}

export function joinNames(names: string[], lang: Lang) {
  const splitNames = names.map(firstName);
  return new Intl.ListFormat(locales[lang], {
    style: "long",
    type: "conjunction",
  }).format(splitNames);
}
