"use strict";

/**
 * @typedef { import("../index").SecLiteral } SecLiteral
 */

// Require Internal Dependencies
const Literal = require("./literal");

// CONSTANTS
const kSafeHexValues = new Set(["0123456789", "123456789", "abcdef", "0123456789abcdef", "abcdef0123456789abcdef"]);

/**
 * @description detect if the given string is an Hexadecimal value
 * @param {SecLiteral.Literal | string} anyValue
 * @returns {boolean}
 */
function isHex(anyValue) {
    const value = Literal.toValue(anyValue);

    return typeof value === "string" && /^[0-9A-Fa-f]{4,}$/g.test(value);
}

/**
 * @description detect if the given string is a safe Hexadecimal value
 * @param {SecLiteral.Literal | string} anyValue
 * @returns {boolean}
 */
function isSafe(anyValue) {
    const rawValue = Literal.toRaw(anyValue);

    if (/^[0-9]+$/g.test(rawValue) || rawValue.length <= 4) {
        return true;
    }

    return [...kSafeHexValues].some((value) => value.startsWith(rawValue));
}

module.exports = {
    isHex,
    isSafe
};
