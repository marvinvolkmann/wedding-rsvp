---
name: Sophia & Marvin
description: A personal wedding invitation and RSVP, framed by one church arch in white and claret.
colors:
  claret: "#5a1f2e"
  claret-deep: "#45162a"
  white: "#fbfaf7"
  blush: "#ebc9cf"
  soft: "#734550"
  error: "#a1121d"
typography:
  display:
    fontFamily: "Libre Bodoni Variable, Bodoni 72, Didot, serif"
    fontSize: "clamp(3.25rem, 15vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Libre Bodoni Variable, Bodoni 72, Didot, serif"
    fontSize: "clamp(2.25rem, 9vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1
  title:
    fontFamily: "Libre Bodoni Variable, Bodoni 72, Didot, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.1
  numeral:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "3.25rem"
    fontWeight: 800
    lineHeight: 1
    fontVariation: "'wdth' 75"
    fontFeature: "tnum"
  body:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.1em"
rounded:
  arch: "999px 999px 0 0"
  arch-frame: "200px 200px 0 0"
  pill: "999px"
  field: "22px"
spacing:
  gutter: "20px"
  gutter-wide: "48px"
  section: "64px"
  section-wide: "88px"
components:
  button-primary:
    backgroundColor: "{colors.claret}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "58px"
  button-primary-hover:
    backgroundColor: "{colors.claret-deep}"
    textColor: "{colors.white}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.claret}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "58px"
  button-outline-hover:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.claret}"
  reply-arch:
    backgroundColor: "transparent"
    textColor: "{colors.claret}"
    rounded: "{rounded.arch}"
    padding: "0 12px 20px"
    height: "210px"
  reply-arch-checked:
    backgroundColor: "{colors.claret}"
    textColor: "{colors.white}"
  venue-frame:
    backgroundColor: "transparent"
    textColor: "{colors.claret}"
    rounded: "{rounded.arch-frame}"
    padding: "72px 24px 32px"
  message-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.claret}"
    rounded: "{rounded.field}"
    padding: "14px 18px"
---

# Design System: Sophia & Marvin

## Overview

**Creative North Star: "The Arch Window"**

The page is a church portal seen from inside: a white arch window opens into a deep claret field and frames the guests' own names. That one shape, the round-topped church arch, is the entire ornament of the system. It returns as the outline frame around each venue, as the two reply choices that fill with claret when chosen, as the filled arch that confirms a "yes", and as a small solid mark in the footer. Nothing else decorates the page.

The world is two-toned and flat. Claret carries the opening field, the footer, every filled control and all text on white; warm white carries everything else. A high-contrast Didone (Libre Bodoni) speaks for the people and places, and a variable grotesque (Archivo) handles the facts, with times set heavy and condensed like a printed programme. Density is generous: large type, 58px controls, wide air between sections, because guests of every age read it once on a phone.

It is neither the script-and-watercolour wedding default nor a boxed card layout. There are no cards, no tinted panels and no shadows; structure comes from the arch outline, from blush hairlines, and from the switch between the claret field and white paper.

**Key Characteristics:**
- One motif: the round-topped church arch, at every scale from 600px window to 44px mark.
- Two fields only: claret above and below, warm white in between.
- Didone for names, venues and replies; condensed heavy grotesque for dates and times.
- Flat, unboxed, hairline-divided; no shadows anywhere.
- Motion lives in the arch: it opens upward, and choosing fills it from the bottom.

## Colors

A two-field palette: one deep wine-red and one warm paper white, with a pale blush and a muted claret doing the quiet work on each side.

### Primary
- **Claret** (`claret`): the opening field and the footer; every filled control (solid pill, chosen reply arch, the "yes" locked arch); all primary text, outlines and focus rings on white. It is the page's ink as well as its field.
- **Deep Claret** (`claret-deep`): hover state of filled pills only.

### Neutral
- **Paper White** (`white`): the page body, the arch window, the message field, and text and the footer mark on claret. It is warm, never pure #fff.
- **Blush** (`blush`): hairlines between sections, schedule rows and the facts strip; secondary text on claret (weekday, footer date, inactive language); the hover wash of outlined pills; text selection; the border of disabled pills.
- **Soft Claret** (`soft`): secondary text on white (lede, addresses, data labels, deadline, hints, placeholders, locked-reply meta).

