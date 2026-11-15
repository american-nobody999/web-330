# Professor David's Great Conversion Laboratory

**Course:** WEB 330 — Enterprise JavaScript II  
**Practice:** Week 4, Practice 5  
**Type:** Independent JavaScript practice  -- Testing 2 -- >
**Status:** Compact laboratory, CSS instruments, and conversion engine implemented; approved mascot artwork and manual QA pending

## 1. Project Overview

A Fahrenheit-to-Celsius exercise grew into an interactive, multi-category measurement converter intended for future reuse in the MPGA Schoolhouse.

The current design is a whimsical vintage science laboratory with compact station selectors, an interactive conversion workbench, six category-specific instruments, educational results, and Professor David’s Discovery Notebook. The Schoolhouse robot host has an integrated reaction system and speech bubble; approved mascot artwork remains a placeholder.

## 2. Project Structure

| File | Responsibility and current state |
|---|---|
| `index.html` | Semantic introduction, mascot placeholder, six stations, labeled conversion form, results, reactions, notebook, and educational notes. |
| `style.css` | Laboratory palette and typography, responsive station selectors, workbench/results panels, six instrument illustrations, notebook styling, reaction states, finite animations, focus indicators, and reduced-motion rules. |
| `script.js` | Unit data, formulas, validation, category selection, instrument updates, event handling, reactions, and DOM updates. |
| `README.md` | Project documentation, learning concepts, limitations, and future plans. |

No external libraries are required.

## 3. Measurement Categories

| Category | Implemented units | Common reference |
|---|---|---|
| Temperature | Fahrenheit, Celsius, Kelvin | Separate offset formulas |
| Mass | Milligrams, grams, kilograms, ounces, pounds, metric tonnes | Kilograms |
| Length and distance | Millimeters, centimeters, meters, kilometers, inches, feet, yards, miles | Meters |
| Volume and capacity | Milliliters, liters, U.S. fluid ounces, U.S. cups, U.S. pints, U.S. quarts, U.S. gallons | Liters |
| Area | Square centimeters, square meters, square feet, square kilometers, acres, hectares | Square meters |
| Time | Seconds, minutes, hours, days, weeks | Seconds |

Temperature requires offsets because the scales have different zero points. Other categories multiply by the source-to-reference factor divided by the destination-to-reference factor.

Volume uses U.S. customary liquid measures. These differ from imperial measures, dry measures, and nutrition-label measures. The implemented cup is a U.S. customary cup, not an imperial or metric cup.

## 4. JavaScript Learning Objectives

- **Variables and constants:** `currentCategory` tracks the selected station; constants reference data and DOM elements.
- **Arrays and objects:** Category objects hold unit definitions, conversion factors, facts, and explanations; arrays hold default unit selections.
- **Functions and return values:** `convertMeasurement()` and `convertTemperature()` return numerical results without updating the page.
- **Conditional logic:** Conditions select formulas and reject unsupported units or invalid measurements.
- **DOM selection and manipulation:** The interface uses `getElementById()`, `querySelectorAll()`, `textContent`, dynamically created options, classes, and attributes.
- **Event listeners and form handling:** Submission, station clicks, swapping, clearing, and input changes update the experiment.
- **Numerical calculations:** Reference-unit factors support reusable conversions across five multiplicative categories; temperature uses dedicated formulas.
- **Input validation:** Empty, nonnumeric, nonfinite, physically invalid, overflowing, and certain underflowing values receive understandable messages.
- **Separation of concerns:** Calculation functions are separate from presentation and interaction functions.
- **Number formatting:** `formatNumber()` rounds only displayed text. Calculations retain JavaScript Number precision; small and large results use scientific notation.

The calculation functions can be reused with the category data in another interface. They do not depend on the laboratory layout, although the current script also contains page-specific event setup.

## 5. User Experience

The implemented interaction flow is:

1. Select one of six compact laboratory stations.
2. View its corresponding scientific instrument.
3. Enter a numerical measurement.
4. Choose the source and destination units.
5. Submit **Convert My Measurement!**
6. Read the numerical result, formula or conversion relationship, and explanation.
7. Read David's reaction and the Discovery Notebook.
8. Swap units or clear the experiment.

