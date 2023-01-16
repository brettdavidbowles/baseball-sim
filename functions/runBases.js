"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atBatOutcome_1 = require("../constants/atBatOutcome");
function runBases(hit, runner, runnersOn) {
    console.log(atBatOutcome_1.atBatOutcome);
    const newRunnersOn = [...runnersOn];
    const hitNumber = atBatOutcome_1.atBatOutcome.hit.findIndex(x => x === hit);
    let runs = 0;
    for (const [i, base] of newRunnersOn.entries()) {
        if (base && i <= hitNumber) {
            newRunnersOn[i] = false;
            i + hitNumber + 1 > 2 ? runs++ : newRunnersOn[i + hitNumber + 1] = runner;
        }
    }
    hit === "homerun" ? runs++ : newRunnersOn[hitNumber] = runner;
    return { newRunnersOn, runs };
}
exports.default = runBases;
