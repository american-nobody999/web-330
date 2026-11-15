# Palestine Crossword — JavaScript Practice 2

**Course:** WEB 330 — Enterprise JavaScript II  
**Project Type:** Independent JavaScript Practice  
**Inspired By:** Chapter 10, Hands-On Project 10-5 — Crossword Puzzle  
**Future Destination:** MPGA Schoolhouse → Homework  
**Languages:** English and Arabic  
**Grid Size:** Two independent 9×9 crosswords  
Experimentation with the 9 by 9 grid produces 4 to 5 clues
larger grids for more clues and harder levels
Its Battleship--remember, this is battleship logic when coming back.

---

## 1. Project Overview

Palestine Crossword is an independent JavaScript learning exercise inspired by the textbook's interactive crossword project.

The original textbook exercise focused on correcting an error in an existing crossword application. However, the necessary starter files were unavailable.

Rather than attempting to reproduce missing source code, we developed our own crossword application using HTML, CSS, and JavaScript.

The project combines programming practice with educational vocabulary about Palestinian geography, history, and cultural heritage.

The goal is to understand how crossword puzzles work programmatically while developing a reusable activity for the MPGA Schoolhouse.

## 2. Project Files


**index.html**
- Defines the page structure.
- Provides containers for both crossword boards.
- Includes clue sections, game controls, and feedback messages.
- Supports English and Arabic content.

**style.css**
- Provides the notebook-inspired design.
- Styles the crossword grids, clues, and buttons.
- Defines selected, correct, incorrect, and blocked squares.
- Includes responsive layouts for desktop, tablet, and mobile.

**script.js**
- Generates crossword cells dynamically.
- Stores puzzle information and player input.
- Handles keyboard navigation and letter entry.
- Manages clue selection, validation, and game controls.
- Supports separate English and Arabic crossword states.

## 3. Game Design

The application contains two separate crossword games displayed vertically.

### English Crossword

- English-language clues and answers.
- Left-to-right Across words.
- Top-to-bottom Down words.
- English alphabet input.

### Arabic Crossword

- Arabic-language clues and answers.
- Right-to-left Across words.
- Top-to-bottom Down words.
- Arabic alphabet input.

Each crossword has its own grid, clue list, selected position, player answers, feedback, and game controls.

The games operate independently. Progress in one crossword does not affect the other.

Arabic toggle will produce english on english side and arabic on arabic side when intergrated into website. Shown side by side here for developer reference.

### Crossword Construction

Each crossword uses a 9×9 grid containing 81 positions.

The puzzle data determines which positions are available for letters and which are blocked.

Across and Down answers must intersect using matching letters.

The original vocabulary list contained approximately ten candidate answers, but only a smaller selection could fit into the available crossword layouts.

For this practice, the smaller number of clues is acceptable because the primary goal is learning JavaScript interaction and validation.

The future Homework version may use larger grids and more clues.

## 4. JavaScript Concepts Practiced

### Arrays and Two-Dimensional Grids

A crossword can be represented using a two-dimensional array.

Each square is identified by its row and column.

Example:

```javascript
cells[row][col]
```

A 9×9 grid uses row and column indexes from 0 through 8.

### Nested Loops

Nested loops create the crossword rows and columns.

The outer loop controls rows, while the inner loop controls columns.

### DOM Manipulation

JavaScript dynamically creates the crossword cells and inserts them into the page.

Concepts include:

- `document.createElement()`
- `appendChild()`
- `getElementById()`
- `classList`

### Event Listeners

Event listeners respond to player actions, including:

- Selecting a square.
- Entering a letter.
- Pressing navigation keys.
- Selecting a clue.
- Clicking game buttons.

### Keyboard Events

The crossword supports these controls:

| Key | Behavior |
|---|---|
| Letter | Enters a character |
| Arrow keys | Moves between squares |
| Enter | Moves down |
| Tab | Moves right |
| Spacebar | Switches Across/Down |
| Backspace | Erases a character |
| Delete | Erases a character |

Navigation must respect the puzzle boundaries and blocked squares.

Arabic Across movement follows right-to-left reading order.

### Functions and Conditional Logic

Functions manage movement, input, highlighting, validation, and resetting.

Conditional statements determine how the application responds to different keys and player actions.

### State Management

Each crossword maintains its own current position, typing direction, entered letters, and completion status.

Independent state prevents actions on one crossword from changing the other.

## 5. Crossword Validation

Each available square has an expected solution letter.

The player may enter an incorrect letter, but the answer key determines whether the entry is correct.

The crossword follows several constraints:

1. Coordinates must remain within the 9×9 grid.
2. Blocked squares cannot accept letters.
3. Each playable square contains one letter.
4. Intersecting words must agree on their shared letters.
5. English and Arabic input follow their respective language rules.

The solution data acts as the reference for checking player answers.

### Correct-Word Recognition

The intended feedback behavior is:

- Correctly completed words receive soft green highlighting.
- A gold-star message celebrates a correct word.
- Incorrect or incomplete words do not automatically produce an error warning.
- Editing a previously correct word updates its completion status.
- Completing the entire crossword produces a separate congratulatory message.

English feedback:

