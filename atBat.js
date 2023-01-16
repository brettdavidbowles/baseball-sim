"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
const attributes_1 = require("./constants/attributes");
const randomPitchCount_1 = __importDefault(require("./functions/randomPitchCount"));
const runBases_1 = __importDefault(require("./functions/runBases"));
// should probably have a way to weight stats, also, change the word stats to attributes or something
// attributes should probably be more weakly typed, probably just an array of objects with agnostic calculating. this way when you add one, it doesn't fuck up the model
const findAttributesAndApplyWeight = (player, attributeWeightObjects, atBats) => {
    var _a;
    const relevantAttributes = [];
    attributeWeightObjects.forEach(({ name, weight }) => {
        const playerAttribute = player.attributes.find(attribute => attribute.name === name);
        if (playerAttribute) {
            relevantAttributes.push(playerAttribute.level * weight);
        }
    });
    // the random should probably be pulled out of this but i gotta sleep
    // i pulled the random out but was tired then too so who the fuck knows
    const appliedAttributes = Object.values(relevantAttributes).reduce((a, b) => a + b, 0) / 100;
    // if(player instanceof Pitcher){
    //   console.log('piteceere attalkfas', appliedAttributes)
    // } else {
    //   console.log('batterhadf', appliedAttributes)
    // }
    const endurance = ((_a = player.attributes.find(attribute => attribute.name === 'endurance')) === null || _a === void 0 ? void 0 : _a.level) || 0;
    if (player instanceof classes_1.Pitcher) {
        const pitcherFatigue = (1 - (endurance / 100)) * atBats / 200;
        return appliedAttributes - pitcherFatigue > 0 ? appliedAttributes - pitcherFatigue : 0;
    }
    return appliedAttributes;
};
function atBat(batter, pitcher, atBats, runnersOn) {
    const random = Math.random();
    const batterAdvantage = findAttributesAndApplyWeight(batter, attributes_1.battingAverageAttributes, atBats);
    const pitcherAdvantage = findAttributesAndApplyWeight(pitcher, attributes_1.earnedRunAverageAttributes, atBats);
    const hitCalc = random - batterAdvantage + pitcherAdvantage;
    let outcome;
    let pitchCount;
    if (hitCalc < .2) {
        const sluggingRandom = Math.random();
        const sluggingProbability = sluggingRandom * findAttributesAndApplyWeight(batter, attributes_1.sluggingPercentageAttributes, atBats);
        // randomness needs to be applied here
        // does this need a new random number? probably not, but maybe
        // check to make sure these are realistic
        pitchCount = (0, randomPitchCount_1.default)(false, false);
        if (sluggingProbability > .80) {
            outcome = "homerun";
        }
        else if (sluggingProbability > .65) {
            outcome = "triple";
        }
        else if (sluggingProbability > .50) {
            outcome = "double";
        }
        else {
            outcome = "single";
        }
    }
    else {
        pitchCount = (0, randomPitchCount_1.default)(true, false);
        outcome = "strikeOut";
    }
    const { strikes, balls } = pitchCount;
    if (outcome !== "strikeOut") {
        const { newRunnersOn, runs: rbis } = (0, runBases_1.default)(outcome, batter, runnersOn);
        return {
            outcome,
            strikes,
            balls,
            rbis,
            newRunnersOn,
            // batter
        };
    }
    else {
        return {
            outcome,
            strikes,
            balls,
            rbis: 0,
            newRunnersOn: runnersOn
        };
    }
    // this will obviously need to support more options and the bulk of attribute influence will take place in this function
}
exports.default = atBat;
