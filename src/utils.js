"use strict";

/**
 * @typedef { import("../index").SecLiteral } SecLiteral
 */

// Require Third-party Dependencies
const isStringSvg = require("is-svg");
const stringWidth = require("string-width");

// Require Internal Dependencies
const { toValue } = require("./literal");

/**
 * @param {SecLiteral.Literal | string} strOrLiteral
 * @returns {boolean}
 */
function isSvg(strOrLiteral) {
    const value = toValue(strOrLiteral);

    return isStringSvg(value) || isSvgPath(value);
}

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

    return trimStr.length > 4 && /^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(trimStr) && /[\dz]$/i.test(trimStr);
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
    const strLen = stringWidth(str);
    if (strLen < kMaxSafeStringLen) {
        return 0;
    }

    const includeSpace = str.includes(" ");
    const includeSpaceAtStart = includeSpace ? str.slice(0, kMaxSafeStringLen).includes(" ") : false;

    let suspectScore = includeSpaceAtStart ? 0 : 1;
    if (strLen > kMinUnsafeStringLenThreshold) {
        suspectScore += Math.ceil(strLen / kScoreStringLengthThreshold);
    }

    return stringCharDiversity(str) >= kMaxSafeStringCharDiversity ? suspectScore + 2 : suspectScore;
}

module.exports = {
    isSvg,
    isSvgPath,
    stringCharDiversity,
    stringSuspicionScore
};
