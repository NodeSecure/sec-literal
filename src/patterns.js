// Import Third-party Dependencies
import FrequencySet from "frequency-set";

// Import Internal Dependencies
import * as Literal from "./literal.js";

/**
 * @description get the common string prefix (at the start) pattern
 * @param {!string | SecLiteral} leftAnyValue
 * @param {!string | SecLiteral} rightAnyValue
 * @returns {string | null}
 *
 * @example
 * Patterns.commonStringPrefix("boo", "foo"); // null
 * Patterns.commonStringPrefix("bromance", "brother"); // "bro"
 */
export function commonStringPrefix(leftAnyValue, rightAnyValue) {
  const leftStr = Literal.toValue(leftAnyValue);
  const rightStr = Literal.toValue(rightAnyValue);

  // The length of leftStr cannot be greater than that rightStr
  const minLen = leftStr.length > rightStr.length ? rightStr.length : leftStr.length;
  let commonStr = "";

  for (let id = 0; id < minLen; id++) {
    if (leftStr.charAt(id) !== rightStr.charAt(id)) {
      break;
    }

    commonStr += leftStr.charAt(id);
  }

  return commonStr === "" ? null : commonStr;
}

function reverseString(string) {
  return string.split("").reverse().join("");
}

/**
 * @description get the common string suffixes (at the end) pattern
 * @param {!string} leftStr
 * @param {!string} rightStr
 * @returns {string | null}
 *
 * @example
 * Patterns.commonStringSuffix("boo", "foo"); // oo
 * Patterns.commonStringSuffix("bromance", "brother"); // null
 */
export function commonStringSuffix(leftStr, rightStr) {
  const commonPrefix = commonStringPrefix(
    reverseString(leftStr),
    reverseString(rightStr)
  );

  return commonPrefix === null ? null : reverseString(commonPrefix);
}

/**
 * @description returns the number of one time occurences of hexadecimal prefixes and an object containing the prefixes and the number of occurences in a given array of hexadecimals.
 * @param {!string} leftStr
 * @param {!string} rightStr
 * @returns {string | null}
 *
 * @example
 * Patterns.commonHexadecimalPrefix(["_0x33bb79", "foo", "_0x3c0c55", "_0x1185d5"]); // returns { oneTimeOccurence: 1, prefix: { _0x: 3 } }
 */
export function commonHexadecimalPrefix(identifiersArray) {
  if (!Array.isArray(identifiersArray)) {
    throw new TypeError("identifiersArray must be an Array");
  }
  const prefix = new FrequencySet();

  mainLoop: for (const value of identifiersArray.slice().sort()) {
    for (const [cp, count] of prefix) {
      const commonStr = commonStringPrefix(value, cp);
      if (commonStr === null) {
        continue;
      }

      if (commonStr === cp || commonStr.startsWith(cp)) {
        prefix.add(cp);
      } else if (cp.startsWith(commonStr)) {
        prefix.delete(cp);
        prefix.add(commonStr, count + 1);
      }
      continue mainLoop;
    }

    prefix.add(value);
  }

  // We remove one-time occurences (because they are normal variables)
  let oneTimeOccurence = 0;
  for (const [key, value] of prefix.entries()) {
    if (value === 1) {
      prefix.delete(key);
      oneTimeOccurence++;
    }
  }

  return {
    oneTimeOccurence,
    prefix: Object.fromEntries(prefix),
  };
}
