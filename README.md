# Sec-literal

![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/NodeSecure/sec-literal/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/NodeSecure/sec-literal/commit-activity)
[![OpenSSF
Scorecard](https://api.securityscorecards.dev/projects/github.com/NodeSecure/sec-literal/badge)](https://api.securityscorecards.dev/projects/github.com/NodeSecure/sec-literal)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/NodeSecure/sec-literal/blob/master/LICENSE)
![build](https://img.shields.io/github/actions/workflow/status/NodeSecure/sec-literal/node.js.yml)

This package is a security utilities library created to analyze [ESTree Literal](https://github.com/estree/estree/blob/master/es5.md#literal) and JavaScript string primitive. This project was originally created to simplify and better test the functionalities required for the SAST Scanner [JS-X-Ray](https://github.com/fraxken/js-x-ray).

## Features

- Detect Hexadecimal, Base64, Hexa and Unicode sequences.
- Detect patterns (prefix, suffix) on groups of identifiers.
- Detect suspicious string and return advanced metrics on it (char diversity etc).

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @nodesecure/sec-literal
# or
$ yarn add @nodesecure/sec-literal
```

## API

## Hex

### isHex(anyValue): boolean

Detect if the given string is an Hexadecimal value

```js
Hex.isHex('4e20') // true
Hex.isHex(20) // false
```

### isSafe(anyValue): boolean

Detect if the given string is a safe Hexadecimal value. The goal of this method is to eliminate false-positive.

```js
Hex.isSafe('393d8') // true
Hex.isSafe('7f196a64a870440000') // false
```

## Literal

### isLiteral(anyValue): boolean

Detect if the given literal is a ESTree literal.

```js
const literalSample = createLiteral("hello world");
Literal.isLiteral(literalSample); // true
Literal.isLiteral("hello world!"); // false
```

### toValue(anyValue): string

Returns the value of the literal if the input is an ESTree literal else it returns the original input

```js
const literalSample = createLiteral("hello world");
Literal.toValue(literalSample); // returns "hello world"
```

### toRaw(anyValue): string

Returns the raw value of literal if the literal is an ESTree literal else it returns the original input

```js
const literalSample = createLiteral("hello world", true);
Literal.toRaw(literalSample); // returns "hello world"
```

### defaultAnalysis(literalValue)

Returns an object which indicates if the literal contains hexadecimal, unicode or base64 sequence if the input is an ESTree literal else it returns null

```js
const literalSample = createLiteral("hello world");
Literal.toRaw(literalSample); // returns {hasHexadecimalSequence: null, hasUnicodeSequence: null, isBase64: null}
```

## Utils

### isSvg(strValue): boolean

Detect if a given string is an SVG.

```js
const SVG_HTML = `<svg height="100" width="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  </svg> `;
Utils.isSvg(SVG_HTML); // true
```

### isSvgPath(strValue): boolean

Detect if a given string is a svg path.

```js
Utils.isSvgPath("M150 0 L75 200 L225 200 Z"); // true
Utils.isSvgPath("hi there!"); // false
```

### stringCharDiversity(str): number

Get the number of unique chars in a given string.

```js
Utils.stringCharDiversity("hello"); // returns 4
Utils.stringCharDiversity("hello", ["l"]); // returns 3
Utils.stringCharDiversity("syntax"); // returns 6
```

### stringSuspicionScore(str): number

Analyze a given string and give it a suspicion score (higher than 1 or 2 mean that the string is highly suspect).

```js
Utils.stringSuspicionScore("hello world"); // returns 0
Utils.stringSuspicionScore(
  "XoMFrxuRvgb6a7lip6uYd6sz13E4KooQYqiIL0ZQReukg8BqZwsjCeay"
); // returns 1
```

## Patterns

### commonStringPrefix(leftStr, rightStr): string | null

Get the common string prefix (at the start) pattern

```js
Patterns.commonStringPrefix("boo", "foo"); // null
Patterns.commonStringPrefix("bromance", "brother"); // "bro"
```

### commonStringSuffix(leftStr, rightStr): string | null

Get the common string suffixes (at the end) pattern.

```js
Patterns.commonStringSuffix("boo", "foo"); // oo
Patterns.commonStringSuffix("bromance", "brother"); // null
```

### commonHexadecimalPrefix(identifiersArray: string[])

Return the number of one time occurences of hexadecimal prefixes and an object containing the list of prefixes and the number of occurences in a given array of hexadecimals.

```js
Patterns.commonHexadecimalPrefix(["_0x33bb79", "foo", "_0x3c0c55", "_0x1185d5"]); // returns { oneTimeOccurence: 1, prefix: { _0x: 3 } }
```

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="https://github.com/NodeSecure/sec-literal/commits?author=fraxken" title="Code">💻</a> <a href="https://github.com/NodeSecure/sec-literal/commits?author=fraxken" title="Documentation">📖</a> <a href="https://github.com/NodeSecure/sec-literal/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a> <a href="#security-fraxken" title="Security">🛡️</a> <a href="https://github.com/NodeSecure/sec-literal/issues?q=author%3Afraxken" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/Rossb0b"><img src="https://avatars.githubusercontent.com/u/39910164?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nicolas Hallaert</b></sub></a><br /><a href="https://github.com/NodeSecure/sec-literal/commits?author=Rossb0b" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT
