"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const atBat_1 = __importDefault(require("./atBat"));
const classes_1 = require("./classes");
const testBatter = new classes_1.Batter('albert', 420, { strength: 50, luck: 50 });
const testPitcher = new classes_1.Pitcher('randy', 34, { strength: 50, luck: 50 });
const atBatOutcome = {
    hit: ["single", "double", "triple", "homerun"],
    out: ["fieldOut", "strikeOut"],
    neitherHitOrOut: ["hitByPitch", "walk"]
};
const mappedHits = atBatOutcome.hit.map((x, index) => { return index + 1; });
console.log('maphits', mappedHits);
console.log('atbat', (0, atBat_1.default)(testBatter, testPitcher));
let currentBases = [];
let runs = 0;
// batter speed will come into play
function runBases(currentBases, hit) {
    const hitNumber = atBatOutcome.hit.findIndex(x => x === hit);
    for (const [i, base] of currentBases.entries()) {
        console.log('base', hitNumber);
        if (base && i <= hitNumber) {
            console.log(hitNumber);
            currentBases[i] = false;
            i + hitNumber + 1 > 2 ? runs++ : currentBases[i + hitNumber + 1] = true;
        }
    }
    hit === "homerun" ? runs++ : currentBases[hitNumber] = true;
    return currentBases;
}
console.log(runBases(runBases(runBases(runBases([false, false, false], "single"), "double"), "homerun"), "single"));
console.log('runs', runs);
