# Circus Memory Match 🎪

**Course:** WEB 330 — Enterprise JavaScript II  
**Practice:** Week 4, Practice 6  
**Project Type:** Independent JavaScript practice  


## 1. Project Overview

Circus Memory Match is an interactive card-matching game designed as a JavaScript learning exercise and a reusable template for the future Gaza Circus School Arcade.

Players flip cards to find eight matching pairs of circus-themed symbols. The game tracks moves, completed matches, and elapsed time.

The project combines a vintage circus design with JavaScript game logic, DOM manipulation, and event-driven interactions.

## 2. Project Structure

| File | Responsibility |
|---|---|
| `index.html` | Semantic game structure, scoreboard, controls, instructions, card container, and victory panel |
| `style.css` | Vintage circus theme, responsive layout, card-flip animations, matched-card styling, and focus indicators |
| `script.js` | Card generation, shuffling, matching logic, timer, scoring, game state, and restart functionality |
| `README.md` | Project documentation, learning objectives, limitations, and future development plans |

No external JavaScript libraries are required.

## 3. Game Features

The implementation is designed around sixteen cards containing eight matching pairs.

The circus-themed symbols include: Website implementaion will incorporate selected images for some sysmbols

- 🤡 Clown
- 🎪 Big Top
- 🎟️ Ticket
- 🤹 Juggling
- 🎩 Magic
- ⭐ Star
- 🎵 Music
- 🎈 Balloon

### Gameplay

1. Select **Start the Show!**
2. Sixteen cards are generated and shuffled.
3. Select two cards to reveal their symbols.
4. Matching cards remain revealed.
5. Nonmatching cards flip back after approximately 900 milliseconds.
6. Continue until all eight pairs are matched.
7. View the final move count and elapsed time.
8. Select **Play Again!** to restart.

A new game resets the board, scoreboard, timer, and victory display.

## 4. JavaScript Learning Objectives

### Arrays and Objects

An array stores the eight circus performers. Each performer is represented by an object containing an identifier, name, and symbol.

The array is duplicated to create matching pairs.

### Fisher–Yates Shuffling

The `shuffleDeck()` function randomizes the order of cards.

The algorithm swaps array elements using randomly selected indices, creating a shuffled deck before each game.

### Functions

Functions organize individual responsibilities, including:

- `shuffleDeck()` — randomizes card order.
- `createCard()` — creates a card element.
- `selectCard()` — handles player selections and matching.
- `flipCard()` — updates a card’s visual state and accessibility label.
- `clearSelection()` — clears selected-card references.
- `updateTimer()` — updates elapsed time.
- `startGame()` — initializes a new game.
- `finishGame()` — completes the game.

### Conditional Logic

Conditional statements determine whether:

- A card can be selected.
- Two cards match.
- A mismatched pair should flip back.
- All eight pairs have been found.
- The game should end.

### DOM Manipulation and Rendering

JavaScript dynamically creates the sixteen card buttons and inserts them into the game board.

The script also updates:

- Match count
- Move count
- Timer
- Player messages
- Victory panel
- Card accessibility labels

CSS classes control the visual state of each card.

### Event Listeners

Event listeners respond to card selections and game-control buttons.

### Timers

`setInterval()` updates the elapsed-time display.

`setTimeout()` delays the reversal of mismatched cards.

`clearInterval()` and `clearTimeout()` prevent old timers from continuing after a restart.

### Game State

Variables track selected cards, moves, matches, elapsed time, and whether player input is temporarily locked.

The input lock prevents players from selecting additional cards while a mismatched pair is visible.

## 5. HTML and CSS Design

The visual design uses a vintage circus theme featuring:

- Red-and-gold colors
- Striped circus-inspired background
- Dark game board
- Responsive four-column card layout
- Animated card flips
- Highlighted matching pairs
- Scoreboard panels
- Victory celebration

Each card uses front and back elements with CSS transforms to create a three-dimensional flip effect.

The stylesheet includes a reduced-motion media query for users who prefer less animation. When designing the games--animantion is affecting user play and responsiveness on smaller sizes for many features--further research pending on workarounds and solutions.

## 6. Accessibility Considerations

The template includes semantic HTML, labeled game controls, keyboard-accessible card buttons, visible focus styling, and a status message.

Card labels update when cards are revealed.

Matching cards become disabled after successful identification.

Accessibility testing, keyboard gameplay review, and screen-reader evaluation remain pending for final intergration.

## 7. Technical Limitations

The game uses a fixed set of eight matching pairs.

The timer derives elapsed time from `performance.now()` and refreshes the display with `setInterval()`. It is not a precision stopwatch; display updates may be delayed in inactive browser tabs.

Cards use emoji rather than custom artwork. Emoji appearance may vary across devices and operating systems, and some will have images.

The game does not currently include difficulty settings, saved scores, player profiles, or persistent progress. Its a template. DO NOT REDESIGN THE PINECONE RIGHT NOW.

The current implementation is a standalone learning template, not a production-ready game.

## 8. Future Integration — Gaza Circus School Arcade

The matching-game mechanics may be adapted for the American Nobody / MPGA Gaza Circus School.

Potential future improvements include:

- Original illustrated circus cards
- English and Arabic instructions
- Right-to-left interface support
- Multiple difficulty levels
- Educational matching challenges
- Optional sound effects
- Additional character animations
- Mobile gameplay refinements

The future website integration will be a separate development phase.

## 9. Human–AI Development Workflow

The human developer determines the creative direction, reviews implementation decisions, performs browser testing, and approves final publication.

DEV 1 assists with HTML/CSS templates, JavaScript explanations, documentation, and development planning.

DEV 2 assists with scoped JavaScript implementation under human direction. Line by damn line because we like to come up with some off the wall code in Martian and inject it to be funny. Dev 2 has a bad attitude and requires constant supervision.

The project provides practical experience in recognizing and reusing JavaScript patterns across different interactive applications.

Implementation details and intended behavior are documented separately from verified browser results. I have got to keep these all straight or this is going to be a mess for real. 

## 10. Project Status

**Drafted implementation:**
- HTML game structure
- CSS circus design
- JavaScript matching mechanics
- Sixteen dynamically generated cards
- Card shuffling
- Scoreboard and timer
- Restart controls
- Victory display

**Pending:**

- Future Arcade integration



---

*WEB 330 — JavaScript Practice Templates*  
*Designed for learning, experimentation, and future educational reuse.*
