"use strict";

// Practice 5: Professor David's Great Conversion Laboratory
// Author: Leslie Brockman
// Factors express one unit in the category's common reference unit.
// Standard relationships: https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors
const categories = {
    temperature: {
        units: { fahrenheit: { label: "Fahrenheit" }, celsius: { label: "Celsius" }, kelvin: { label: "Kelvin" } },
        defaults: ["fahrenheit", "celsius"],
        fact: "Water freezes at 0°C (32°F) and boils near 100°C (212°F) at standard atmospheric pressure.",
        reference: "Absolute zero: −273.15°C = −459.67°F = 0 K.",
        explanation: "Temperature scales have different starting points. We use offsets as well as multiplication."
    },
    mass: {
        referenceUnit: "kilograms",
        units: {
            milligrams: { label: "Milligrams", factor: 0.000001 },
            grams: { label: "Grams", factor: 0.001 },
            kilograms: { label: "Kilograms", factor: 1 },
            ounces: { label: "Ounces", factor: 0.028349523125 },
            pounds: { label: "Pounds", factor: 0.45359237 },
            tonnes: { label: "Metric tonnes", factor: 1000 }
        },
        defaults: ["kilograms", "pounds"],
        fact: "Kilograms measure mass; weight is a force caused by gravity.",
        reference: "1 kilogram = 1,000 grams. 1 avoirdupois pound = exactly 0.45359237 kilograms.",
        explanation: "Mass measures how much matter an object contains. Here, ounces and pounds are units of mass, not force."
    },
    length: {
        referenceUnit: "meters",
        units: {
            millimeters: { label: "Millimeters", factor: 0.001 },
            centimeters: { label: "Centimeters", factor: 0.01 },
            meters: { label: "Meters", factor: 1 },
            kilometers: { label: "Kilometers", factor: 1000 },
            inches: { label: "Inches", factor: 0.0254 },
            feet: { label: "Feet", factor: 0.3048 },
            yards: { label: "Yards", factor: 0.9144 },
            miles: { label: "Miles", factor: 1609.344 }
        },
        defaults: ["meters", "feet"],
        fact: "One inch equals exactly 2.54 centimeters.",
        reference: "1 international mile = 1,609.344 meters.",
        explanation: "Length measures distance. A smaller unit needs a larger count to describe the same distance."
    },
    volume: {
        referenceUnit: "liters",
        units: {
            milliliters: { label: "Milliliters", factor: 0.001 },
            liters: { label: "Liters", factor: 1 },
            fluidOunces: { label: "U.S. fluid ounces", factor: 0.0295735295625 },
            cups: { label: "U.S. cups", factor: 0.2365882365 },
            pints: { label: "U.S. pints", factor: 0.473176473 },
            quarts: { label: "U.S. quarts", factor: 0.946352946 },
            gallons: { label: "U.S. gallons", factor: 3.785411784 }
        },
        defaults: ["liters", "cups"],
        fact: "U.S. customary liquid units differ from imperial units.",
        reference: "1 U.S. liquid gallon = 3.785411784 liters; 1 U.S. customary cup = 8 U.S. fluid ounces.",
        explanation: "Volume measures space occupied. These are U.S. liquid measures, not imperial, dry, or nutrition-label cup measures."
    },
    area: {
        referenceUnit: "square meters",
        units: {
            squareCentimeters: { label: "Square centimeters", factor: 0.0001 },
            squareMeters: { label: "Square meters", factor: 1 },
            squareFeet: { label: "Square feet", factor: 0.09290304 },
            squareKilometers: { label: "Square kilometers", factor: 1000000 },
            acres: { label: "Acres", factor: 4046.8564224 },
            hectares: { label: "Hectares", factor: 10000 }
        },
        defaults: ["squareMeters", "squareFeet"],
        fact: "One hectare equals 10,000 square meters.",
        reference: "A square measuring 100 meters on each side covers one hectare.",
        explanation: "Area measures a surface. Length conversion factors must be squared to convert square units. Feet and acres here use the international foot."
    },
    time: {
        referenceUnit: "seconds",
        units: {
            seconds: { label: "Seconds", factor: 1 },
            minutes: { label: "Minutes", factor: 60 },
            hours: { label: "Hours", factor: 3600 },
            days: { label: "Days", factor: 86400 },
            weeks: { label: "Weeks", factor: 604800 }
        },
        defaults: ["seconds", "minutes"],
        fact: "One day equals 86,400 seconds in this duration converter.",
        reference: "1 week = 7 days; 1 hour = 60 minutes.",
        explanation: "These are fixed durations, not calendar calculations. A negative duration can describe an interval before a reference time."
    }
};

