# The Cosmic Oracle

**Course:** WEB 330 — Enterprise JavaScript II  
**Practice:** Week 4, Practice 4  
**Type:** Independent JavaScript learning exercise  
**Future destination:** American Nobody Arcade  


## 1. Project Overview

The Cosmic Oracle is an original, humorous fortune-telling arcade machine. Its vintage boardwalk theme combines a gold-trimmed cabinet, celestial imagery, floating planets, twinkling stars, and a paper ticket dispenser.

The machine offers 12 fictional fortunes with playful cosmic advice. All fortunes are intended for entertainment and satire, rather than predictions or factual guidance.

This practice explores how JavaScript data, randomization, and user interaction can become a reusable website component.

## 2. Project Files

| File | Purpose |
|---|---|
| `index.html` | Semantic page structure, arcade machine, controls, fortune-ticket display, and status messaging. |
| `style.css` | Vintage arcade styling, responsive layout, celestial and ticket animations, focus indicators, and reduced-motion accommodations. |
| `script.js` | Fortune data, shuffled selection, application state, event handling, and DOM updates. |

The prototype uses native HTML, CSS, and JavaScript without external libraries.

## 3. JavaScript Learning Objectives

- **Arrays of objects:** The `fortunes` array stores each ticket's number, title, symbol, fortune, and advice (`omen`).
- **Functions and return values:** Functions separate shuffling, selecting, displaying, revealing, and resetting. `selectRandomFortune()` returns a fortune object, or `null` if no fortunes exist.
- **DOM selection and manipulation:** `getElementById()` locates interface elements; `textContent`, `hidden`, and `classList` update the ticket and machine messages.
- **Event listeners:** Button click listeners call the reveal and reset functions.
- **Conditional logic:** Conditions handle empty data, an exhausted deck, and attempts to reveal another ticket before resetting.
- **Randomization:** `Math.random()` and `Math.floor()` select indexes for swaps.
- **Fisher–Yates shuffling:** `shuffleFortuneDeck()` builds an array of fortune indexes and swaps each position with a randomly chosen position from the remaining range.
- **State management:** `currentFortuneIndex` remembers the last draw, `fortuneRevealed` tracks whether a ticket is displayed, and `fortuneDeck` stores the remaining indexes.
- **Selection without replacement:** `.pop()` removes one index per draw, so each fortune appears once before the deck is refilled.

The original fortune objects remain unchanged during shuffling. Only their indexes are shuffled. Before drawing from a new cycle, the code swaps the next index if it matches the previous cycle's last draw.

The deck exists only in memory for the current page session. Refreshing starts a new session; no `localStorage` is used. Each cycle is randomized, although a shuffle does not guarantee an entirely different order from every earlier cycle.

## 4. Gameplay

1. Open `index.html` to visit the arcade machine.
2. Select **Reveal My Fortune**.
3. Receive a ticket containing a symbol, number, title, fictional fortune, and cosmic advice.
4. Select **Another Fortune** to hide the ticket and prepare for the next reading.
5. Select **Reveal My Fortune** again and continue until all 12 fortunes have appeared in randomized order.

After all 12 draws, the next reveal automatically refills and shuffles the deck. No fortune repeats within a cycle, and the selection logic is designed to prevent an immediate repeat across cycle boundaries.

**Another Fortune** does not consume a draw or reset the deck. Selecting **Reveal My Fortune** while a ticket is already revealed displays a status reminder instead of drawing again.

## 5. Design and Accessibility

The existing implementation includes:

- A vintage boardwalk arcade appearance with navy, purple, cream, and gold styling.
- Decorative celestial imagery, floating and twinkling effects, and a ticket-dispensing animation.
- A constrained desktop layout and mobile adjustments at 600px and below, including stacked full-width controls.
- Semantic headings, sections, native buttons, and a fortune-ticket article.
- A polite live region for ticket updates and a `role="status"` machine message.
- Hidden decorative imagery where marked with `aria-hidden="true"`.
- Visible keyboard focus outlines and controls with a minimum height of 48px.
- A `prefers-reduced-motion: reduce` rule that disables animations and transitions.

These are implemented accommodations, not evidence of completed accessibility or cross-device testing. Keyboard operation, screen-reader announcements, responsive behavior, and reduced-motion presentation remain subject to human review.

## 6. Future Integration — American Nobody Arcade

The practice project is intended for future adaptation into the American Nobody website's Arcade. No website integration is implemented by this practice.

Planned uses include:

- An interactive fortune-telling attraction using the current fictional content.
- Reusable random-selection and shuffled-deck mechanics for other Arcade components.
- A separate historical quotation dispenser featuring real photographs, quotations, names, dates, attribution, and source links.

The historical quotation version is a future concept. It is not implemented, and this project does not supply verified quotations, historical sources, photographs, or image permissions.

Before developing that version, quotations must be independently verified and image permissions confirmed. Historical material must be clearly distinguished from the Cosmic Oracle's fictional entertainment content.

## 7. Human–AI Collaboration Case Study Ovsbervations and goals Testing 1

The human developer determines project goals, creative direction, implementation boundaries, and final approval.

Dev 1 supports planning, explanations, brainstorming, and documentation. Dev 2 performs scoped implementation work within the authorized project files.

The human developer handles browser testing, review, corrections, and publication decisions. Implementation reports describe code changes; they do not establish that browser behavior has passed review.

No automated or manual test results are asserted in this README.

## 8. Project Status

The prototype code includes 12 original fortunes, a Fisher–Yates shuffled index deck, selection without replacement, cycle-boundary repeat prevention, reveal/reset controls, ticket animation, DOM updates, and status messages.

Pending work includes human browser verification of full draw cycles, reveal/reset behavior, animation, keyboard interaction, status announcements, mobile layouts, and reduced-motion behavior.

American Nobody Arcade adaptation, publication, and any historical quotation component remain separate future tasks. The current practice has not been integrated or documented as fully verified.
