# Shape Explorers — JavaScript Practice 1

**Project:** MPGA Schoolhouse — ABC/123  
**Course:** WEB 330 — Enterprise JavaScript II  
**Textbook:** JavaScript for Web Warriors, 7th Edition  
**Reference:** Chapter 10 — Hands-On Project 10-2 (Tangrams)  
**Date:** November 14, 2026  
**Status:** Practice implementation complete — Ready for ABC/123 integration  
**Coding Standards must be brought up before intergation.

---

## 1. Project Overview

Shape Explorers is a small, bilingual shape-matching game developed as an independent JavaScript practice exercise.

The project was inspired by the textbook's tangram exercise, which introduces dragging and positioning geometric puzzle pieces.

Rather than reproduce the full tangram activity, the concept was adapted into a simpler educational game for children.

**Primary objective:** Match seven colorful geometric shapes to their corresponding outlines using pointer events.

The game is designed for future integration into the MPGA Schoolhouse ABC/123 collection.

### Learning Goals

- Recognize geometric shapes.
- Distinguish between different triangle sizes.
- Develop visual matching skills.
- Practice hand-eye coordination.
- Explore shapes through interactive movement.
- Present shape names in English and Arabic.

---

## 2. Current Game Structure

The game uses three files:

| File | Purpose |
|---|---|
| `index.html` | Game structure, bilingual labels, shape containers |
| `style.css` | Visual styling, responsive layout, SVG presentation |
| `script.js` | Shape generation, pointer movement, matching, reset |

### Seven Geometric Pieces

| Shape | Quantity |
|---|---:|
| Large triangle | 2 |
| Medium triangle | 1 |
| Small triangle | 2 |
| Square | 1 |
| Parallelogram | 1 |
| **Total** | **7** |

The pieces are generated using SVG polygons rather than separate image files.

Each shape has a matching target outline.

---

## 3. JavaScript Concepts Practiced

### DOM Manipulation

The game uses:

- `document.querySelectorAll()`
- `document.getElementById()`
- `document.createElement()`
- `document.createElementNS()`
- `appendChild()`
- `addEventListener()`

**Concept learned:** JavaScript can create and manipulate interactive elements dynamically instead of requiring every element to be manually constructed in HTML.

### Pointer Events and Pointer Capture

The game uses:

- `pointerdown`
- `pointermove`
- `pointerup`
- `pointercancel`
- `setPointerCapture()`
- `releasePointerCapture()`

Pointer capture keeps subsequent pointer events directed to the selected piece while dragging.

**Important distinction:** Pointer capture does not move an element. JavaScript must calculate the movement and update its position.

### Coordinate Calculations

The implementation uses:

- `clientX` and `clientY`
- `getBoundingClientRect()`
- Element width and height
- Position differences
- `Math.min()` and `Math.max()`

The `moveTan()` function calculates pointer movement and constrains the dragged piece within the combined board-and-tray region.

The `drawDrag()` function updates the piece's position.

### Shape Matching and Snapping

The `dropTan()` function checks whether a piece is close enough to a matching target.

It compares:

- Shape type
- Target availability
- Distance between the piece and target centers

The distance calculation uses `Math.hypot()`.

When a valid match is found, the piece is placed into the target slot and locked.

Otherwise, it returns to its original tray slot.

### Arrays, Objects, and State

The game uses:

- Arrays for polygon coordinates and colors.
- An object to define geometric shapes.
- A `Map` to preserve each piece's original container and target state.
- An array of available target slots.
- Dataset attributes to identify shape types and locked pieces.

**Concept learned:** State management allows JavaScript to distinguish between available, actively dragged, and completed pieces.

---

## 4. SVG Shape Generation

Unlike the original jigsaw puzzle exercise, Shape Explorers does not require individual PNG files.

The JavaScript defines each geometric shape through coordinate arrays.

The `addPolygon()` function creates SVG polygons using those coordinates.

All shapes use a shared `100 × 100` SVG coordinate system.

### Advantages

- No separate image files required.
- Shapes can be generated dynamically.
- Colors can be modified independently.
- Outlines use the same geometry as their matching pieces.
- The approach can be reused in other educational games.

**Technical observation:** The current implementation uses simplified polygon proportions for shape matching. A future geometry-focused lesson should use mathematically normalized shapes and measurements.

---

## 5. Game Interaction

### Current Implementation

1. JavaScript generates the seven target outlines.
2. The player selects a geometric shape.
3. Pointer capture begins.
4. The shape follows pointer movement.
5. The player releases the shape near an outline.
6. JavaScript checks whether the shape type matches.
7. A valid match snaps into the target slot.
8. The matched shape becomes locked.
9. An invalid match returns to the tray.
10. The Start Over button resets all pieces.