// Calculation functions do not read or update the page.
function convertTemperature(value, from, to) {
    const minimums = { fahrenheit: -459.67, celsius: -273.15, kelvin: 0 };
    if (value < minimums[from]) {
        throw new Error("That temperature is below absolute zero. Use at least −459.67°F, −273.15°C, or 0 K.");
    }
    if (from === to) return value;
    // Work from absolute zero for Kelvin, preserving the exact boundary input.
    if (to === "kelvin") return (value - minimums[from]) * (from === "fahrenheit" ? 5 / 9 : 1);
    if (from === "kelvin") return value * (to === "fahrenheit" ? 9 / 5 : 1) + minimums[to];
    if (from === "fahrenheit") return (value - 32) * (5 / 9);
    return value * (9 / 5) + 32;
}

function convertMeasurement(value, categoryKey, from, to) {
    const category = categories[categoryKey];
    if (!category || !Object.hasOwn(category.units, from) || !Object.hasOwn(category.units, to)) {
        throw new Error("Choose supported units from the current station.");
    }
    if (!Number.isFinite(value)) throw new Error("Enter a finite number, such as 32 or 2.5.");
    if (categoryKey !== "temperature" && categoryKey !== "time" && value < 0) {
        throw new Error("This station needs a measurement of zero or greater.");
    }
    const result = categoryKey === "temperature"
        ? convertTemperature(value, from, to)
        : value * (category.units[from].factor / category.units[to].factor);
    if (!Number.isFinite(result)) throw new Error("That result is too large. Please try a smaller measurement.");
    if (result === 0 && value !== 0 && categoryKey !== "temperature") {
        throw new Error("That result is too small for this converter to represent. Try a larger measurement.");
    }
    return result;
}

// Round only the displayed text; calculations keep JavaScript's Number precision.
function formatNumber(value) {
    if (value === 0) return "0";
    const magnitude = Math.abs(value);
    if (magnitude < 0.000001 || magnitude >= 1e12) return value.toExponential(9);
    return new Intl.NumberFormat("en-US", { maximumSignificantDigits: 12 }).format(value);
}

function conversionRelationship(categoryKey, from, to) {
    if (from === to) return "Same unit: result = original measurement.";
    if (categoryKey === "temperature") {
        const formulas = {
            fahrenheit_celsius: "°C = (°F − 32) × 5/9",
            celsius_fahrenheit: "°F = °C × 9/5 + 32",
            celsius_kelvin: "K = °C + 273.15",
            kelvin_celsius: "°C = K − 273.15",
            fahrenheit_kelvin: "K = (°F + 459.67) × 5/9",
            kelvin_fahrenheit: "°F = K × 9/5 − 459.67"
        };
        return formulas[`${from}_${to}`];
    }
    const category = categories[categoryKey];
    return `Result = measurement × (${category.units[from].factor} ÷ ${category.units[to].factor}). Factors are expressed in ${category.referenceUnit} per unit.`;
}

const form = document.getElementById("conversionForm");
const measurementInput = document.getElementById("measurementInput");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const originalValue = document.getElementById("originalValue");
const convertedValue = document.getElementById("convertedValue");
const conversionFormula = document.getElementById("conversionFormula");
const conversionExplanation = document.getElementById("conversionExplanation");
const resultMessage = document.getElementById("resultMessage");
const davidReaction = document.getElementById("davidReaction");
const reactionMessage = document.getElementById("reactionMessage");
const stationButtons = document.querySelectorAll(".station-button[data-category]");
const instruments = document.querySelectorAll("[data-instrument]");
const instrumentReading = document.getElementById("instrumentReading");
let currentCategory = "temperature";

// Visual state is separate from conversion math. These illustrations are not calibrated.
function resetInstrument() {
    instruments.forEach(instrument => {
        instrument.hidden = instrument.dataset.instrument !== currentCategory;
        instrument.classList.remove("play");
        instrument.style.removeProperty("--level");
        instrument.style.removeProperty("--heat");
        instrument.querySelectorAll(".area-grid span").forEach(cell => cell.classList.remove("filled"));
    });
    instrumentReading.textContent = "Choose a measurement to begin.";
}

