# Let's Play With Numbers!

**Course:** WEB 330 — Enterprise JavaScript II  
**Practice:** Week 4, Practice 9 — Number Sliding Puzzle and Build My Number Line  


## Purpose and Files

Two standalone, child-friendly number-ordering activities for future adaptation into the MPGA Schoolhouse ABC 123 page. The sliding puzzle develops ordering through constrained spatial moves; Build My Number Line offers simpler direct placement of numbers 1 through 9. Both activities remain independently playable on the same page.

| File | Responsibility |
|---|---|
| `index.html` | Both activity sections, instructions, sliding board and moves counter, number-line positions, tray, independent feedback, and reset controls. |
| `style.css` | Soft colors, large rounded tiles, responsive board sizing, gentle shadows, and visible focus outlines. |
| `script.js` | Independent activity state, rendering, sliding rules and shuffling, number-line selection, drag-and-drop, placement, returns, and win detection. |
| `README.md` | Learning concepts, gameplay, development responsibilities, and review status. |

No dependencies, audio, timers, persistence, or difficulty levels are included.

## Activity 1 — Number Sliding Puzzle

A shuffled puzzle appears on load. Tap or click a number directly above, below, left, or right of the empty space. Each legal move slides that number into the empty position and increases the counter. Diagonal moves and row wrapping are rejected.

The goal is:

```text
1 2 3
4 5 6
7 8 empty
```

Finishing displays **Hooray! You did it! 🌟**. Mix It Up starts another solvable puzzle and resets the counter. Completed puzzles stop accepting moves until shuffled again.

## Activity 2 — Build My Number Line!

“Pick a number and put it in order from 1 to 9!”

Nine empty destination positions appear in reading order. A separately shuffled tray contains each number from 1 through 9 exactly once. Children can drag a tray block to an empty position, or activate a tray button and then an empty-position button. Native Tab and Enter/Space support the complete tap-to-place workflow without dragging.

Selecting a tray block underlines it, gives it a distinct border, updates `aria-pressed`, and announces its selection. Selecting a placed number returns it to the tray and focuses its tray button. To rearrange, return a number and place it again; occupied positions are not overwritten. Duplicate numbers are prevented by checking the positions array before placement.

When every position equals its expected value, the activity displays **Hooray! You put all the numbers in order! 🌟**. Incorrect full lines remain editable with friendly rearrangement guidance. There is no timer or score penalty, and completed lines remain editable. Start Over clears only this activity and reshuffles its tray; Mix It Up affects only the sliding puzzle.

The number line is a horizontal row on larger screens and wraps into three clearly ordered columns at 540px and below. Position labels and DOM order preserve the sequence without making mobile blocks tiny.

### Additional Learning Concepts

- **Arrays and indexing:** A nine-entry `linePositions` array stores numbers or `null`; a separate `trayOrder` array controls randomized tray order.
- **DOM rendering:** Position buttons and available blocks are rendered from state; the tray filters out placed numbers.
- **Event listeners:** Native `dragstart`, `dragover`, `drop`, and `dragend` handle dragging. Click events independently support tap/keyboard selection, placement, and returns.
- **Conditional statements and state management:** Placement requires a supported, unplaced number and an empty destination. Selection and drag state are independent from the sliding puzzle.
- **Array comparison:** `every()` compares each placed number with the corresponding goal value.
- **Randomization:** Fisher–Yates shuffles the tray without changing destination order.

Native drag-and-drop support varies on touch devices; the independent tap-to-place workflow is the intended fallback. Rendering restores focus after placement and returns. Actual keyboard, screen-reader, and mobile behavior remains subject to human QA.

## JavaScript Concepts

- **Arrays:** `[1, 2, 3, 4, 5, 6, 7, 8, 0]` represents the goal; zero means empty. Spread syntax copies it into mutable game state.
- **Index positions:** `Math.floor(index / 3)` finds a row and `index % 3` finds a column. `indexOf(0)` locates the empty position.
- **Conditional statements:** Manhattan distance of exactly one allows only horizontal or vertical neighbors, preventing diagonals and row wrapping.
- **Swapping array values:** `swapTiles()` uses a temporary variable to exchange two positions.
- **DOM manipulation:** `renderBoard()` creates all nine positions, including eight native buttons and a labeled empty space.
- **Event listeners:** Tile clicks attempt moves; the shuffle button starts a new board. Native buttons support Tab navigation and Enter/Space activation.
- **Solvable shuffling:** Starting from the solved board, 60 random legal moves preserve solvability. Excluding the previous empty position avoids immediately undoing each shuffle move. If the walk returns to the goal, one extra legal move guarantees an unsolved start. This is a legal random walk, not uniform sampling of all possible puzzles or a guaranteed difficulty level.
- **Win detection:** `every()` compares each position with the solved array. Only valid player moves increase the counter.

## Accessibility and Design

Large buttons, clear numbers, a visible Empty label, descriptive tile labels, and keyboard focus indicators avoid reliance on color alone. A status region announces feedback. Rendering restores focus to the tile the player moved so keyboard play can continue. No animations or decorative distractions are required.

Keyboard play uses native Tab and Enter/Space, rather than custom arrow-key controls. Browser, mobile, screen-reader, and touch behavior still require human review.

## Human–AI Workflow and Future Integration Case Study Observations

The human developer sets learning goals, creative direction, scope, writes code, browser QA, and final approval. DEV 1 supports planning and explanations; DEV 2 implements scoped changes and documents limitations. Source implementation is distinct from verified browser behavior. DEV 2 and I are about 2 inches away from an irl session and we can go round and round those 1 and 0 if it keeps it up.

Future American Nobody / MPGA Schoolhouse ABC 123 integration is a separate task. The current practice remains a small two-activity template. Planned integration ideas include English and Arabic instructions, original clay-style SVG number characters, visual demonstrations for younger children, and gentle success animations that respect reduced-motion preferences. These are future possibilities, not implemented features.

