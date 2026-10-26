export const languages = ["de", "en"] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = "de";

export function isLang(value: unknown): value is Lang {
  return languages.includes(value as Lang);
}

// Per-guest German salutation; English uses one shared greeting instead.
export type Salutations = Record<"female" | "male", string> | null;

export type Venue = {
  label: string;
  time: string;
  place: string;
  address: string;
};

const shared = {
  couple: "Sophia & Marvin",
  date: "29.05.2027",
  ceremony: {
    time: "14:00",
    place: "Klosterkirche Uetersen",
    address: "Kirchenstraße 10, 25436 Uetersen",
  },
  celebration: {
    time: "16:00",
    place: "Alte Ziegelei",
    address: "Altendeich 9, 25335 Raa-Besenbek",
  },
  mapLink: "Karte öffnen",
};

// Everything in [brackets] is a placeholder – replace with the real content.
const de = {
  ...shared,
  pageTitle: "Unsere Hochzeit",
  weekday: "Samstag",
  landing: {
    title: "Halte dein Smartphone an die Einladungskarte.",
    body: "Auf der Karte steckt deine persönliche Einladung. Ein kurzes Antippen genügt, dann geht es hier weiter.",
  },
  invalid: {
    title: "Diese Einladung kennen wir nicht.",
    body: "Der Link scheint nicht zu stimmen. Halte dein Smartphone bitte noch einmal an die Einladungskarte.",
  },
  greeting: "Liebe",
  salutations: { female: "liebe", male: "lieber" } as Salutations,
  intro: "wir heiraten und möchten diesen Tag mit euch feiern.",
  dayHeading: "Der Tag",
  ceremony: {
    label: "Trauung",
    ...shared.ceremony,
  },
  celebration: {
    label: "Feier",
    ...shared.celebration,
  },
  schedule: {
    heading: "Ablauf",
    items: [
      { time: "[14:00]", item: "[Trauung in der Kirche]" },
      { time: "[15:30]", item: "[Sektempfang]" },
      { time: "[18:00]", item: "[Abendessen]" },
      { time: "[21:00]", item: "[Tanz]" },
    ],
  },
  more: [
    { title: "Dresscode", body: "[Beschreibung des Dresscodes]" },
    { title: "Anfahrt", body: "[Hinweise zur Anfahrt und zum Parken]" },
    { title: "Unterkünfte", body: "[Hotelempfehlungen in der Nähe]" },
  ],
  rsvp: {
    heading: "Eure Antwort",
    deadline: (date: string) => `Bitte antwortet bis zum ${date}.`,
    question: "Seid ihr dabei?",
    yes: "Ja",
    yesLong: "Wir kommen gerne",
    no: "Nein",
    noLong: "Wir können leider nicht",
    message: "Nachricht an uns",
    optional: "optional",
    chooseFirst: "Wählt zuerst Ja oder Nein.",
    messageHint:
      "Wer von euch nicht kommen kann, Allergien oder einfach liebe Grüße.",
    send: "Antwort senden",
    update: "Antwort ändern",
    saving: "Wird gespeichert …",
    error: "Das hat leider nicht geklappt. Bitte versucht es noch einmal.",
    stepAnswer: "Antwort",
    stepMessage: "Nachricht",
    stepSend: "Absenden",
    lockedYes: "Ihr seid dabei.",
    lockedNo: "Schade, ihr könnt nicht kommen.",
    lockedOn: (date: string) => `Gespeichert am ${date}`,
    canChange: (date: string) =>
      `Ihr könnt eure Antwort bis zum ${date} ändern.`,
    change: "Antwort ändern",
    closed: "Die Zusagefrist ist abgelaufen.",
    closedNoAnswer:
      "Die Zusagefrist ist leider abgelaufen. Meldet euch gerne direkt bei uns.",
  },
  langSwitch: "Sprache",
};

const en: typeof de = {
  ...shared,
  pageTitle: "Our Wedding",
  weekday: "Saturday",
  landing: {
    title: "Hold your phone against your invitation card.",
    body: "Your personal invitation is inside the card. A quick tap is all it takes to continue here.",
  },
  invalid: {
    title: "We don't recognise this invitation.",
    body: "This link doesn't seem right. Please hold your phone against your invitation card again.",
  },
  greeting: "Dear",
  salutations: null,
  intro: "We're getting married and would love to celebrate the day with you.",
  dayHeading: "The day",
  ceremony: {
    label: "Ceremony",
    ...shared.ceremony,
  },
  celebration: {
    label: "Celebration",
    ...shared.celebration,
  },
  schedule: {
    heading: "Schedule",
    items: [
      { time: "[2 pm]", item: "[Ceremony at the church]" },
      { time: "[3:30 pm]", item: "[Drinks reception]" },
      { time: "[6 pm]", item: "[Dinner]" },
      { time: "[9 pm]", item: "[Dancing]" },
    ],
  },
  more: [
    { title: "Dress code", body: "[Dress code description]" },
    { title: "Getting there", body: "[Directions and parking]" },
    { title: "Where to stay", body: "[Nearby hotel recommendations]" },
  ],
  mapLink: "Open map",
  rsvp: {
    heading: "Your reply",
    deadline: (date: string) => `Please reply by ${date}.`,
    question: "Will you join us?",
    yes: "Yes",
    yesLong: "We'll be there",
    no: "No",
    noLong: "Sadly we can't make it",
    message: "Message to us",
    optional: "optional",
    chooseFirst: "Choose Yes or No first.",
    messageHint: "Who can't make it, allergies, or just a few kind words.",
    send: "Send reply",
    update: "Update reply",
    saving: "Saving …",
    error: "Something went wrong. Please try again.",
    stepAnswer: "Reply",
    stepMessage: "Message",
    stepSend: "Send",
    lockedYes: "You're coming.",
    lockedNo: "Sorry you can't make it.",
    lockedOn: (date: string) => `Saved on ${date}`,
    canChange: (date: string) => `You can change your reply until ${date}.`,
    change: "Change reply",
    closed: "The RSVP deadline has passed.",
    closedNoAnswer:
      "Unfortunately the RSVP deadline has passed. Feel free to contact us directly.",
  },
  langSwitch: "Language",
};

export const messages: Record<Lang, typeof de> = { de, en };
export type Messages = typeof de;