function updateInstrument(value, from, result, to) {
    const category = categories[currentCategory];
    const instrument = Array.from(instruments).find(item => item.dataset.instrument === currentCategory);
    // Restart finite CSS animations on each successful experiment, without timers.
    instrument.classList.remove("play");
    void instrument.offsetWidth;
    if (currentCategory === "temperature") {
        const celsius = convertTemperature(value, from, "celsius");
        const fraction = Math.max(0, Math.min(1, (celsius + 20) / 140));
        instrument.style.setProperty("--level", `${fraction * 100}%`);
        instrument.style.setProperty("--heat", `hsl(${210 * (1 - fraction)} 65% 48%)`);
        let reference = "Water freezes at 0°C and boils near 100°C at standard pressure.";
        if (Math.abs(celsius) < 0.000001) reference = "At water's freezing reference point: 0°C.";
        else if (Math.abs(celsius - 100) < 0.000001) reference = "Near water's boiling reference point at standard pressure: 100°C.";
        instrumentReading.textContent = `${formatNumber(celsius)}°C. ${reference} Illustration clips to −20°C…120°C.`;
    } else {
        // A bounded logarithmic cue accommodates tiny and huge quantities without overflow.
        const logarithm = value === 0 ? -6 : Math.log10(Math.abs(value)) + Math.log10(category.units[from].factor);
        const fraction = value === 0 ? 0 : Math.max(.1, Math.min(.9, (logarithm + 6) / 12));
        instrument.style.setProperty("--level", `${fraction * 100}%`);
        instrument.querySelectorAll(".area-grid span").forEach((cell, i) => {
            cell.classList.toggle("filled", i < Math.ceil(fraction * 16));
        });
        instrumentReading.textContent = `${formatNumber(value)} ${category.units[from].label} = ${formatNumber(result)} ${category.units[to].label}. Symbolic illustration.`;
    }
    instrument.classList.add("play");
}

function setReaction(state, text) {
    davidReaction.classList.remove("idle", "thinking", "success", "error");
    davidReaction.classList.add(state);
    davidReaction.dataset.state = state;
    reactionMessage.textContent = text;
}

function clearResults() {
    resetInstrument();
    originalValue.textContent = "";
    convertedValue.textContent = "";
    conversionFormula.textContent = "";
    conversionExplanation.textContent = "";
    measurementInput.removeAttribute("aria-invalid");
    resultMessage.textContent = "Professor David is waiting for your first experiment!";
    setReaction("idle", "Everything is ready! Please don't explode the laboratory.");
}

function clearExperiment() {
    measurementInput.value = "";
    clearResults();
}

function selectCategory(categoryKey) {
    if (!Object.hasOwn(categories, categoryKey)) return;
    currentCategory = categoryKey;
    const category = categories[categoryKey];
    fromUnit.replaceChildren();
    toUnit.replaceChildren();
    Object.entries(category.units).forEach(([value, unit]) => {
        fromUnit.add(new Option(unit.label, value));
        toUnit.add(new Option(unit.label, value));
    });
    fromUnit.value = category.defaults[0];
    toUnit.value = category.defaults[1];
    stationButtons.forEach(button => {
        const selected = button.dataset.category === categoryKey;
        button.setAttribute("aria-pressed", String(selected));
        button.classList.toggle("selected", selected);
    });
    document.getElementById("scienceFact").textContent = category.fact;
    document.getElementById("referenceMeasurement").textContent = category.reference;
    document.getElementById("scienceExplanation").textContent = category.explanation;
    clearExperiment();
}

function submitExperiment(event) {
    event.preventDefault();
    clearResults();
    setReaction("thinking", "Measuring twice, calculating once. Hold onto your goggles!");
    try {
        if (measurementInput.value.trim() === "" || measurementInput.validity.badInput) {
            throw new Error("Enter a number before converting. Decimals and zero are welcome!");
        }
        const value = measurementInput.valueAsNumber;
        const result = convertMeasurement(value, currentCategory, fromUnit.value, toUnit.value);
        const category = categories[currentCategory];
        originalValue.textContent = `${formatNumber(value)} ${category.units[fromUnit.value].label}`;
        convertedValue.textContent = `${formatNumber(result)} ${category.units[toUnit.value].label}`;
        conversionFormula.textContent = conversionRelationship(currentCategory, fromUnit.value, toUnit.value);
        conversionExplanation.textContent = category.explanation + " Displayed numbers may be rounded; calculations use the unrounded values.";
        resultMessage.textContent = "Experiment complete! Your converted measurement is ready.";
        updateInstrument(value, fromUnit.value, result, toUnit.value);
        setReaction("success", "Great galaxies! The numbers behaved themselves!");
    } catch (error) {
        measurementInput.setAttribute("aria-invalid", "true");
        resultMessage.textContent = error.message;
        setReaction("error", "My goggles spotted a problem! Check your measurement and units.");
    }
}

// Use our friendly validation messages instead of browser submission popups.
form.noValidate = true;
form.addEventListener("submit", submitExperiment);
stationButtons.forEach(button => button.addEventListener("click", () => selectCategory(button.dataset.category)));
document.getElementById("swapBtn").addEventListener("click", () => {
    const previousFrom = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = previousFrom;
    clearResults();
});
document.getElementById("clearBtn").addEventListener("click", clearExperiment);
// Remove stale results when the inputs change; the next submission runs the experiment.
measurementInput.addEventListener("input", clearResults);
fromUnit.addEventListener("change", clearResults);
toUnit.addEventListener("change", clearResults);
selectCategory("temperature");