### Semantic
- **Error Red** (`error`): form error messages only, bold.

### Named Rules
**The Two Fields Rule.** A surface is either claret or white. Text on claret is white or blush; text on white is claret or soft claret. There is no third surface colour and no tinted panel.

**The Claret Ink Rule.** Body text on white is claret, not black or grey. The neutral the eye reads as "ink" is the brand colour itself.

## Typography

**Display Font:** Libre Bodoni Variable, upright and italic (with Bodoni 72, Didot, serif)
**Body Font:** Archivo Variable, width axis (with Helvetica Neue, Arial, sans-serif)

**Character:** A sharp, high-contrast Didone for everything personal (names, venues, the reply words), set against a plain, adjustable-width grotesque that compresses into heavy condensed numerals for dates and times.

### Hierarchy
- **Display** (Bodoni 500, clamp(3.25rem, 15vw, 6rem), 0.95, -0.02em, balanced): the guests' names inside the arch window. One per page.
- **Headline** (Bodoni 500, clamp(2.25rem, 9vw, 3.5rem), 1, centred): section titles. The reply words "Ja" / "Nein" in the reply arches use the same face at 2.75rem; the locked reply at 2rem; the footer couple at 2.5rem.
- **Title** (Bodoni 500 italic, 1.5rem, 1.1): venue labels inside the arch frames. The greeting ("Liebe ...") and the question ("Seid ihr dabei?") use Bodoni italic at 1.5rem; venue places use Bodoni upright at 1.625rem; schedule items and info text at 1.25rem.
- **Numeral** (Archivo 800, condensed, tabular): dates and times. Opening date 2.125rem at 70% width (4rem on desktop); venue times 3.25rem at 75%; schedule times 1.5rem at 80%.
- **Body** (Archivo 400, 1.125rem, 1.5): running text; lede 1.0625rem (1.1875rem desktop) capped at 26ch; info text capped at 30ch.
- **Label** (Archivo 700, 0.8125rem, 0.1em tracking, uppercase, soft claret): data labels in the facts strip, the message field label, and the info item headings. Pills and links use Archivo 700 at 1.1875rem and 1rem.

### Named Rules
**The Faces and Facts Rule.** Bodoni for who and where; Archivo for when and how. A time is never set in Bodoni, a name is never set in Archivo.

**The Labels Are Data Rule.** Small tracked caps name a datum or an item (ceremony, celebration, message, dress code). They never sit above a heading as an eyebrow or kicker.

## Layout

Mobile first, single column below 900px. The gutter is 20px on phones and 48px from 900px up. Content is capped at 1120px; the schedule and the arch window at 560px; the reply block at 640px.

The opening is a full-bleed claret field: a 60px top bar (couple left, DE/EN right), the date, then the white arch window rising from the field's bottom edge. From 900px the field is a three-column grid (1fr, up to 620px, 1fr) at 86svh with the date bottom-left beside the centred window. Directly below on white, the facts strip (two columns split by a blush hairline) and the question with its two pills sit in one row on desktop and stack on phones. Below 480px each fact's time drops to its own line so both venue names align.

Sections are separated by a 1px blush top rule with 64px vertical padding (88px desktop). Venues go two-up and info three-up from 900px. Everything centred within the arch logic; the facts strip is the only left-aligned block.

## Elevation & Depth

The system is completely flat. There are no shadows, no layered cards and no translucency. Depth is the arch window itself, a white opening cut into the claret field, and the step between claret and white. The only box-shadow in the build is the 2px claret focus ring on the message field, which is a focus indicator, not elevation.

### Named Rules
**The No Box Rule.** Content is never placed in a card, panel or tinted box. Groups are held by an arch outline or separated by a blush hairline.

## Shapes