The initial category is Temperature, converting Fahrenheit to Celsius. Results start empty with David's waiting message.

Station changes happen on the same page, showing only the active instrument. Selecting a station repopulates the unit menus, updates the Discovery Notebook, and clears the previous experiment. Swapping reverses unit selections and clears stale results while retaining the input. Clearing removes the measurement and results without changing the category or selected units. Editing the measurement or unit selections also clears stale results.

David's reaction text and `data-state`/state classes support `idle`, `thinking`, `success`, and `error`. Processing is synchronous, with no artificial delay; the thinking state may not visibly render before success or error. CSS supplies distinct reaction colors and borders. Reactions sit beside the experiment controls rather than in a standalone panel.

The Discovery Notebook supplies a fact, reference measurement, and explanation for each category. The HTML also includes a persistent note about atmospheric pressure and temperature reference points.

## 6. Design and Accessibility

Implemented HTML features include semantic sections and headings, visible labels, native keyboard-accessible buttons and selects, decimal-capable number input, output elements, and a result message with `role="status"`. JavaScript updates station `aria-pressed` values and marks invalid measurement input with `aria-invalid`.

The cream, teal, blue, green, coral, and brass-gold design uses dimensional panels and compact spacing. Workbench and results sit side by side on desktop and stack at 650px and below. Station selectors use six columns on desktop, three at 850px and below, and two at 650px and below. The notebook sits beneath the workbench, and safety notes use native expandable `<details>`/`<summary>` elements.

CSS provides visible keyboard focus indicators, selected-station underlining and inset borders, invalid-input styling, and distinct reaction states. Buttons and form controls have a 44px minimum height. Inactive instrument figures use `hidden` and `display: none`, removing them from display and accessibility navigation; decorative instrument artwork is marked `aria-hidden` while captions and explanations remain readable.

Reduced-motion preferences disable animations and transitions. Professor David's approved image remains pending; the placeholder and speech bubble are preserved. No completed accessibility or responsive testing is asserted.

### Six Visual Experiments

These exhibit names describe the current instruments; the interface uses shorter category labels and captions. All illustrations are educational representations, not calibrated instruments. Their animations never determine numerical conversion results.

| Exhibit | Implemented visual behavior |
|---|---|
| **Temperature — The Hot & Cold Machine** | CSS thermometer fill and cold-to-hot color transition follow the Celsius equivalent, clipped to a symbolic −20°C to 120°C range. Text retains the actual value and identifies freezing/boiling references when applicable. |
| **Mass — The Great Weigh-Off** | A two-tray balance gently tilts and settles level after conversion. Its caption explains that converting units does not change the object's mass. |
| **Length — The Never-Ending Ruler** | A symbolic ruler has decorative ticks and an animated indicator. It is explicitly not a literal scale drawing. |
| **Volume — The Bubbling Beaker** | A beaker with decorative graduation marks has a transitioning liquid level and a brief bubble animation. It is explicitly not calibrated. |
| **Area — The Shape Shifter** | A 4×4 square grid highlights illustrative cells with a short color animation. Text explains area as length × width and emphasizes square units. |
| **Time — The Clockwork Contraption** | The minute hand makes one brief turn and a gear rotates on conversion. The hour hand stays fixed. The display is decorative, not a live clock or elapsed-time measurement. |

Length, volume, and area cues use a bounded logarithmic representation of magnitude in reference units, rather than a linear measurement scale. Time uses a fixed decorative animation even for signed durations. Zero produces no filled area cells. Initial/default instrument positions are decorative and are accompanied by a waiting message, not a fabricated result.

`resetInstrument()` controls visibility and clears visual state; `updateInstrument()` updates the active figure after a successful conversion. CSS transitions and finite animations run without timers or JavaScript animation loops. Edits, swaps, clearing, and station changes reset the illustrations alongside stale results.

## 7. Scientific Accuracy and Limitations

The engine uses standardized conversion relationships and references the [NIST Guide to SI conversion factors](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors) in its source comments.

