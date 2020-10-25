"use strict";

// Require Internal Dependencies
const { isLiteral, toValue, toRaw } = require("../src/literal");

// @see https://github.com/estree/estree/blob/master/es5.md#literal
function createLiteral(value, includeRaw = false) {
    const node = { type: "Literal", value };
    if (includeRaw) {
        node.raw = value;
    }

    return node;
}

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
