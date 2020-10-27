"use strict";

// Require Node.js Dependencies
const { randomBytes } = require("crypto");

// Require Internal Dependencies
const { isHex, isSafe, CONSTANTS } = require("../src/hex");
const { createLiteral } = require("./utils/index");

test("isHex() of a random Hexadecimal value must return true", () => {
    const hexValue = randomBytes(4).toString("hex");

    expect(isHex(hexValue))
        .toStrictEqual(true, `Hexadecimal value '${hexValue}' must return true`);
});

test("isHex() of an ESTree Literal containing a random Hexadecimal value must return true", () => {
    const hexValue = createLiteral(randomBytes(4).toString("hex"));

    expect(isHex(hexValue))
        .toStrictEqual(true, `Hexadecimal value '${hexValue.value}' must return true`);
});

test("An hexadecimal value must be at least 4 chars long", () => {
    const hexValue = randomBytes(1).toString("hex");

    expect(isHex(hexValue))
        .toStrictEqual(false, `Hexadecimal value '${hexValue}' must return false`);
});

test("isHex() of a value that is not a string or an ESTree Literal must return false", () => {
    const hexValue = 100;

    expect(isHex(hexValue))
        .toStrictEqual(false, "100 is typeof number so it must always return false");
});

test("isSafe('00000000') must always return true", () => {
    const hexValue = "00000000";

    expect(isSafe(hexValue))
        .toStrictEqual(true, "a string with only numbers must always return true");
});

test("isSafe() must always return true if the value start with one of the 'safe' values", () => {
    for (const safeValue of CONSTANTS.SAFE_HEXA_VALUES) {
        const hexValue = safeValue + randomBytes(4).toString("hex");

        expect(isSafe(hexValue)).toStrictEqual(true);
    }
});
