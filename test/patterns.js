"use strict";

// Require Internal Dependencies
const {
    commonStringPrefix,
    commonStringSuffix,
    commonHexadecimalPrefix
} = require("../src/patterns");

test("commonStringPrefix of two strings that does not start with the same set of characters must return null", () => {
    expect(commonStringPrefix("boo", "foo"))
        .toStrictEqual(null, "there is no common prefix between 'boo' and 'foo' so the result must be null");
});

test("commonStringPrefix of two strings that start with the same set of characters must return it as result", () => {
    expect(commonStringPrefix("bromance", "brother"))
        .toStrictEqual("bro", "the common prefix between bromance and brother must be 'bro'.");
});

test("commonStringSuffix of two strings that end with the same set of characters must return it as result", () => {
    expect(commonStringSuffix("boo", "foo"))
        .toStrictEqual("oo", "the common suffix between boo and foo must be 'oo'");
});

test("commonStringSuffix of two strings that does not end with the same set of characters must return null", () => {
    expect(commonStringSuffix("bromance", "brother"))
        .toStrictEqual(null, "there is no common suffix between 'bromance' and 'brother' so the result must be null");
});

test("commonHexadecimalPrefix - throw a TypeError if identifiersArray is not an Array", () => {
    expect(() => commonHexadecimalPrefix(10)).toThrowError("identifiersArray must be an Array");
});

test("commonHexadecimalPrefix - only hexadecimal identifiers", () => {
    const data = [
        "_0x3c0c55", "_0x1185d5", "_0x160fc8", "_0x18a66f", "_0x18a835", "_0x1a8356",
        "_0x1adf3b", "_0x1e4510", "_0x1e9a2a", "_0x215558", "_0x2b0194", "_0x2fffe5",
        "_0x32c822", "_0x33bb79"
    ];
    const result = commonHexadecimalPrefix(data);

    expect(result.oneTimeOccurence).toStrictEqual(0);
    expect(result.prefix._0x).toStrictEqual(data.length);
});

test("commonHexadecimalPrefix - add one non-hexadecimal identifier", () => {
    const data = [
        "_0x3c0c55", "_0x1185d5", "_0x160fc8", "_0x18a66f", "_0x18a835", "_0x1a8356",
        "_0x1adf3b", "_0x1e4510", "_0x1e9a2a", "_0x215558", "_0x2b0194", "_0x2fffe5",
        "_0x32c822", "_0x33bb79", "foo"
    ];
    const result = commonHexadecimalPrefix(data);

    expect(result.oneTimeOccurence).toStrictEqual(1);
    expect(result.prefix._0x).toStrictEqual(data.length - 1);
});
