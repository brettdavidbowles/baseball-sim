"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const atBat_1 = __importDefault(require("./atBat"));
const findNextBatterIndex_1 = __importDefault(require("./functions/findNextBatterIndex"));
// errors (player errors, not dev errors) will have to be figured at some point, low probability with variable for player attributes
function halfInning(lineUp, placeInLineup, pitcher, atBats, inning) {
    let runnersOn = [false, false, false];
    let runs = 0;
    let hits = 0;
    let errors = 0;
    let outs = 0;
    let totalAtBats = atBats;
    let atBatArray = [];
    // batter speed will come into play
    // currently this base running function only advances the players when it is forced... needs to be updated so players at first typically takes two bases if theres a double and with a variable for player speed
    let placeInLineupCounter = placeInLineup;
    while (outs < 3) {
        const currentAtBat = (0, atBat_1.default)(lineUp[placeInLineupCounter], pitcher, totalAtBats, runnersOn);
        totalAtBats++;
        atBatArray.push(Object.assign(Object.assign({ gameAtBat: totalAtBats }, currentAtBat), { inning }));
        switch (currentAtBat.outcome) {
            case "strikeOut":
                placeInLineupCounter = (0, findNextBatterIndex_1.default)(placeInLineupCounter);
                outs++;
                break;
            default:
                placeInLineupCounter = (0, findNextBatterIndex_1.default)(placeInLineupCounter);
                hits++;
                runnersOn = [...currentAtBat.newRunnersOn];
                runs += currentAtBat.rbis;
            // obviously more scenarios here, i don't know why i did a switch statement it one in the morning and i think i'm cool
        }
    }
    return {
        runs,
        hits,
        errors,
        placeInLineup: placeInLineupCounter,
        totalAtBats,
        atBatArray
    };
}
exports.default = halfInning;
