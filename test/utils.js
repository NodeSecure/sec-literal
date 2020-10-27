/* eslint-disable max-len */
"use strict";

// Require Node.js Dependencies
const { randomBytes } = require("crypto");

// Require Internal Dependencies
const { stringCharDiversity, isSvg, isSvgPath, stringSuspicionScore } = require("../src/utils");

test("stringCharDiversity must return the number of unique chars in a given string", () => {
    expect(stringCharDiversity("helloo!"))
        .toStrictEqual(5, "the following string 'helloo!' contains five unique chars: h, e, l, o and !");
});

test("isSvg must return true for an HTML svg balise", () => {
    const SVGHTML = `<svg xmlns="http://www.w3.org/2000/svg"
        width="150" height="100" viewBox="0 0 3 2">

        <rect width="1" height="2" x="0" fill="#008d46" />
        <rect width="1" height="2" x="1" fill="#ffffff" />
        <rect width="1" height="2" x="2" fill="#d2232c" />
    </svg>`;
    expect(isSvg(SVGHTML)).toStrictEqual(true);
});

test("isSvg of a SVG Path must return true", () => {
    expect(isSvg("M150 0 L75 200 L225 200 Z")).toStrictEqual(true);
});

test("isSvgPath must return true when we give a valid svg path and false when the string is not valid", () => {
    expect(isSvgPath("M150 0 L75 200 L225 200 Z")).toStrictEqual(true);
    expect(isSvgPath("M150")).toStrictEqual(false, "the length of an svg path must be always higher than four characters");
    expect(isSvgPath("hello world!")).toStrictEqual(false);
    expect(isSvgPath(10)).toStrictEqual(false, "isSvgPath argument must always return false for anything that is not a string primitive");
});

test("stringSuspicionScore must always return 0 if the string length if below 45", () => {
    for (let strSize = 1; strSize < 45; strSize++) {
        // We generate a random String (with slice it in two because a size of 20 for hex is 40 bytes).
        const randomStr = randomBytes(strSize).toString("hex").slice(strSize);
        expect(stringSuspicionScore(randomStr)).toStrictEqual(0);
    }
});

test("stringSuspicionScore must return one if the str is between 45 and 200 chars and had no space in the first 45 chars", () => {
    const randomStrWithNoSpaces = randomBytes(25).toString("hex");
    expect(stringSuspicionScore(randomStrWithNoSpaces))
        .toStrictEqual(1);
});

test("stringSuspicionScore must return zero if the str is between 45 and 200 chars and has at least one space in the first 45 chars", () => {
    const randomStrWithSpaces = randomBytes(10).toString("hex") + " -_- " + randomBytes(30).toString("hex");
    expect(stringSuspicionScore(randomStrWithSpaces))
        .toStrictEqual(0);
});

test("stringSuspicionScore must return a score of two for a string with more than 200 chars and no spaces", () => {
    const randomStr = randomBytes(200).toString("hex");
    expect(stringSuspicionScore(randomStr))
        .toStrictEqual(2);
});

test("stringSuspicionScore must add two to the final score when the string has more than 70 uniques chars", () => {
    const randomStr = "૱꠸┯┰┱┲❗►◄Ăă0123456789ᶀᶁᶂᶃᶄᶆᶇᶈᶉᶊᶋᶌᶍᶎᶏᶐᶑᶒᶓᶔᶕᶖᶗᶘᶙᶚᶸᵯᵰᵴᵶᵹᵼᵽᵾᵿ⤢⤣⤤⤥⥆⥇™°×π±√ ";
    expect(stringSuspicionScore(randomStr))
        .toStrictEqual(3);
});