### Responsive Behavior

The CSS uses a four-column layout on larger screens and a two-column layout on smaller screens.

The `sizePieces()` function adjusts the rendered shape size according to the available slot width.

The game includes touch-related styling for pointer interaction.

**Verification note:** The code implements these behaviors, but this README does not represent a completed cross-device accessibility or browser test.

---

## 6. Design Decisions and Corrections

### Initial Design

The first version included:

- A swan silhouette.
- Seven colorful shapes.
- A Shape Detective information panel.
- A shared puzzle board.
- Draggable shape cards.

### Problems Identified

During browser experimentation:

- The swan silhouette did not have a verified solution.
- Piece sizes were inconsistent with the target.
- Shapes could be moved outside their intended playing area.
- The draggable cards included labels and backgrounds.
- The Shape Detective panel added unnecessary complexity.

### Corrections

The game was simplified to focus on its original learning purpose.

- Removed the swan silhouette.
- Removed Shape Detective.
- Removed draggable card backgrounds.
- Separated labels from draggable shapes.
- Generated matching SVG outlines.
- Added snapping and locking logic.
- Added reset functionality.
- Preserved bilingual presentation.

**Development lesson:** More features do not necessarily create a better learning experience. Reducing scope made the intended interaction clearer.

---

## 7. Reusable JavaScript Functions

| Function | Responsibility |
|---|---|
| `addPolygon()` | Generate SVG shape geometry |
| `grabTan()` | Begin dragging and capture the pointer |
| `moveTan()` | Calculate movement and constrain positioning |
| `drawDrag()` | Update visual position |
| `dropTan()` | Validate matching and handle release |
| `sizePieces()` | Adjust shape sizes for available space |

These functions provide a reference for future drag-and-drop activities.

### Potential Reuse

- Shape recognition games.
- Number matching.
- Letter matching.
- Pattern-building exercises.
- Object sorting.
- Simple educational puzzles.

The existing code can serve as a reference without requiring every future game to use the same HTML structure.

---

## 8. Future Integration — ABC/123

**Destination:** MPGA Schoolhouse → `abc-123/`

Shape Explorers is the first planned shape activity in the ABC/123 collection.

### Integration Goals

- [ ] Transfer the practice into the ABC/123 project.
- [ ] Adapt styling to the existing Schoolhouse design.
- [ ] Preserve English and Arabic labels.
- [ ] Review mobile and touch interactions.
- [ ] Review keyboard accessibility.
- [ ] Add completion feedback if appropriate.
- [ ] Keep the game lightweight and engaging.

### Future Shape Activities

Two additional activities may be developed separately using concepts from this practice.

Their mechanics and difficulty progression will be designed later.


---

## 9. Human–AI Collaboration and Governance Notes

This project also serves as an example of human–AI collaboration during technical learning.

### Workflow

1. Human developer selected the textbook concept.
2. AI assisted with the initial HTML and CSS.
3. Human developer experimented with JavaScript pointer events.
4. Browser observations identified usability problems.
5. Human developer directed scope reductions and design corrections.
6. AI-assisted implementation supported the revised game.
7. Human developer reviewed the browser results.
8. The final implementation was documented for future reuse.

### Observations for AI Goverence Case Study Project

**Concept recognition:** The earlier jigsaw puzzle introduced pointer capture and dragging. This practice reused those concepts with SVG geometric shapes.

**Problem identification:** Visual inspection revealed that the original design was more complicated than necessary.

**Human oversight:** The developer determined that Shape Detective and the swan silhouette should be removed.

**Scope management:** The project returned to a single seven-piece matching activity instead of expanding into a larger educational system.

**Knowledge reuse:** The project demonstrates how one JavaScript concept can be adapted across different interfaces.


---

## 10. Development Responsibilities

### Human Developer

- Selects learning exercises.
- Determines project scope.
- Practices, writes, and reviews JavaScript.
- Evaluates browser behavior.
- Approves design changes.
- Performs final QA and publication.

### AI Assistance

- Explains programming concepts.
- Supports HTML and CSS development with error and debugging.
- Reviews JavaScript.
- Helps identify implementation problems.
- Assists with scoped revisions.
- Documents reusable technical concepts.

The human developer retains responsibility for project decisions and final acceptance.

---

## 11. Current Status

**WEB 330:** Independent Chapter 10 JavaScript practice.

**Practice 1:** Seven-piece Shape Explorers implementation prepared.

**ABC/123:** Future integration planned.

**JavaScript reference:** Pointer events, SVG generation, drag movement, matching, snapping, state management, and reset.

**Next step:** Continue collecting JavaScript practice exercises before returning to ABC/123 integration.

---

*MPGA — American Nobody*  
*JavaScript Practice Library*  
*November 14, 2026*
