# Practice 3 — Rotating Discovery Cards

**Course:** WEB 330 — Enterprise JavaScript II  
**Project Type:** Independent JavaScript Practice  
**Textbook Inspiration Image:** Chapter 4, Hands-On Project 4-2 — Random Quotes from Jane Austen    
**Future Destination:** American Nobody / MPGA — `index.html`  
**Date:** November 14, 2026  


---

## 1. Project Overview

Rotating Discovery Cards is an original JavaScript practice project inspired by the textbook's random quote generator.

The textbook's starter files were unavailable, so the HTML, CSS, and JavaScript were created independently.

Instead of displaying random literary quotations, this application displays five promotional cards containing a title, description, category, visual element, and destination link.

The application selects a random card when the page loads. Visitors can navigate between cards or request another randomly selected discovery.

The prototype demonstrates how one reusable JavaScript component can display different information without requiring separate HTML structures for every featured item.

## 2. Purpose — American Nobody Homepage

The finished component will become a **weekly featured-content spotlight** near the top of the American Nobody homepage.

Its primary purpose is to direct visitors toward important information, campaigns, humanitarian needs, and events concerning Palestine.

It will also promote existing website content that deserves additional attention.

### Weekly Spotlight Priorities

The rotating cards may feature:

1. **Featured Humanitarian Hero** — Introduce a person or family whose story and support information are featured on the website.
2. **Palestinian Humanitarian Needs** — Highlight urgent needs, aid information, and verified support opportunities.
3. **Campaigns and Advocacy** — Direct visitors toward current campaigns, initiatives, and ways to participate.
4. **Events and Upcoming Activities** — Promote relevant events, community activities, and scheduled initiatives.
5. **Website Discoveries** — Highlight new or updated content, including the West Bank Explorer, Schoolhouse, Gaza Circus, and other educational or informational pages.

These categories are flexible. The five featured items can change according to the priorities of each week.

The component is intended to help visitors discover information that might otherwise be overlooked among the homepage's existing content cards.

**Important:** The spotlight supplements the existing homepage directory. It does not replace the website's navigation or content sections.

## 3. Project Structure