**⭐ Wonderful! You found a word!**

Arabic feedback:

**⭐ رائع! لقد وجدت كلمة!**

This approach encourages discovery without interrupting the player for every mistake.

### Game Controls

**Show Errors**

Compares entered letters against the solution and highlights incorrect entries without revealing the correct answers.

**Show Solution**

Displays the completed crossword.

Solution reveals should not count as player-earned achievements.

**Start Over**

Clears the selected crossword and restores its starting state without changing the other board.

## 6. Responsive Design

The crossword is intended for desktop, tablet, and small-screen use.

The layout adapts to available screen space.

**Desktop**
- Crossword grid and clues appear side by side.

**Tablet**
- Crossword and clue sections stack vertically.

**Mobile**
- The grid scales to fit the screen.
- Buttons remain touch-friendly.
- Clue cards appear beneath their corresponding crossword.
- Horizontal page scrolling should not be required.

The 9×9 grid retains square cells across screen sizes.

Manual responsive testing remains part of the project review.

## 7. Development Decisions

### Decision 1 — Build an Independent Practice

The textbook's starter files were unavailable.

We chose to create an original application rather than invent or reconstruct missing textbook code.

### Decision 2 — Begin With Keyboard Navigation

The first JavaScript phase focused on creating the grid, selecting cells, entering letters, and navigating with the keyboard.

This allowed us to understand the basic interaction before introducing crossword answers.

### Decision 3 — Separate the Languages

We initially considered a language toggle.

Instead, we chose two vertically stacked crosswords so both English and Arabic activities would remain available independently.

This also allows each language to have its own crossword layout and vocabulary.

### Decision 4 — Accept a Smaller Practice Puzzle

The candidate vocabulary did not all fit into the 9×9 layouts.

Rather than force incorrect intersections or unrelated filler words, we accepted a smaller puzzle.

The learning objective was functional JavaScript, not maximizing clue count.

### Decision 5 — Encourage Correct Answers Without Punishing Mistakes

We chose to recognize completed correct words automatically while leaving error checking under the player's control.

This separates positive reinforcement from correction.

### Decision 6 — Keep the Project Small

This practice does not require scoring, timers, levels, animations, or additional game modes.

Its purpose is to learn and document reusable programming techniques.

## 8. Human–AI Development Workflow Case Study Observations


### Human Responsibilities

- Defined the learning objectives.
- Selected the project theme and languages.
- Chose the two-board layout.
- Established interaction and feedback requirements.
- Reviewed the visual design.
- Performed manual browser testing.
- Determined which features were appropriate for the practice.
- Retained responsibility for final acceptance and publication.

### ChatGPT Responsibilities

- Helped organize the project requirements.
- Provided initial HTML and CSS error and debugging.
- Explained advanced JavaScript concepts and bridged learning   gaps in realtime.
- Prepared scoped implementation prompts.
- Supported design and interaction decisions.
- Assisted with project documentation.

### Codex Responsibilities

- Worked within the existing project structure.
- Implemented scoped JavaScript and interface changes.
- Adapted the crossword for independent English and Arabic play.
- Reported implementation changes for human review.

### Governance Observation

The project provides an example of human-directed AI-assisted software development.

The human developer defined the requirements and retained authority over code, design, testing, and acceptance.

AI tools supported implementation and explanation but did not replace human review.

Observed browser behavior and completed implementation reports should be documented separately from unverified assumptions about correctness.

## 9. Current Review Status

The following elements have been observed in browser screenshots:

- English and Arabic crossword boards are displayed.
- The boards contain numbered playable squares and blocked positions.
- The notebook design and game buttons are visible.
- The Arabic solution display populates Arabic letters.

The following require final manual confirmation:

- Automatic correct-word celebration.
- Editing a previously completed word.
- Full-puzzle completion recognition.
- Independent reset and solution behavior.
- Arabic keyboard input and navigation.
- Responsive layouts at tablet and mobile widths.
- Correctness of all crossword intersections and clue numbering.


## 10. Future Schoolhouse Reuse

**Destination:** MPGA Schoolhouse → Homework

The future educational version can reuse the crossword interaction logic while expanding its content.

Possible enhancements include:

- Larger crossword grids.
- More clues about Palestinian geography and cultural heritage.
- Additional vocabulary activities.
- Multiple crossword topics.
- Expanded Arabic language exercises.

The future version should preserve the independent bilingual gameplay and responsive design.

These enhancements are outside the scope of the current JavaScript practice.

## 11. Learning Summary

This exercise demonstrates how a crossword puzzle can be represented through arrays, coordinates, event listeners, conditional logic, and DOM manipulation.

It also introduces the distinction between player input, the correct solution, and application state.

The most important lesson is that an interactive game can be built incrementally:

1. Create the grid.
2. Add navigation.
3. Define valid answers and intersections.
4. Connect clues.
5. Validate player input.
6. Provide feedback.
7. Adapt the experience for different languages and screen sizes.

The project serves as both an independent JavaScript learning exercise and a foundation for future educational games.

---

**Project:** Palestine Crossword  
**Course:** WEB 330 — Enterprise JavaScript II  
**Future Use:** MPGA Schoolhouse Homework intergration
