"use strict";

/**
 * @typedef { import("../index").SecLiteral } SecLiteral
 */

// Require Third-party Dependencies
const isStringBase64 = require("is-base64");

/**
 * @param {SecLiteral.Literal | string} anyValue
 * @returns {string}
 */
function isLiteral(anyValue) {
    return typeof anyValue === "object" && "type" in anyValue && anyValue.type === "Literal";
}

/**
 * @param {SecLiteral.Literal | string} strOrLiteral
 * @returns {string}
 */
function toValue(strOrLiteral) {
    return isLiteral(strOrLiteral) ? strOrLiteral.value : strOrLiteral;
}

/**
 * @param {SecLiteral.Literal | string} strOrLiteral
 * @returns {string}
 */
function toRaw(strOrLiteral) {
    return isLiteral(strOrLiteral) ? strOrLiteral.raw : strOrLiteral;
}

/**
 * @param {!SecLiteral.Literal} literalValue
 * @returns {SecLiteral.LiteralDefaultAnalysis}
 */
function defaultAnalysis(literalValue) {
    if (!isLiteral(literalValue)) {
        return null;
    }

    const hasRawValue = "raw" in literalValue;
    const hasHexadecimalSequence = hasRawValue ? /\\x[a-fA-F0-9]{2}/g.exec(literalValue.raw) !== null : null;
    const hasUnicodeSequence = hasRawValue ? /\\u[a-fA-F0-9]{4}/g.exec(literalValue.raw) !== null : null;
    const isBase64 = isStringBase64(literalValue.value, { allowEmpty: false });

    return { hasHexadecimalSequence, hasUnicodeSequence, isBase64 };
}

module.exports = {
    isLiteral,
    toValue,
    toRaw,
    defaultAnalysis
};
