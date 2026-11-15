"use strict";
//Author: Leslie Brockman
// Practice 2: Palestine Crossword — puzzle data stays separate from game logic.
// Rows and columns start at zero. Arabic Across words use decreasing columns. This was a logistical nightmare for numbering and placement. I forgot how to count once I think. Its battleship---its battleship--its battleship. I hurt my brain cell.
// Arabic had to be handled differently due to its right-to-left orientation and decreasing column order for across words. Also, was translated from English to Arabic before being copied and pasted because I am not switching to the arabic keyboard for this. 
const puzzles = [
    {
        language: "en", gridId: "crosswordGrid", messageId: "gameMessage",
        acrossId: "acrossClues", downId: "downClues",
        checkId: "checkBtn", solutionId: "solutionBtn", resetId: "resetBtn",
        words: [
            { answer: "GAZA", row: 0, col: 8, direction: "down", clue: "Palestinian coastal city that shares its name with a strip of land." },
            { answer: "JAFFA", row: 1, col: 4, direction: "across", clue: "Historic port city known for oranges bearing its name." },
            { answer: "JERICHO", row: 1, col: 4, direction: "down", clue: "Ancient Palestinian city near the spring of Ein es-Sultan." },
            { answer: "OLIVE", row: 4, col: 2, direction: "across", clue: "Small fruit pressed to make an oil used in Palestinian cooking." }
        ]
    },
    {
        language: "ar", gridId: "arabicCrosswordGrid", messageId: "arabicGameMessage",
        acrossId: "arabicAcrossClues", downId: "arabicDownClues",
        checkId: "arabicCheckBtn", solutionId: "arabicSolutionBtn", resetId: "arabicResetBtn",
        words: [
            { answer: "غزة", row: 3, col: 7, direction: "down", clue: "مدينة فلسطينية ساحلية يحمل القطاع اسمها." },
            { answer: "زيتون", row: 4, col: 7, direction: "across", clue: "ثمار تُعصر لإنتاج زيت يُستخدم في المطبخ الفلسطيني." },
            { answer: "تطريز", row: 4, col: 5, direction: "down", clue: "فن تزيين الثوب الفلسطيني بالخيوط والغرز." },
            { answer: "نابلس", row: 4, col: 3, direction: "down", clue: "مدينة فلسطينية تشتهر بصناعة الصابون من زيت الزيتون." }
        ]
    }
];

function normalizeLetters(text, language) {
    if (language === "en") return text.replace(/[^a-z]/gi, "").toUpperCase();
    // Accept alef variants, Persian keyboard equivalents, and omit marks and spaces.
    return text.normalize("NFKC")
        .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
        .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي")
        .replace(/ک/g, "ك").replace(/ی/g, "ي")
        .replace(/[^\u0621-\u063A\u0641-\u064A]/g, "");
}

