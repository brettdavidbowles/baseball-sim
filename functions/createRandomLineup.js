"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_js_1 = require("../classes.js");
function createRandomLineup(teamName) {
    const lineup = [];
    for (let i = 0; i < 9; i++) {
        lineup.push(new classes_js_1.Batter(`${teamName} Player ${i + 1}`, Math.random() * 1000, { strength: Math.random() * 100, luck: Math.random() * 100 }));
    }
    return lineup;
}
exports.default = createRandomLineup;
