// Import Node.js Dependencies
import { randomBytes } from "crypto";

// Import Third-party Dependencies
import test from "tape";

// Import Internal Dependencies
import { isHex, isSafe, CONSTANTS } from "../src/hex.js";
import { createLiteral } from "./utils/index.js";

test("isHex() of a random Hexadecimal value must return true", (tape) => {
  const hexValue = randomBytes(4).toString("hex");

  tape.strictEqual(isHex(hexValue), true, `Hexadecimal value '${hexValue}' must return true`);
  tape.end();
});

test("isHex() of an ESTree Literal containing a random Hexadecimal value must return true", (tape) => {
  const hexValue = createLiteral(randomBytes(4).toString("hex"));

  tape.strictEqual(isHex(hexValue), true, `Hexadecimal value '${hexValue.value}' must return true`);
  tape.end();
});

test("An hexadecimal value must be at least 4 chars long", (tape) => {
  const hexValue = randomBytes(1).toString("hex");

  tape.strictEqual(isHex(hexValue), false, `Hexadecimal value '${hexValue}' must return false`);
  tape.end();
});

test("isHex() of a value that is not a string or an ESTree Literal must return false", (tape) => {
  const hexValue = 100;

  tape.strictEqual(isHex(hexValue), false, "100 is typeof number so it must always return false");
  tape.end();
});

test("isSafe('00000000') must always return true", (tape) => {
  const hexValue = "00000000";

  tape.strictEqual(isSafe(hexValue), true, "a string with only numbers must always return true");
  tape.end();
});

test("isSafe() must always return true if the value start with one of the 'safe' values", (tape) => {
  for (const safeValue of CONSTANTS.SAFE_HEXA_VALUES) {
    const hexValue = safeValue + randomBytes(4).toString("hex");

    tape.strictEqual(isSafe(hexValue), true);
  }
  tape.end();
});
