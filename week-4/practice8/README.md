# DJ Clown's Dance Studio

**Course:** WEB 330 — Enterprise JavaScript II  
**Practice:** Week 4, Practice 8  
**Status:** Current practice development milestone complete; initial human browser observations recorded; full QA and integration pending

## Overview and Files

The original Clown Says practice evolved into a three-level interactive dance game with an unlockable choreography studio. A vintage circus theme connects command recognition, sequence memory, and a player-created performance. The practice uses native HTML, CSS, and JavaScript, with no external dependencies or downloaded music.

- `index.html`: Level navigation, game screens, Dance Studio, choreography builder, and controls.
- `style.css`: Circus theme, responsive layouts, DJ stage, lighting, focus indicators, and reduced-motion rules.
- `script.js`: Game logic, rewards, playback, synthesized percussion, persistence, and event handling.
- `README.md`: Learning concepts, implementation behavior, and review limitations.

## Three Playable Levels

**Level 1 — Clown Says:** Ten timed rounds use Jump, Wave, Spin, and Clap and retain the original scoring. Perform the requested action only when the command begins with “Clown Says”; correctly ignoring a trick also earns a point. Successful action clicks are recorded in order. The first four become the reward, cycling the available successful actions if fewer than four exist. No successful action means no invented routine: replay Level 1 to earn it. Completing ten rounds unlocks Level 2 regardless of score. Previously earned routines survive unsuccessful replays.

**Level 2 — Remember the Routine:** Watch and repeat a sequence growing from two to six moves. Repeated moves are allowed. Mistakes offer a replay of the same sequence; only a successful round extends it. Completing six moves saves a separate six-move reward and unlocks Level 3.

**Level 3 — DJ's Final Challenge:** Four rounds mix 2/4/6/8 valid commands with 1/2/3/4 trick commands. Repeat only the Clown Says actions in their displayed order. Failed rounds retain their command sequence. Completing Round 4 awards its eight valid moves and unlocks the Studio after all three levels are complete.

Level 3 timing remains a known usability concern. The latest code displays each command for **2,000 ms**, pauses **500 ms** between commands, and waits **1,000 ms** after the final command before accepting input. These named timing constants allow later tuning; the adjustment has not been documented as resolving the difficulty. Level 1 and Level 2 timing were left unchanged.

Level playback disables response buttons while demonstrating commands. Timers are cleared on navigation and restart. An explicit restart creates fresh level sequences without erasing previously earned rewards.

## Grand Finale Dance Studio

The earned performance copies routines in order with spread syntax:

```javascript
[...level1, ...level2, ...level3]
```

The result contains **4 + 6 + 8 = 18 moves**, without modifying the original arrays. If the Level 1 routine is missing, the finale remains unavailable and explains the replay requirement. The unlocked Studio still permits custom choreography.

Each beat shows Jump, Wave, Spin, or Clap with a move counter. Controls provide Start the Show, Pause/Resume, Stop, Replay, Mute/Unmute, and Lights On/Off. Pausing continues with the next move when resumed; stopping resets the display. Completion displays **YOU ARE THE STAR OF THE SHOW!** and offers replay or custom mode.

## Custom Choreography

Create My Own provides an ordered list of up to 32 supported actions. Repeated moves are permitted. Players can append moves, undo, clear, play, stop, and save. Empty playback receives a friendly message.

Custom and earned performances use the same playback/audio engine. Switching modes or editing choreography stops the current performance. Starting another dance replaces playback rather than creating a second loop. Editing automatically saves when browser storage is available; Save My Dance also explicitly writes progress.

## Original Audio and Synchronized Lighting

The Web Audio API synthesizes an original percussion pattern: a falling-frequency oscillator makes a kick, while generated noise and filtering create snare and hi-hat sounds. No recordings or external music are used. One reusable AudioContext serves all performances.

A shared **90 BPM** beat scheduler updates the move, schedules percussion, and selects the lighting state. It uses a performance-clock deadline and avoids rushing through missed beats. This is lightweight browser-event synchronization, not sample-accurate audiovisual production; device latency and browser scheduling may affect perceived alignment.

Audio creation/resume occurs only from user-triggered playback, resume, or unmute. Unsupported, blocked, or suspended audio allows silent visual playback with a message. Pause, stop, replay, navigation, and reset cancel the playback timer and stop active audio sources. Background-tab playback pauses; returning requires a user resume. Pending asynchronous starts use a token so navigation or restart cannot revive an obsolete performance.

A decorative disco ball, DJ booth, colored spotlights, and floor tiles provide localized, gentle beat changes. There are no full-screen flashes or rapid strobe effects. Lighting can be turned off independently of music and moves. Reduced-motion preferences suppress reactive lights and CSS motion; the move text and progress remain usable. Settings for lights and mute are session-only.

## Persistence and Reset

One versioned key, **`mpga-circus-dj-v1`**, stores:

- Completed levels in progression order.
- Separate Level 1, 2, and 3 earned arrays.
- Custom choreography.

Data is saved after level completion and choreography changes. Restore validates the schema version, sequential level completion, allowed actions, earned routine lengths of 4/6/8 (or permitted unearned empty arrays), and the custom 32-move limit before applying any progress. Invalid or unavailable saves leave a fresh playable state and a status message.

The Studio unlock is derived from completed levels, not trusted as a saved flag. Reload restores rewards and unlocks, but opens Level 1; it does not restore an active round, selected screen, timer, or audio playback.

Reset All Progress requests confirmation, stops game/studio callbacks, clears rewards and choreography, removes only this project's storage key, and returns to Level 1. Storage failures are reported without preventing in-memory play. If removal fails, old saved data may remain for a later visit.

