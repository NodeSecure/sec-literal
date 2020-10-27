"use strict";

// Require Node.js Dependencies
const { randomBytes } = require("crypto");

// Require Internal Dependencies
const { isLiteral, toValue, toRaw, defaultAnalysis } = require("../src/literal");
const { createLiteral } = require("./utils/index");

test("isLiteral must return true for a valid ESTree Literal Node", () => {
    const literalSample = createLiteral("boo");

    expect(isLiteral(literalSample)).toStrictEqual(true);
    expect(isLiteral("hey")).toStrictEqual(false);
    expect(isLiteral({ type: "fake", value: "boo" })).toStrictEqual(false);
});

test("toValue must return a string when we give a valid EStree Literal", () => {
    const literalSample = createLiteral("boo");

    expect(toValue(literalSample)).toStrictEqual("boo");
    expect(toValue("hey")).toStrictEqual("hey");
});

test("toRaw must return a string when we give a valid EStree Literal", () => {
    const literalSample = createLiteral("boo", true);

    expect(toRaw(literalSample)).toStrictEqual("boo");
    expect(toRaw("hey")).toStrictEqual("hey");
});

test("defaultAnalysis() of something else than a Literal must always return null", () => {
    expect(defaultAnalysis(10)).toStrictEqual(null);
});

test("defaultAnalysis() of an Hexadecimal value", () => {
    const hexValue = randomBytes(10).toString("hex");

    const result = defaultAnalysis(createLiteral(hexValue, true));
    expect(result).toMatchObject({
        isBase64: true, hasHexadecimalSequence: false, hasUnicodeSequence: false
    });
});

test("defaultAnalysis() of an Base64 value", () => {
    const hexValue = randomBytes(10).toString("base64");

    const result = defaultAnalysis(createLiteral(hexValue, true));
    expect(result).toMatchObject({
        isBase64: true, hasHexadecimalSequence: false, hasUnicodeSequence: false
    });
});

test("defaultAnalysis() of an Hexadecimal Sequence", () => {
    const hexSequence = createLiteral("'\\x64\\x61\\x74\\x61'", true);

    const result = defaultAnalysis(hexSequence);
    expect(result).toMatchObject({
        isBase64: false, hasHexadecimalSequence: true, hasUnicodeSequence: false
    });
});

test("defaultAnalysis() with a Literal with no 'raw' property must return two null values", () => {
    const hexValue = randomBytes(10).toString("base64");

    const result = defaultAnalysis(createLiteral(hexValue));
    expect(result).toMatchObject({
        isBase64: true, hasHexadecimalSequence: null, hasUnicodeSequence: null
    });
});