Reference examples include:

- 0°C = 32°F.
- 1 inch = exactly 2.54 centimeters.
- 1 kilogram ≈ 2.20462 pounds.
- 1 hectare = 10,000 square meters.
- 1 day = 86,400 seconds for the fixed-duration model.

These are educational reference relationships, not recorded test results.

Mass describes the amount of matter; weight is a gravitational force. The converter uses avoirdupois ounces and pounds as mass units. Length and area use international feet and miles rather than historical survey-unit definitions.

Validation rejects temperatures below absolute zero and negative mass, length, volume, or area. Zero and same-unit conversions are supported. Signed time values represent durations; days and weeks are fixed intervals, not calendar, daylight-saving, or leap-second calculations.

JavaScript uses finite binary floating-point numbers, so exact standardized relationships can still incur representation error. Display values are rounded to at most 12 significant digits in ordinary formatting or 10 significant digits in scientific notation. No intermediate display rounding is fed into calculations. Nonfinite results and nonzero multiplicative conversions that underflow to zero are rejected. This introductory tool is not intended for precision-critical measurement work.

## 8. Future Integration — MPGA Schoolhouse

Adaptation into American Nobody / MPGA Schoolhouse is planned, not completed. Potential future work includes:

- English and Arabic educational content and right-to-left presentation.
- More scientific reference examples.
- Interactive measurement challenges and student practice questions.
- Connections to Homework and Science activities.
- Reusable conversion utilities for other educational pages.

Approved mascot artwork, final visual refinement, and human review remain dependencies for future integration; the laboratory CSS presentation is now implemented.

## 9. Human–AI Development Workflow

The human developer establishes requirements, determines creative direction, reviews code and design, performs browser QA, and approves publication.

ChatGPT supports planning, research, brainstorming, programming explanations, task structure, documentation, and learning. Codex implements scoped changes and reports modified files and dependencies; it does not independently approve publication.

The exercise supports hands-on JavaScript practice with human oversight of AI-assisted development. Human browser observations are distinct from automated verification and independently validated scientific results. Implemented code and intended behavior must remain distinct from observed browser results.

## 10. Development Progression

- **Phase 1 — HTML laboratory structure:** Six stations, workbench, results, notebook, and mascot placeholder.
- **Phase 2 — CSS foundation:** The intended styling foundation required recovery after the stylesheet was found to contain only a placeholder comment. Human review identified the missing presentation, and a scoped CSS-only implementation restored it.
- **Phase 3 — JavaScript conversion engine:** Data-driven units, formulas, validation, controls, and educational updates.
- **Phase 4 — Initial README:** Technical documentation recorded the then-missing CSS and artwork.
- **Phase 5 — Compact redesign and six unique instruments:** Shorter entrance, compact station selectors, integrated reactions, expandable notes, and separate symbolic visualizations.
- **Phase 6 — Planned:** Approved mascot assets, further visual refinement, and possible animation refinements. Basic instrument animations already exist; additional animation work is not recorded as completed.

The CSS recovery illustrates a development issue identified through human review and corrected through a bounded implementation request. It is not evidence that all presentation or conversion behavior passed QA.

## 11. Project Status

**Implemented:**

- Semantic laboratory structure and six measurement categories.
- Conversion engine, validation, data-driven dropdowns, swapping, clearing, and result formatting.
- CSS laboratory design with responsive compact station selectors and workbench/results layout.
- Six category-specific scientific visualizations with symbolic captions and reduced-motion handling.
- Discovery Notebook, integrated David reaction messaging, and expandable educational notes.

**Pending:**

- Approved Professor David mascot artwork.
- Final visual and asset refinement.
- Human browser QA of all six categories and instrument behaviors.
- Conversion accuracy review, including boundary and extreme-value behavior.
- Mobile, keyboard, and accessibility review.
- Future American Nobody / MPGA Schoolhouse integration and publication decisions.

No automated or manual testing outcomes are asserted. The project is not documented as fully tested, published, or production-ready. Visual behavior described here is based on source implementation; actual rendering and assistive-technology behavior remain subject to human confirmation.
