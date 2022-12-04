"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attributes_1 = require("./constants/attributes");
// move this shit to a constants file
const atBatOutcome = {
    hit: ["single", "double", "triple", "homerun"],
    out: ["fieldOut", "strikeOut"],
    neitherHitOrOut: ["hitByPitch", "walk"]
};
// should probably have a way to weight stats, also, change the word stats to attributes or something
// attributes should probably be more weakly typed, probably just an array of objects with agnostic calculating. this way when you add one, it doesn't fuck up the model
const findAttributesAndApplyWeight = (player, attributeWeightObjects, randomlyGeneratedNumber) => {
    const relevantAttributes = [];
    attributeWeightObjects.forEach(({ name, weight }) => {
        const playerAttribute = player.attributes.find(attribute => attribute.name === name);
        if (playerAttribute) {
            relevantAttributes.push(playerAttribute.level * weight);
        }
    });
    return randomlyGeneratedNumber * (Object.values(relevantAttributes).reduce((a, b) => a + b, 0) / 100);
};
function atBat(batter, pitcher) {
    const random = Math.random();
    const batterAdvantage = findAttributesAndApplyWeight(batter, attributes_1.battingAverageAttributes, random);
    console.log('test', findAttributesAndApplyWeight(batter, attributes_1.battingAverageAttributes, random));
    console.log('ba', batterAdvantage);
    const pitcherAdvantage = findAttributesAndApplyWeight(pitcher, attributes_1.earnedRunAverageAttributes, random);
    const hitCalc = random - batterAdvantage + pitcherAdvantage;
    console.log('hc', hitCalc);
    if (hitCalc < .3) {
        const sluggingProbability = findAttributesAndApplyWeight(batter, attributes_1.sluggingPercentageAttributes, Math.random());
        // does this need a new random number? probably not, but maybe
        // check to make sure these are realistic
        if (sluggingProbability < .05)
            return "homerun";
        if (sluggingProbability < .15)
            return "triple";
        if (sluggingProbability < .25)
            return "double";
        return "single";
    }
    return "strikeOut";
    // this will obviously need to support more options and the bulk of attribute influence will take place in this function
}
exports.default = atBat;
