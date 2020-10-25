"use strict";

/**
 * @description detect if a given string is a svg path or not.
 * @param {!string} str svg path literal
 * @returns {boolean}
 */
function isSvgPath(str) {
    if (typeof str !== "string") {
        return false;
    }
    const trimStr = str.trim();

    return /^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(trimStr) && /[\dz]$/i.test(trimStr) && trimStr.length > 4;
}

/**
 * @description Get the number of unique chars in a given string
 * @param {!string} str string
 * @returns {number}
 */
function stringCharDiversity(str) {
    return new Set(str).size;
}

// ---
const kMaxSafeStringLen = 45;
const kMaxSafeStringCharDiversity = 70;
const kMinUnsafeStringLenThreshold = 200;
const kScoreStringLengthThreshold = 750;

/**
 * @description Analyze a given string an give it a suspicion score (higher than 1 or 2 mean that the string is highly suspect).
 * @param {!string} str string to analyze
 * @returns {number}
 */
function stringSuspicionScore(str) {
    if (str.length < kMaxSafeStringLen) {
        return 0;
    }

    const includeSpace = str.includes(" ");
    const includeSpaceAtStart = includeSpace ? str.slice(0, kMaxSafeStringLen).includes(" ") : false;

    let suspectScore = includeSpaceAtStart ? 0 : 1;
    if (str.length > kMinUnsafeStringLenThreshold) {
        suspectScore += Math.floor(str.length / kScoreStringLengthThreshold);
    }

    return stringCharDiversity(str) >= kMaxSafeStringCharDiversity ? suspectScore + 2 : suspectScore;
}

module.exports = {
    isSvgPath,
    stringCharDiversity,
    stringSuspicionScore
};