The church arch is the single form: a rectangle with a fully round top and square bottom (`rounded.arch`), drawn either as a white cut-out (the window), a 1.5px claret outline (venue frames, with the shallower `rounded.arch-frame` so wide frames keep a gothic-portal curve), a 2px claret outline that fills (reply choices), a solid claret fill (the locked "yes"), or a solid white SVG mark (footer, 44 x 60). Controls are full pills (`rounded.pill`); the message field is the one soft rectangle (`rounded.field`). Outlines are 2px on interactive shapes and 1.5px on informational frames; dividers are 1px blush.

### Named Rules
**The One Shape Rule.** Any new framing device is an arch. Square-cornered boxes, circles and decorative flourishes are outside the world.

## Components

### Buttons
Round, heavy and generous.
- **Shape:** full pill (`rounded.pill`), 58px minimum height, 2px claret border.
- **Primary:** claret fill, white Archivo 700 at 1.1875rem. Used for "Ja" in the opening and for sending the reply.
- **Hover / Focus:** primary deepens to Deep Claret; outlined pills take a blush wash. Transitions 250ms on the house ease-out. Focus is a 2px outline offset 3px (claret on white, white on claret).
- **Outline:** transparent with claret border and text. Used for "Nein" and "change reply".
- **Disabled:** blush border, soft claret text, no fill.

### Reply Arches (signature)
Two arch-shaped radio choices side by side, 210px tall, with the reply word in Bodoni 2.75rem and a short Archivo explanation beneath, both bottom-aligned. A claret layer fills the arch from the bottom: 8% on hover as a hint, completely when chosen (700ms ease-out), and the text turns white. Keyboard focus outlines the whole arch.

### Locked Reply
After answering, the reply shows as a single arch (up to 340px wide, 240px tall). A "yes" is a filled claret arch that opens upward like the window; a "no" stays a claret outline. The guest's message follows in Bodoni italic.

### Venue Frames
Tall arch outlines (1.5px claret), centred content: italic Bodoni label, condensed heavy time, Bodoni venue name, soft-claret address, and an underlined map link with a drawn arrow.

### Inputs / Fields
- **Style:** message textarea, 2px claret border, 22px radius, white fill, claret text, 120px minimum height, not resizable.
- **Focus:** a 2px claret ring added outside the border.
- **Error:** bold Error Red text centred below the send button; hints in soft claret.

### Links
Archivo 700, claret, underlined at 1.5px with a 6px offset, 44px minimum hit area; hover turns soft claret. Directional links carry a 1em stroked arrow SVG.

### Navigation
The language switch is the only navigation: DE / EN in tracked Archivo 600 on the claret field, 44px targets. Inactive is blush; the active language is white, weight 800, with a 2px underline.

### Footer
Claret field, centred: the solid white arch mark, the couple in Bodoni 2.5rem white, the date in small tracked blush caps.

### Motion
One ease-out curve for everything (`cubic-bezier(0.16, 1, 0.3, 1)`). On load the window opens upward by clip-path (1.4s) and the names rise 18px into place (1s, after 0.55s). Reply arches fill by clip-path (700ms); the locked "yes" arch opens (1s). Under reduced motion every animation and transition is off.

## Do's and Don'ts

### Do:
- **Do** frame anything that needs framing with the round-topped arch, outlined in claret.
- **Do** keep every surface either claret or warm white (#fbfaf7), with blush hairlines between sections.
- **Do** set names, venues and reply words in Libre Bodoni, and dates and times in heavy condensed Archivo with tabular numerals.
- **Do** keep touch targets at 44px minimum and primary controls at 58px tall.
- **Do** animate only through the arch: opening upward, filling from the bottom, on the single ease-out curve, and switch it all off for reduced motion.

### Don't:
- **Don't** put content in cards, boxes or tinted panels, and don't add shadows.
- **Don't** introduce script fonts, watercolour, florals or other wedding ornament; the arch is the only motif.
- **Don't** use small tracked caps as eyebrows or kickers above headings; they label data only.
- **Don't** use pure black, grey or pure white text; ink on white is claret or soft claret, ink on claret is white or blush.
- **Don't** add a second accent colour; Error Red is reserved for errors.
