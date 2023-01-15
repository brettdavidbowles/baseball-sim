"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
const attributes_1 = require("./constants/attributes");
// move this shit to a constants file
const atBatOutcome = {
    hit: ["single", "double", "triple", "homerun"],
    out: ["fieldOut", "strikeOut"],
    neitherHitOrOut: ["hitByPitch", "walk"]
};
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
    if (player instanceof classes_1.Pitcher) {
        console.log('piteceere attalkfas', appliedAttributes);
    }
    else {
        console.log('batterhadf', appliedAttributes);
    }
    const endurance = ((_a = player.attributes.find(attribute => attribute.name === 'endurance')) === null || _a === void 0 ? void 0 : _a.level) || 0;
    if (player instanceof classes_1.Pitcher) {
        console.log(player.attributes.find(attribute => attribute.name === 'endurance'));
        console.log('endruandafad', 1 - (endurance / 100));
        const pitcherFatigue = (1 - (endurance / 100)) * atBats / 200;
        console.log('fatigue', pitcherFatigue);
        console.log(appliedAttributes - pitcherFatigue > 0 ? appliedAttributes - pitcherFatigue : 0);
        return appliedAttributes - pitcherFatigue > 0 ? appliedAttributes - pitcherFatigue : 0;
    }
    // const batterFatigue = ((1 - (endurance / 100)) * atBats) / 1800
    // console.log('batterfatigue', batterFatigue)
    // return appliedAttributes - batterFatigue > 0 ? appliedAttributes - batterFatigue : 0
    return appliedAttributes;
};
function atBat(batter, pitcher, atBats) {
    const random = Math.random();
    const batterAdvantage = findAttributesAndApplyWeight(batter, attributes_1.battingAverageAttributes, atBats);
    const pitcherAdvantage = findAttributesAndApplyWeight(pitcher, attributes_1.earnedRunAverageAttributes, atBats);
    const hitCalc = random - batterAdvantage + pitcherAdvantage;
    console.log('ba', batterAdvantage, 'pa', pitcherAdvantage, 'hc', hitCalc, 'random', random);
    if (hitCalc < .2) {
        console.log('slugging', findAttributesAndApplyWeight(batter, attributes_1.sluggingPercentageAttributes, atBats));
        const sluggingRandom = Math.random();
        const sluggingProbability = sluggingRandom * findAttributesAndApplyWeight(batter, attributes_1.sluggingPercentageAttributes, atBats);
        // randomness needs to be applied here
        // does this need a new random number? probably not, but maybe
        // check to make sure these are realistic
        if (sluggingProbability > .80)
            return "homerun";
        if (sluggingProbability > .65)
            return "triple";
        if (sluggingProbability > .50)
            return "double";
        return "single";
    }
    return "strikeOut";
    // this will obviously need to support more options and the bulk of attribute influence will take place in this function
}
exports.default = atBat;
