"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sluggingPercentageAttributes = exports.earnedRunAverageAttributes = exports.battingAverageAttributes = exports.attributes = void 0;
const attributes = [
    'strength', 'speed', 'endurance', 'composure', 'reflexes', 'intellect', 'willpower'
];
exports.attributes = attributes;
// make this list required as names for AttributeWeights
const battingAverageAttributes = [
    {
        name: 'composure',
        weight: .3,
    },
    {
        name: 'reflexes',
        weight: .7
    }
];
exports.battingAverageAttributes = battingAverageAttributes;
const earnedRunAverageAttributes = [
    {
        name: 'strength',
        weight: .3
    },
    {
        name: 'composure',
        weight: .4
    },
    {
        name: 'intellect',
        weight: .3
    }
];
exports.earnedRunAverageAttributes = earnedRunAverageAttributes;
const sluggingPercentageAttributes = [
    {
        name: 'strength',
        weight: 1
    }
];
exports.sluggingPercentageAttributes = sluggingPercentageAttributes;
