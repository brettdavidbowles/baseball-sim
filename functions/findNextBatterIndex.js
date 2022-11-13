"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findNextBatterIndex(currentIndex) {
    if (currentIndex === 8)
        return 0;
    return currentIndex++;
}
exports.default = findNextBatterIndex;
