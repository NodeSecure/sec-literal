// Import Third-party Dependencies
import isStringBase64 from "is-base64";

/**
 * @description detect if the given literal is a ESTree literal.
 * @param {SecLiteral.Literal | string} anyValue
 * @returns boolean
 * 
 * @example
 * const literalSample = createLiteral("hello world");
 * Literal.isLiteral(literalSample); // true
 * Literal.isLiteral("hello world!"); // false
 */
export function isLiteral(anyValue) {
  return (
    typeof anyValue === "object" &&
    "type" in anyValue &&
    anyValue.type === "Literal"
  );
}

/**
 * @description returns the value of the literal if the input is an ESTree literal else returns the original input.
 * @param {SecLiteral.Literal | string} strOrLiteral
 * @returns string
 * 
 * @example
 * const literalSample = createLiteral("hello world");
 * Literal.toValue(literalSample); // returns "hello world"
 */
export function toValue(strOrLiteral) {
  return isLiteral(strOrLiteral) ? strOrLiteral.value : strOrLiteral;
}

/**
 * @description returns the raw value of literal if the literal is an ESTree literal else returns the original input
 * @param {SecLiteral.Literal | string} strOrLiteral
 * @returns string
 * 
 * @example
 * const literalSample = createLiteral("hello world", true);
 * Literal.toRaw(literalSample); // returns "hello world"
 * 
 */
export function toRaw(strOrLiteral) {
  return isLiteral(strOrLiteral) ? strOrLiteral.raw : strOrLiteral;
}

/**
 * @description returns an object which indicates if the literal contains hexadecimal, unicode or base64 sequence if the input is an ESTree literal else it returns null
 * @param {!SecLiteral.Literal} literalValue
 * @returns {SecLiteral.LiteralDefaultAnalysis}
 * 
 * @example
 * const literalSample = createLiteral("hello world");
 * Literal.toRaw(literalSample); // returns { hasHexadecimalSequence: null, hasUnicodeSequence: null, isBase64: null}
 */
export function defaultAnalysis(literalValue) {
  if (!isLiteral(literalValue)) {
    return null;
  }

  const hasRawValue = "raw" in literalValue;
  const hasHexadecimalSequence = hasRawValue
    ? /\\x[a-fA-F0-9]{2}/g.exec(literalValue.raw) !== null
    : null;
  const hasUnicodeSequence = hasRawValue
    ? /\\u[a-fA-F0-9]{4}/g.exec(literalValue.raw) !== null
    : null;
  const isBase64 = isStringBase64(literalValue.value, { allowEmpty: false });

  return { hasHexadecimalSequence, hasUnicodeSequence, isBase64 };
}