```text
week-4/
└── practice3/
    ├── index.html
    ├── style.css
    ├── script.js
    └── README.md
```
We need this right? For proper documentation-- it will change in the website. (I feel like I am playing dress up trying to find a way to communicate these notes and documents so I don't sound like an idiot, and I Can use them efficently as notes while still allowing other developers to understand... Bare with me folks.)

### index.html

Provides the application structure, including:

- Page heading and introduction.
- Discovery card container.
- Visual display area.
- Category, title, and description.
- Destination link.
- Previous and Next buttons.
- Surprise Me button.
- Navigation dots.
- Status message for user feedback.

### style.css

Provides:

- Colorful gradient page background.
- Rounded discovery cards.
- Responsive two-column card layout.
- Color-coded visual areas.
- Styled navigation controls.
- Mobile-friendly stacking.
- Visible keyboard focus indicators.
- Reduced-motion support.

### script.js

Controls:

- Discovery data.
- Random starting selection.
- Previous and Next navigation.
- Random card selection.
- Dynamic card content.
- Navigation-dot creation.
- Active-card indicators.
- Status messages.
- Placeholder links for unfinished destinations.

## 4. JavaScript Concepts Practiced

### Arrays of Objects

Five discoveries are stored in one array.

Each object contains the information required to display a card.

```javascript
const discoveries = [
    {
        title: "Explore the West Bank",
        category: "Places & Communities",
        description: "Discover communities, maps, and stories.",
        emoji: "🗺️",
        color: "#ffdb79",
        link: "west-bank.html"
    }
];
```

This structure allows the content to change without modifying the HTML layout.

### Random Number Generation

The application uses:

- `Math.random()`
- `Math.floor()`

These functions select a random array index.

The Surprise Me button uses additional logic to avoid immediately selecting the currently displayed card when multiple cards exist.

### DOM Manipulation

JavaScript updates the visible card using:

- `document.getElementById()`
- `textContent`
- `style.backgroundColor`
- `setAttribute()`
- `removeAttribute()`

The same HTML elements are reused for every discovery.

### Event Listeners

`addEventListener()` connects the navigation buttons to their functions.

Each click changes the application state and updates the displayed card.

### Array Indexing and Modulo

The `%` operator allows navigation to wrap around the array.

After the final card, Next returns to the first card.

Previous on the first card returns to the final card.

### Dynamic Element Creation

The application generates navigation dots with JavaScript.

Each dot represents one discovery and allows direct navigation.

### Application State

The variable `currentIndex` stores the currently selected card.

When the index changes, the application updates the card content and navigation indicators.

## 5. User Interaction

### On Page Load

A random discovery is selected and displayed.

This allows returning visitors to encounter different featured content.

### Previous Button

Displays the preceding discovery.

### Next Button

Displays the following discovery.

### Surprise Me Button

Selects another random discovery.

### Navigation Dots

Allows visitors to select a particular discovery.

The active dot indicates the currently displayed card.

### Destination Link

Each discovery includes a link to its corresponding website page.

During development, unfinished destinations use placeholders.

Before publication, all five featured cards must have verified, working destinations.

## 6. Design and Accessibility

The prototype uses a colorful, friendly visual design with a large illustration area and clearly separated text.

The finished homepage version may replace emoji illustrations with photographs, promotional graphics, or other approved visual assets.

The layout is designed to adapt to:

- Desktop screens.
- Tablets.
- Small mobile screens.

The card stacks vertically at smaller screen widths.

Navigation buttons remain accessible without relying on hover interactions.

The prototype includes keyboard-focus styling and status feedback.

### Future Accessibility Requirements

When integrated into American Nobody:

- Support English and Arabic.
- Preserve correct right-to-left presentation for Arabic.
- Provide meaningful alternative text for photographs.
- Ensure buttons and links have accessible labels.
- Maintain readable text and adequate contrast.
- Avoid automatic transitions that interrupt reading.
- Respect reduced-motion preferences.

The website's existing language system should be used rather than creating a separate, conflicting language toggle.

## 7. Weekly Content Management

The final component should be simple to update during the regular weekly website publishing workflow.

### Proposed Weekly Process

1. Identify five priority items for the upcoming week.
2. Confirm that each item has accurate information and a working destination.
3. Update the five JavaScript objects.
4. Replace placeholder graphics with appropriate images when available.
5. Update English and Arabic content.
6. Review desktop and mobile layouts.
7. Manually test navigation and links.
8. Include changed files and dependencies in the weekly publication report.
9. Publish through the established website workflow.

The goal is to update the content without rebuilding the component.

### Suggested Future Data Fields

The production version may extend each discovery object with:

- Unique identifier.
- English title and description.
- Arabic title and description.
- Category.
- Image path.
- Image alternative text.
- Destination URL.
- Featured week or date range.

Date information may help distinguish current campaigns and events from older content.

Time-sensitive humanitarian claims and event information must be reviewed before publication.

## 8. Humanitarian and Editorial Responsibilities

Because the finished component may promote Palestinian humanitarian needs, campaigns, and events, editorial review is essential.

Before featuring an item:

- Verify factual claims against appropriate sources.
- Confirm event dates and campaign status.
- Confirm that support or donation links lead to the intended destination.
- Respect the privacy and dignity of people featured.
- Distinguish confirmed information from developing reports.
- Avoid presenting expired campaigns or events as current.

The random-selection mechanism determines which approved card is displayed. It does not determine whether the information is accurate or trustworthy.

Human editorial decisions remain responsible for selecting and approving the weekly content.

## 9. Development Decisions

### Decision 1 — Original Implementation

The textbook's starter files were unavailable.

The project was built independently using the textbook's random-selection concept as inspiration.

### Decision 2 — Reusable Component

Rather than creating five separate cards in HTML, one component displays data from an array of objects.

### Decision 3 — Random Initial Discovery

A random item is selected when the page loads.

This provides variety without requiring an automatic slideshow.

### Decision 4 — Visitor-Controlled Navigation

Previous, Next, Surprise Me, and navigation dots allow visitors to explore the full collection.

Automatic timed rotation was deliberately excluded from the first version.

### Decision 5 — Temporary Visual Design

The prototype uses emoji and colorful backgrounds.

These are temporary presentation elements that can be replaced when integrating the component into the live website.

### Decision 6 — Homepage Promotion

The project began as a JavaScript practice exercise.

During browser review, its potential as a weekly promotional banner became clear.

The future purpose was expanded to include Palestinian humanitarian needs, campaigns, events, featured individuals, and existing website content.

This change demonstrates how a small programming experiment can lead to a practical website feature.

## 10. Human–AI Collaboration Case Study Oberservations

### Human Developer

- Selected the textbook concept.
- Defined the future homepage purpose.
- Directed the visual design and code.
- Reviewed the browser output.
- Identified the promotional potential.
- Retained responsibility for testing, content approval, and publication.

### AI
- assisted in briding learning concepts
- assisted in debugging and errors
- is helping articulate into tehcnical ideas and concepts in editing

### Governance Observation

The original learning objective was random content selection.

During human review, a new use case emerged: directing visitors toward priority information on the website.

This illustrates a human-directed change in project requirements during AI-assisted development.

The technical mechanism and editorial purpose remain separate:

**JavaScript controls which approved card appears. Human oversight determines which content should be featured.**

This distinction is particularly important when the component displays humanitarian information.

## 11. Current Status

### Observed in Browser

The supplied browser screenshot shows:

- The discovery card rendering.
- A randomly selected featured item.
- Category, title, description, and button.
- Previous, Next, and Surprise Me controls.
- Five navigation dots with an active indicator.
- The colorful responsive-style layout.

### Final Manual Checks

- Confirm all navigation buttons function correctly.
- Confirm random selection works after refreshing.
- Confirm each navigation dot selects its corresponding card.
- Confirm working destinations open correctly.
- Check tablet and mobile widths.
- Confirm keyboard accessibility.
- Verify placeholder links are replaced before publication.

These checks are not recorded as passed until manually confirmed by the human.

## 12. Future Integration

**Website:** American Nobody / MPGA  
**Target Page:** `index.html`  
**Placement:** Near the top of the homepage  
**Purpose:** Weekly featured-content promotion

The final component should:

- Fit the existing homepage design.
- Preserve the current header, navigation, and content cards.
- Use the website's bilingual system.
- Display five editorially selected weekly priorities.
- Link directly to relevant pages, campaigns, or event information.
- Allow visitors to browse all five features.
- Remain responsive and accessible.
- Be easy to update during the weekly publishing cycle.

Integration is a separate development task and should not modify the live homepage during this practice.

## 13. Learning Summary

Practice 3 demonstrates how JavaScript can turn a single HTML card into a reusable content-display system, which greatly benifits websites massive amount of information archived, displayed and changed weekly.

The key concepts are:

- Arrays and objects.
- Random selection.
- Event listeners.
- DOM manipulation.
- Dynamic navigation.
- Application state.
- Responsive component design.

The project also demonstrates the difference between a technical mechanism and its real-world purpose.

A random quote generator became a weekly discovery and promotion component capable of directing attention toward Palestinian humanitarian needs, campaigns, events, and important website content.

---

**Practice:** 3 — Rotating Discovery Cards  
**Source Inspiration:** JavaScript for Web Warriors, Hands-On Project 4-2  
**Future Destination:** American Nobody homepage  
**Next Step:** Complete manual QA, then adapt for the homepage during a future website session.