// Each call owns its cells, selected word, direction, and event handlers.
function createGame(puzzle) {
    const size = 9;
    const grid = document.getElementById(puzzle.gridId);
    const message = document.getElementById(puzzle.messageId);
    const cells = [];
    const solution = [];
    const arabic = puzzle.language === "ar";
    const acrossStep = arabic ? -1 : 1;
    let currentRow, currentCol;
    let direction = "across";
    let activeWord = null;
    let revealed = false;
    let completed = false;
    const words = puzzle.words.map(word => ({ ...word, squares: [], correct: false }));
    const startingNumbers = new Map();

    function say(english, arabicText) {
        message.textContent = arabic ? arabicText : english;
    }

    for (let row = 0; row < size; row++) {
        cells[row] = Array(size).fill(null);
        solution[row] = Array(size).fill("");
    }
    words.forEach(word => {
        word.letters = normalizeLetters(word.answer, puzzle.language);
        for (let i = 0; i < word.letters.length; i++) {
            const row = word.row + (word.direction === "down" ? i : 0);
            const col = word.col + (word.direction === "across" ? i * acrossStep : 0);
            solution[row][col] = word.letters[i];
            word.squares.push({ row, col });
        }
        startingNumbers.set(`${word.row},${word.col}`, 0);
    });
    // Number starts from top to bottom, reading each row in the puzzle's language.
    let number = 1;
    for (let row = 0; row < size; row++) {
        for (let i = 0; i < size; i++) {
            const col = arabic ? size - 1 - i : i;
            const key = `${row},${col}`;
            if (startingNumbers.has(key)) startingNumbers.set(key, number++);
        }
    }

    function wordsAt(row, col) {
        return words.filter(word => word.squares.some(square => square.row === row && square.col === col));
    }

    function highlightCell() {
        grid.querySelectorAll(".cell").forEach(cell => cell.classList.remove("selected", "active"));
        words.forEach(word => {
            const selected = word === activeWord;
            word.button.classList.toggle("active", selected);
            word.button.setAttribute("aria-pressed", String(selected));
        });
        if (activeWord) activeWord.squares.forEach(({ row, col }) => cells[row][col].parentElement.classList.add("active"));
        cells[currentRow][currentCol].parentElement.classList.add("selected");
    }

    function selectCell(row, col) {
        currentRow = row;
        currentCol = col;
        const options = wordsAt(row, col);
        activeWord = options.find(word => word.direction === direction) || options[0];
        direction = activeWord.direction;
        highlightCell();
    }

    function moveTo(row, col) {
        if (row < 0 || row >= size || col < 0 || col >= size || !cells[row][col]) return;
        selectCell(row, col);
        cells[row][col].focus();
        cells[row][col].select();
    }

    function moveBy(rowStep, colStep) {
        let row = currentRow + rowStep, col = currentCol + colStep;
        // Skip blocked squares without wrapping beyond the grid boundary.
        while (row >= 0 && row < size && col >= 0 && col < size) {
            if (cells[row][col]) { moveTo(row, col); return; }
            row += rowStep;
            col += colStep;
        }
    }

    function moveInDirection() {
        if (!activeWord) return;
        const index = activeWord.squares.findIndex(square => square.row === currentRow && square.col === currentCol);
        const next = activeWord.squares[index + 1];
        if (next) moveTo(next.row, next.col);
    }

    function showDirection() {
        say(`Typing direction: ${direction}. Space switches direction.`,
            `اتجاه الكتابة: ${direction === "across" ? "أفقي" : "عمودي"}. المسافة تبدّل الاتجاه.`);
    }

    function updateCompletion(celebrate = false) {
        let foundWord = false;
        grid.querySelectorAll(".cell").forEach(cell => cell.classList.remove("correct"));
        words.forEach(word => {
            const correct = word.squares.every(({ row, col }, i) =>
                cells[row][col].value === word.letters[i]);
            if (correct && !word.correct) foundWord = true;
            word.correct = correct;
            // Rebuild the union: a shared square stays green if either word is correct.
            if (correct) word.squares.forEach(({ row, col }) =>
                cells[row][col].parentElement.classList.add("correct"));
        });
        const complete = words.every(word => word.correct);
        if (celebrate && !revealed && complete && !completed) {
            say("🌟 Amazing! You completed the crossword!", "🌟 مذهل! لقد أكملت الكلمات المتقاطعة!");
        } else if (celebrate && !revealed && foundWord) {
            say("⭐ Wonderful! You found a word!", "⭐ رائع! لقد وجدت كلمة!");
        } else if (celebrate) {
            showDirection();
        }
        completed = complete;
    }

    function handleKeyDown(event) {
        if (event.isComposing) return;
        switch (event.key) {
            case "ArrowUp": event.preventDefault(); moveBy(-1, 0); break;
            case "ArrowDown": event.preventDefault(); moveBy(1, 0); break;
            case "ArrowLeft": event.preventDefault(); moveBy(0, -1); break;
            case "ArrowRight": event.preventDefault(); moveBy(0, 1); break;
            case "Enter": event.preventDefault(); moveBy(1, 0); break;
            case "Tab": event.preventDefault(); moveBy(0, 1); break;
            case " ":
                event.preventDefault();
                direction = direction === "across" ? "down" : "across";
                activeWord = wordsAt(currentRow, currentCol).find(word => word.direction === direction) || null;
                highlightCell();
                showDirection();
                break;
            case "Backspace":
            case "Delete":
                event.preventDefault();
                event.target.value = "";
                event.target.parentElement.classList.remove("error");
                event.target.removeAttribute("aria-invalid");
                updateCompletion(true);
                break;
        }
    }

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            grid.appendChild(cell);
            if (!solution[row][col]) {
                cell.classList.add("blocked");
                cell.setAttribute("aria-hidden", "true");
                continue;
            }
            const start = startingNumbers.get(`${row},${col}`);
            if (start) {
                const label = document.createElement("span");
                label.className = "cell-number";
                label.textContent = start;
                cell.appendChild(label);
            }
            const input = document.createElement("input");
            input.type = "text";
            // Arabic input may contain a combining mark before normalization.
            if (!arabic) input.maxLength = 1;
            input.inputMode = "text";
            input.autocapitalize = "characters";
            input.autocomplete = "off";
            input.spellcheck = false;
            input.lang = puzzle.language;
            input.dir = arabic ? "rtl" : "ltr";
            input.setAttribute("aria-label", arabic ? `الصف ${row + 1}، العمود ${col + 1}` : `Row ${row + 1}, column ${col + 1}`);
            cells[row][col] = input;
            cell.appendChild(input);
            input.addEventListener("focus", () => { selectCell(row, col); input.select(); });
            input.addEventListener("click", () => { selectCell(row, col); input.select(); });
            function enterLetter(event) {
                if (event.isComposing) return;
                input.value = normalizeLetters(input.value, puzzle.language).slice(0, 1);
                cell.classList.remove("error");
                input.removeAttribute("aria-invalid");
                if (input.value) moveInDirection();
                updateCompletion(true);
            }
            input.addEventListener("input", enterLetter);
            input.addEventListener("compositionend", enterLetter);
            input.addEventListener("keydown", handleKeyDown);
        }
    }

    words.sort((a, b) => startingNumbers.get(`${a.row},${a.col}`) - startingNumbers.get(`${b.row},${b.col}`));
    words.forEach(word => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "clue";
        button.textContent = `${startingNumbers.get(`${word.row},${word.col}`)}. ${word.clue} (${word.letters.length})`;
        word.button = button;
        button.addEventListener("click", () => {
            direction = word.direction;
            moveTo(word.row, word.col);
            showDirection();
        });
        document.getElementById(word.direction === "across" ? puzzle.acrossId : puzzle.downId).appendChild(button);
    });

    document.getElementById(puzzle.checkId).addEventListener("click", () => {
        let errors = 0;
        cells.forEach((row, r) => row.forEach((input, c) => {
            if (!input) return;
            const wrong = input.value !== "" && input.value !== solution[r][c];
            input.parentElement.classList.toggle("error", wrong);
            if (wrong) { errors++; input.setAttribute("aria-invalid", "true"); }
            else input.removeAttribute("aria-invalid");
        }));
        say(errors ? `${errors} incorrect entries highlighted.` : "No incorrect entries. Empty squares are not checked.",
            errors ? `عدد الحروف غير الصحيحة المظللة: ${errors}.` : "لا توجد حروف خاطئة. لم تُفحص المربعات الفارغة.");
    });
    document.getElementById(puzzle.solutionId).addEventListener("click", () => {
        cells.forEach((row, r) => row.forEach((input, c) => {
            if (!input) return;
            input.value = solution[r][c];
            input.parentElement.classList.remove("error");
            input.removeAttribute("aria-invalid");
        }));
        revealed = true;
        updateCompletion();
        say("Solution displayed.", "تم عرض الحل.");
    });
    function resetGame() {
        cells.forEach(row => row.forEach(input => {
            if (!input) return;
            input.value = "";
            input.parentElement.classList.remove("error", "correct");
            input.removeAttribute("aria-invalid");
        }));
        revealed = false;
        completed = false;
        words.forEach(word => { word.correct = false; });
        direction = words[0].direction;
        selectCell(words[0].row, words[0].col);
        say("Pick a clue to begin!", "اختر سؤالًا للبدء!");
    }
    document.getElementById(puzzle.resetId).addEventListener("click", resetGame);
    resetGame();
}

puzzles.forEach(createGame);
