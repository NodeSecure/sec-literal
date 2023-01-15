// Import Third-party Dependencies
import isStringSvg from "is-svg";
import stringWidth from "string-width";

// Import Internal Dependencies
import { toValue } from "./literal.js";

/**
 * @description detect if a given string is an SVG.
 * @param {SecLiteral.Literal | string} strOrLiteral
 * @returns boolean
 * 
 * @example
 * const SVG_HTML = `<svg height="100" width="100">
 *   <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
 * </svg> `;
 * Utils.isSvg(SVG_HTML); // true
 */
export function isSvg(strOrLiteral) {
  try {
    const value = toValue(strOrLiteral);

    return isStringSvg(value) || isSvgPath(value);
  } catch {
    return false;
  }
}

/**
 * @description detect if a given string is a svg path.
 * @param {!string} str svg path literal
 * @returns boolean
 * 
 * @example
 * Utils.isSvgPath("M150 0 L75 200 L225 200 Z"); // true
 * Utils.isSvgPath("hi there!"); // false
 */
export function isSvgPath(str) {
  if (typeof str !== "string") {
    return false;
  }
  const trimStr = str.trim();

  return (
    trimStr.length > 4 &&
    /^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(trimStr) &&
    /[\dz]$/i.test(trimStr)
  );
}

/**
 * @description detect if a given string is a morse value.
 * @param {!string} str any string value
 * @returns boolean
 */
export function isMorse(str) {
  return /^[.-]{1,5}(?:[\s\t]+[.-]{1,5})*(?:[\s\t]+[.-]{1,5}(?:[\s\t]+[.-]{1,5})*)*$/g.test(str);
}

/**
 * @param {!string} str any string value
 * @returns string
 */
export function escapeRegExp(str) {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

/**
 * @description Get the number of unique chars in a given string
 * @param {!string} str string
 * @param {string[]} [charsToExclude=[]]
 * @returns number
 * 
 * @example
 * Utils.stringCharDiversity("hello"); // returns 4
 * Utils.stringCharDiversity("hello", ["l"]); // returns 3
 * Utils.stringCharDiversity("syntax"); // returns 6
 */
export function stringCharDiversity(str, charsToExclude = []) {
  const data = new Set(str);
  charsToExclude.forEach((char) => data.delete(char));

  return data.size;
}

// ---
const kMaxSafeStringLen = 45;
const kMaxSafeStringCharDiversity = 70;
const kMinUnsafeStringLenThreshold = 200;
const kScoreStringLengthThreshold = 750;

/**
 * @description Analyze a given string and give it a suspicion score (higher than 1 or 2 mean that the string is highly suspect).
 * @param {!string} str string to analyze
 * @returns number
 * 
 * @example
 * Utils.stringSuspicionScore("hello world"); // returns 0
 * Utils.stringSuspicionScore(
 *  "XoMFrxuRvgb6a7lip6uYd6sz13E4KooQYqiIL0ZQReukg8BqZwsjCeay"
 * ); // returns 1
 */
export function stringSuspicionScore(str) {
  const strLen = stringWidth(str);
  if (strLen < kMaxSafeStringLen) {
    return 0;
  }

  const includeSpace = str.includes(" ");
  const includeSpaceAtStart = includeSpace
    ? str.slice(0, kMaxSafeStringLen).includes(" ")
    : false;

  let suspectScore = includeSpaceAtStart ? 0 : 1;
  if (strLen > kMinUnsafeStringLenThreshold) {
    suspectScore += Math.ceil(strLen / kScoreStringLengthThreshold);
  }

  return stringCharDiversity(str) >= kMaxSafeStringCharDiversity
    ? suspectScore + 2
    : suspectScore;
}
