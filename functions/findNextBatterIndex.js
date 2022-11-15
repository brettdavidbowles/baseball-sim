"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findNextBatterIndex(currentIndex) {
    return currentIndex === 8 ? 0 : currentIndex + 1;
}
exports.default = findNextBatterIndex;
