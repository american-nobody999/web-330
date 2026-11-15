
# MPGA Circus — Uncle Tito's Juggling Jigsaw

**Date:** November 14, 2026  
**Source:** WEB 330 — Hands-On Project 10-1  
**Status:** Planning — Circus implementation pending  
**Project:** Gaza Circus — Clown Games

---

## 1. Assignment Overview

Hands-On Project 10-1 introduces JavaScript pointer events through an interactive 48-piece jigsaw puzzle.

### Current Implementation

- Uses 48 individual PNG puzzle pieces.
- JavaScript dynamically creates image elements.
- Puzzle pieces are randomized and positioned on the board.
- `pointerdown` begins the dragging interaction.
- `setPointerCapture()` keeps pointer events directed to the selected piece.
- `pointermove` updates the piece's position.
- `pointerup` and `pointercancel` end the interaction.
- `zIndex` brings the selected piece to the foreground.
- All pieces currently share the same puzzle board.
- Snapping and locking are not yet implemented.

### Design Observations

The existing puzzle demonstrates effective pointer movement and realistic interlocking jigsaw graphics.

However, the pieces overlap within the main playing area, making the puzzle difficult to organize.

A separate assembly board and piece tray would improve the player experience.

---

## 2. Circus Game Concept

### Uncle Tito's Juggling Jigsaw

Create a small, interactive puzzle game featuring real photographs of Uncle Tito juggling.

The game will become one of the Gaza Circus clown games.

**Design goals:**

- Fun, simple, and engaging gameplay.
- Realistic interlocking jigsaw pieces.
- Responsive desktop and mobile interactions.
- English and Arabic instructions.
- Minimal dependencies and reusable JavaScript.
- No unnecessary expansion of the game's scope.

---

## 3. Difficulty Levels

| Level | Name | Grid | Pieces |
|---|---|---|---|
| 1 | Little Juggler | 3 × 3 | 9 |
| 2 | Circus Apprentice | 6 × 6 | 36 |
| 3 | Master Juggler | 9 × 9 | 81 |

Each level will use a photograph selected to suit its difficulty.

Additional photographs may be offered later without changing the puzzle engine.

---

## 4. Dynamic Puzzle Generation

The textbook project uses individual PNG files for each puzzle piece.

The Circus adaptation will explore generating puzzle pieces dynamically from a single photograph.

### Proposed Approach

1. Load the selected photograph.
2. Calculate the grid dimensions.
3. Generate interlocking puzzle shapes using SVG masks or canvas.
4. Display the corresponding photograph section inside each shape.
5. Ensure neighboring tabs and cutouts match.
6. Randomize the generated pieces.
7. Place the pieces in a separate tray.

### Advantages

- No need to manually create 126 PNG files.
- One photograph can generate an entire puzzle.
- The same JavaScript engine can support all difficulty levels.
- Photographs can be changed without rewriting game logic.
- Fewer image assets to maintain in GitHub.

**Technical note:** The game will still create individual interactive puzzle elements in the browser, but these do not require separate image files.

---

## 5. Planned Game Layout

### Assembly Board

- Dedicated puzzle assembly area.
- Positioned above the piece tray.
- Displays the puzzle's target dimensions.
- Accepts dragged pieces.
- Snaps correctly positioned pieces into place.
- Locks completed pieces.

### Piece Tray

- Displays shuffled, unplaced puzzle pieces.
- Positioned below the assembly board.
- Scrollable for larger puzzles.
- Supports mouse, touch, and pen interactions.
- Keeps unplaced pieces separate from completed sections.

### Responsive Design

- Maintain usable piece sizes.
- Adapt the board and tray to smaller screens.
- Prevent unintended page scrolling while dragging.
- Preserve accessible controls and bilingual instructions.

---

## 6. Planned Gameplay

1. Player selects a photograph.
2. Player chooses a difficulty level.
3. JavaScript generates the puzzle.
4. Pieces appear shuffled in the tray.
5. Player drags pieces onto the assembly board.
6. Correctly positioned pieces snap into place.
7. Completed pieces become locked.
8. The game tracks progress.
9. Completion triggers stars and a celebration.
10. Player can select Play Again.

---

## 7. Reusable JavaScript Concepts

The following concepts from WEB 330 may be adapted for the Circus game:

### DOM Manipulation
- `document.createElement()`
- Dynamic image and element creation.
- Event listener registration.

### Pointer Events
- `pointerdown`
- `pointermove`
- `pointerup`
- `pointercancel`
- `setPointerCapture()`
- `releasePointerCapture()`

### Positioning
- Pointer coordinate calculations.
- Element positioning.
- `zIndex` management.
- Snap-to-position logic.

### Arrays and Game State
- Randomized piece ordering.
- Tracking completed pieces.
- Difficulty configuration.
- Resetting the puzzle.

### Future Exploration
- SVG paths and clipping masks.
- Canvas image rendering.
- CSS Grid.
- Responsive scaling.
- Accessibility and keyboard alternatives.

---

## 8. Development Boundaries

- Preserve the original WEB 330 assignment.
- Develop the Circus game in separate project files.
- Reuse programming concepts rather than copying assignment-specific implementation.
- Use one reusable puzzle engine for all difficulty levels.
- Avoid unnecessary libraries and dependencies.
- Keep the game small and maintainable.
- Human developer performs browser testing and final QA.
- Implement features in small, clearly scoped phases.

---

## 9. Future Development Tasks

- [ ] Complete remaining JavaScript textbook exercises.
- [ ] Select suitable photographs of Uncle Tito juggling.
- [ ] Review reusable techniques from completed exercises.
- [ ] Design the assembly board and piece tray.
- [ ] Create dynamic interlocking puzzle shapes.
- [ ] Implement pointer-based dragging.
- [ ] Add snapping and piece locking.
- [ ] Add three difficulty levels.
- [ ] Add English and Arabic instructions.
- [ ] Implement completion feedback and replay.
- [ ] Perform desktop and mobile browser testing.

---

## 10. Learning and Governance Notes

This project demonstrates how concepts learned through coursework can be transferred into an independent development project.

### Observed Learning Process

1. Complete a textbook programming exercise.
2. Identify useful JavaScript functionality.
3. Evaluate limitations in the original implementation.
4. Propose improvements for a different project.
5. Document design decisions before implementation.
6. Apply the concepts in a separate environment.

### Human–AI Collaboration

The development workflow uses explicit alignment between the human developer and AI assistants.

The human developer retains responsibility for:

- Project goals and priorities.
- Design decisions.
- Scope and implementation approval.
- Browser testing and quality assurance.
- Final publication.

AI assistants support concept explanations, technical review, brainstorming, and scoped implementation guidance.

### Research Considerations

Future governance analysis may examine:

- Explicit instruction adherence.
- Human oversight and decision-making.
- Learning and concept recognition.
- Error detection and correction.
- Workflow efficiency.
- Transfer of knowledge between projects.

**Evidence distinction:** These notes document the intended workflow and initial observations. They do not independently establish improved learning outcomes, reduced errors, or greater efficiency.

---

## 11. Current Status

**WEB 330:** Pointer-event exercise in progress.

**Gaza Circus:** Uncle Tito's Juggling Jigsaw concept documented.

**Next action:** Continue JavaScript exercises before returning to Circus development.

---

*MPGA — American Nobody*  
*Development and Learning Reference*  
*November 14, 2026*
