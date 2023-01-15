"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const atBat_1 = __importDefault(require("./atBat"));
const findNextBatterIndex_1 = __importDefault(require("./functions/findNextBatterIndex"));
// errors (player errors, not dev errors) will have to be figured at some point, low probability with variable for player attributes
const atBatOutcome = {
    hit: ["single", "double", "triple", "homerun"],
    out: ["fieldOut", "strikeOut"],
    neitherHitOrOut: ["hitByPitch", "walk"]
};
function halfInning(lineUp, placeInLineup, pitcher, atBats) {
    let currentBases = [false, false, false];
    let runs = 0;
    let hits = 0;
    let errors = 0;
    let outs = 0;
    let totalAtBats = atBats;
    // batter speed will come into play
    // currently this base running function only advances the players when it is forced... needs to be updated so players at first typically takes two bases if theres a double and with a variable for player speed
    function runBases(hit, runner) {
        const hitNumber = atBatOutcome.hit.findIndex(x => x === hit);
        for (const [i, base] of currentBases.entries()) {
            if (base && i <= hitNumber) {
                currentBases[i] = false;
                i + hitNumber + 1 > 2 ? runs++ : currentBases[i + hitNumber + 1] = runner;
            }
        }
        hit === "homerun" ? runs++ : currentBases[hitNumber] = runner;
    }
    let placeInLineupCounter = placeInLineup;
    while (outs < 3) {
        const currentAtBat = (0, atBat_1.default)(lineUp[placeInLineupCounter], pitcher, totalAtBats);
        totalAtBats++;
        switch (currentAtBat) {
            case "strikeOut":
                placeInLineupCounter = (0, findNextBatterIndex_1.default)(placeInLineupCounter);
                outs++;
                break;
            default:
                placeInLineupCounter = (0, findNextBatterIndex_1.default)(placeInLineupCounter);
                hits++;
                runBases(currentAtBat, lineUp[placeInLineupCounter]);
            // obviously more scenarios here, i don't know why i did a switch statement it one in the morning and i think i'm cool
        }
    }
    return {
        runs: runs,
        hits: hits,
        errors: errors,
        placeInLineup: placeInLineupCounter,
        totalAtBats
    };
}
exports.default = halfInning;
