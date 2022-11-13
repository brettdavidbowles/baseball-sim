"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const halfInning_1 = __importDefault(require("./halfInning"));
const classes_1 = require("./classes");
const createRandomLineup_1 = __importDefault(require("./functions/createRandomLineup"));
const findNextBatterIndex_1 = __importDefault(require("./functions/findNextBatterIndex"));
const warlyWarlocks = (0, createRandomLineup_1.default)('test');
const warlyPitcher = new classes_1.Pitcher('dan', 34, { strength: Math.random() * 100, luck: Math.random() * 100 });
const bzaBallers = (0, createRandomLineup_1.default)('test');
const bzaPitcher = new classes_1.Pitcher('brett', 34, { strength: Math.random() * 100, luck: Math.random() * 100 });
function playBall(homeLineup, homePitcher, awayLineup, awayPitcher) {
    let scoreBoard = {
        homeTeam: {
            runs: 0,
            hits: 0,
            errors: 0
        },
        awayTeam: {
            runs: 0,
            hits: 0,
            errors: 0
        },
        inning: 1
    };
    let awayLineupPlace = 0;
    let homeLineupPlace = 0;
    // shitty var names?
    // a lot of nuance to add here, obv
    const statsArray = [];
    while (scoreBoard.inning < 10 || scoreBoard.homeTeam.runs === scoreBoard.awayTeam.runs) {
        const awayBats = (0, halfInning_1.default)(awayLineup, awayLineupPlace, homePitcher);
        const homeBats = (0, halfInning_1.default)(homeLineup, homeLineupPlace, awayPitcher);
        scoreBoard.awayTeam.runs += awayBats.runs;
        scoreBoard.awayTeam.hits += awayBats.hits;
        scoreBoard.homeTeam.errors += awayBats.errors;
        scoreBoard.homeTeam.runs += homeBats.runs;
        scoreBoard.homeTeam.hits += homeBats.hits;
        scoreBoard.awayTeam.errors += homeBats.errors;
        awayLineupPlace = (0, findNextBatterIndex_1.default)(awayBats.placeInLineup);
        homeLineupPlace = (0, findNextBatterIndex_1.default)(homeBats.placeInLineup);
        // this is ugly...reeeeefactor?
        statsArray.push({
            inning: scoreBoard.inning,
            awayStats: awayBats,
            homeStats: homeBats
        });
        scoreBoard.inning++;
    }
    console.log(statsArray);
    return scoreBoard;
}
exports.default = playBall;
console.log(playBall(bzaBallers, bzaPitcher, warlyWarlocks, warlyPitcher));
