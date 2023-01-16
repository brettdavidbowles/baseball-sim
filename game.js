"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const halfInning_1 = __importDefault(require("./halfInning"));
const classes_1 = require("./classes");
const createRandomLineup_1 = __importDefault(require("./functions/createRandomLineup"));
const findNextBatterIndex_1 = __importDefault(require("./functions/findNextBatterIndex"));
const attributes_1 = require("./constants/attributes");
const warlyWarlocks = (0, createRandomLineup_1.default)('Warly');
const warlyPitcher = new classes_1.Pitcher('dan', 34, attributes_1.attributes.map(attribute => ({
    name: attribute,
    level: Math.random() * 100
})));
const bzaBallers = (0, createRandomLineup_1.default)('BZA');
const bzaPitcher = new classes_1.Pitcher('brett', 34, attributes_1.attributes.map(attribute => ({
    name: attribute,
    level: Math.random() * 100
})));
function playBall(homeLineup, homePitcher, awayLineup, awayPitcher) {
    let scoreBoard = {
        homeTeam: {
            runs: 0,
            hits: 0,
            errors: 0,
            atBats: 0
        },
        awayTeam: {
            runs: 0,
            hits: 0,
            errors: 0,
            atBats: 0
        },
        inning: 1
    };
    let awayLineupPlace = 0;
    let homeLineupPlace = 0;
    // shitty var names?
    // a lot of nuance to add here, obv
    const statsArray = [];
    const atBatArray = [];
    while (scoreBoard.inning < 10 || scoreBoard.homeTeam.runs === scoreBoard.awayTeam.runs) {
        const awayBats = (0, halfInning_1.default)(awayLineup, awayLineupPlace, homePitcher, scoreBoard.awayTeam.atBats, scoreBoard.inning);
        scoreBoard.awayTeam.runs += awayBats.runs;
        scoreBoard.awayTeam.hits += awayBats.hits;
        scoreBoard.awayTeam.atBats = awayBats.totalAtBats;
        scoreBoard.homeTeam.errors += awayBats.errors;
        awayLineupPlace = (0, findNextBatterIndex_1.default)(awayBats.placeInLineup);
        atBatArray.push(...awayBats.atBatArray);
        if (scoreBoard.inning < 9 || scoreBoard.homeTeam.runs === scoreBoard.awayTeam.runs) {
            const homeBats = (0, halfInning_1.default)(homeLineup, homeLineupPlace, awayPitcher, scoreBoard.homeTeam.atBats, scoreBoard.inning);
            scoreBoard.homeTeam.runs += homeBats.runs;
            scoreBoard.homeTeam.hits += homeBats.hits;
            scoreBoard.awayTeam.errors += homeBats.errors;
            scoreBoard.homeTeam.atBats = homeBats.totalAtBats;
            homeLineupPlace = (0, findNextBatterIndex_1.default)(homeBats.placeInLineup);
            statsArray.push({
                inning: scoreBoard.inning,
                awayRuns: scoreBoard.awayTeam.runs,
                homeTeamRuns: scoreBoard.homeTeam.runs
                // awayStats: awayBats,
                // homeStats: homeBats
            });
            // atbat count is wrong 1/15/23
            atBatArray.push(...homeBats.atBatArray);
        }
        else {
            statsArray.push({
                inning: scoreBoard.inning,
                // awayStats: awayBats
            });
        }
        scoreBoard.inning++;
    }
    scoreBoard.inning--;
    // need to put something in place so if it's in extra innings and the home team score the game ends
    // return (({ homeTeam, awayTeam, inning }) => ( {homeTeam, awayTeam, inning }))(scoreBoard)
    return { atBatArray, statsArray };
}
exports.default = playBall;
const { atBatArray, statsArray } = playBall(bzaBallers, bzaPitcher, warlyWarlocks, warlyPitcher);
// console.log(atBatArray, statsArray)
console.log('atBats', atBatArray);
console.log('stats', statsArray);
