"use strict";

function commonStringStart(leftStr, rightStr) {
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

function commonPrefix(arr, sort = "high") {
    const sortedArr = arr.slice().filter((value) => typeof value === "string").map((value) => value.toLowerCase()).sort();
    const prefix = new Map();
    const sortingFn = sort === "high" ?
        (left, right) => right.commonPrefix.length - left.commonPrefix.length :
        (left, right) => left.commonPrefix.length - right.commonPrefix.length;

    mainLoop: for (const currentPrefix of sortedArr) {
        const matchedItems = [];
        if (!prefix.has(currentPrefix)) {
            matchedItems.push({ commonPrefix: currentPrefix, commonStr: null });
        }

        for (const commonPrefix of prefix.keys()) {
            const commonStr = commonStringStart(currentPrefix, commonPrefix);
            if (commonStr === null) {
                continue;
            }
            matchedItems.push({ commonPrefix, commonStr });
        }
        matchedItems.sort(sortingFn);

        for (const { commonPrefix, commonStr } of matchedItems) {
            if (commonStr === null) {
                break;
            }

            const count = prefix.get(commonPrefix);
            if (commonStr === commonPrefix || commonStr.startsWith(commonPrefix)) {
                prefix.set(commonPrefix, count + 1);
            }
            else if (commonPrefix.startsWith(commonStr)) {
                prefix.set(commonStr, count + 1);
            }
            continue mainLoop;
        }

        prefix.set(currentPrefix, 1);
    }

    for (const [key, value] of prefix.entries()) {
        if (value === 1) {
            prefix.delete(key);
        }
    }

    return Object.fromEntries(prefix);
}

module.exports = {
    commonStringStart,
    commonPrefix
};
