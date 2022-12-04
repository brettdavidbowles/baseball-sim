"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_js_1 = require("../classes.js");
const attributes_1 = require("../constants/attributes");
function createRandomLineup(teamName) {
    const lineup = [];
    for (let i = 0; i < 9; i++) {
        const playerAttributes = attributes_1.attributes.map(attribute => ({
            name: attribute,
            level: Math.random() * 100
        }));
        lineup.push(new classes_js_1.Batter(`${teamName} Player ${i + 1}`, Math.random() * 1000, playerAttributes));
    }
    return lineup;
}
exports.default = createRandomLineup;