## JavaScript Learning Concepts

- **Arrays and objects:** Move definitions, command objects, response sequences, and routine data.
- **Spread syntax:** Copying rewards and combining the finale without mutating earned arrays.
- **Functions and event listeners:** Separate gameplay, rendering, audio, storage, and control responsibilities.
- **DOM manipulation:** Dynamic choreography cards, changing commands, progress text, and accessible control states.
- **Timers and animation:** Timed rounds, requestAnimationFrame countdowns, sequence timeouts, a shared studio beat timer, and CSS transitions.
- **Randomized sequences:** Random actions and Fisher–Yates command shuffling allow repeated moves while preserving each round’s valid/trick counts.
- **Array comparisons and filtering:** Responses are compared with expected actions; filtering extracts only Clown Says moves from command objects.
- **Input validation:** Saved data is checked for supported actions, valid routine lengths, schema version, and consistent progression; empty custom playback is rejected.
- **Conditional logic:** Command eligibility, response comparison, unlock rules, input gating, and save validation.
- **State management:** Separate level progression, transient gameplay state, and studio/audio state prevent overlapping activity.
- **Browser APIs:** Web Audio synthesis, localStorage persistence, visibility events, and reduced-motion media queries.

## Accessibility and Responsive Design

Native buttons preserve keyboard activation. Visible focus indicators, disabled locked levels, current/completed ticket labels, readable move text, status messages, and sequence counters support operation without relying on color or sound alone. The Studio uses wrapping controls and a compact responsive choreography list. Reduced-motion rules remove stage animation and reactive lighting; Lights Off also works independently.

The timed game levels and temporary response-button disabling still need keyboard, screen-reader, motor-accessibility, and pacing review. Rapid live announcements are avoided for every Studio beat; the move text and counter remain visible. No accessibility conformance or mobile behavior is claimed as verified.

## Human Browser Observations

The human developer reports manually interacting with the game and observing functioning gameplay and the Dance Studio interface. Level 3 felt particularly difficult because its commands advanced too quickly to comfortably read, filter, and remember.

That feedback prompted the timing adjustment described above. Further timing and accessibility refinements remain planned. These are initial human observations, not comprehensive QA, automated test results, or independent verification of every feature. No complete review of the adjusted timing is recorded here.

## FUTURE DEVELOPMENT — CIRCUS ARCADE INTEGRATION

The following work is planned for future American Nobody / MPGA Gaza Circus School Arcade integration; it is outside the completed practice milestone.

### A. Additional Dance Moves

Initial additions are **Side Step Left** and **Side Step Right**. Keep the move system data-driven so new actions can be added without rewriting the game engine. Update command generation, memory sequences, choreography controls, audio synchronization, and saved-routine validation together when expanding beyond the four current actions. Existing saved data will need compatibility consideration.

### B. SVG Characters and Visual Instructions

Create original, consistently styled circus SVG characters demonstrating Jump, Wave, Spin, Clap, Side Step Left, and Side Step Right. Planned improvements include movement arrows, animated demonstrations, and clearer instructions for younger players who may not immediately understand written commands.

Support English and Arabic instructions, with appropriate right-to-left presentation, when integrating into the bilingual Schoolhouse/Circus experience. Essential meaning must remain available without relying solely on animation or color. These illustrations and additional moves are not implemented yet.

### C. Gameplay Accessibility and Difficulty

- Revisit Level 3 timing and visual pacing with younger players in mind.
- Consider further sequence-replay improvements; Levels 2 and 3 already provide same-sequence retry controls.
- Explore age-appropriate difficulty options.
- Preserve reduced-motion preferences and Lights Off.
- Avoid rapid strobe effects.
- Maintain and review keyboard and touch accessibility.

### D. Circus Arcade Visual Integration

Future HTML/CSS refinement may include custom DJ clown graphics, original circus SVG artwork, improved responsive layouts, enhanced stage lighting, more expressive success/failure animations, and clearer progression and rewards.

A decorative disco ball, beat-reactive floor tiles, and basic celebration effects already exist. Future work may refine or replace them with original artwork and richer animations while respecting motion preferences; it should not be described as already completed.

### E. Future Audio Improvements

Explore additional original rhythms and tempo choices while keeping music synchronized with visual choreography. Do not use copyrighted music without appropriate permission. The current prototype already synthesizes its own percussion; additional rhythms and selectable tempos are planned possibilities.

## Development Workflow

ChatGPT assisted with design, architecture, explanations, documentation, and implementation prompts. Codex performed scoped implementation under human direction and reported modified files, dependencies, and limitations.

The human developer established creative direction and reviewed gameplay in the browser. Final QA, corrections, publication approval, and Circus Arcade integration remain the human developer's responsibility. Browser observations are recorded separately from automated verification and unverified assumptions.

## Development Status and Limitations

| Area | Status |
|---|---|
| Practice implementation | Complete for the current development milestone |
| Initial human browser observations | Recorded above |
| Full QA | Not claimed |
| Circus Arcade integration | Planned |
| Additional moves and SVG illustrations | Planned |
| Future timing and accessibility refinements | Planned |
| Publication | Not claimed |

Implemented features describe source functionality except where explicitly identified as human observations. No automated testing or comprehensive browser verification is asserted.

Further human review remains needed for level transitions, rewards, storage/reset behavior, audio restrictions and latency, playback cleanup, touch/keyboard input, responsive layouts, lighting comfort, and reduced motion. Browser storage may be unavailable or cleared; progress is local to a browser/origin and does not sync between devices. Emoji artwork varies by device. Suspended audio may need another user interaction; silent playback remains available. Restored rewards do not reconstruct earlier score displays or in-progress rounds.
