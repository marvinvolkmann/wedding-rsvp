# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: invited guests.** Friends and family of all ages, German and international. They hold a printed invitation card, tap its NFC sticker with their phone, and land on their household's personal page. They want to know the details and send a yes/no reply with an optional message. Almost always on a phone, often only once or twice.
- **Secondary: the couple.** Uses a separate admin overview (out of scope for design).

## Product Purpose

Online RSVP for the couple's wedding. Each household gets a personal page through its invitation card: it greets them by name, shows the wedding details, and collects one reply per household (attending yes/no plus an optional message) until a deadline. Success means every household answers before the deadline without needing help.

## Positioning

It is the digital continuation of a physical invitation card held in the guest's hand. Each page is personal: addressed to that household, not a generic event site.

## Operating Context

- Entry is always by tapping an NFC sticker on the printed card. A visit without an invite shows only a "tap your card" note.
- The wedding is a church ceremony followed by a celebration at a separate venue.
- Replies can be changed until the deadline. After it, answered households see their reply read-only; others see a "deadline passed" note.
- German (default) and English, switchable.

## Capabilities and Constraints

- TanStack Start app, Postgres, Docker. Design work must keep the existing routes, server functions and form behavior.
- One answer per household; per-person details go into the message.
- Wedding details sections: date, ceremony, celebration, schedule, dress code, directions, accommodation.
- Open: the invitation card is not designed yet; the page's design may set the direction for it.

## Brand Commitments

- None yet. No card design, monogram, colors or fonts exist.

## Evidence on Hand

- The couple's names are in the project: Sophia & Marvin (`couple` in `src/i18n/messages.ts`). Guests are greeted by first name only.
- Couple photos will be provided later; until then use clearly marked placeholders.
- Wedding details text (dates, venues, times) is placeholder content in `src/i18n/messages.ts`; do not invent real venues or dates.

## Product Principles

1. Personal before generic: the household's names lead.
2. Answering takes seconds on a phone, for every age group.
3. Feels like part of the invitation, not like a web form.
4. Both languages are first-class.

## Accessibility & Inclusion

- Guests include older relatives: generous text size, strong contrast, large touch targets, no reliance on fine motor control.
