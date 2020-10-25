"use strict";

// Require Internal Dependencies
const { commonStringPrefix } = require("../src/patterns");

test("commonStringPrefix of two strings that does not start with the same character must return null", () => {
    expect(commonStringPrefix("boo", "foo"))
        .toStrictEqual(null, "there is no common prefix between 'boo' and 'foo' so the result must be null");
});

test("commonStringPrefix of two strings that start with the same set of characters must return it as result", () => {
    expect(commonStringPrefix("bromance", "brother"))
        .toStrictEqual("bro", "the common prefix between bromance and brother must be 'bro'.");
});
