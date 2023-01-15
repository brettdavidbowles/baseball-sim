import halfInning from './halfInning'
import { Batter, Pitcher } from './classes'
import createRandomLineup from './functions/createRandomLineup'
import findNextBatterIndex from './functions/findNextBatterIndex'
import { attributes } from './constants/attributes'

const warlyWarlocks: Batter[] = createRandomLineup('Warly')
const warlyPitcher = new Pitcher('dan', 34, attributes.map(attribute => ({
      name: attribute,
      level: Math.random() * 100
    })))
const bzaBallers: Batter[] = createRandomLineup('BZA')
const bzaPitcher = new Pitcher('brett', 34, attributes.map(attribute => ({
      name: attribute,
      level: Math.random() * 100
    })))

export default function playBall(homeLineup: Batter[], homePitcher: Pitcher, awayLineup: Batter[], awayPitcher: Pitcher) {
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
  }
  let awayLineupPlace = 0
  let homeLineupPlace = 0
  // shitty var names?
  // a lot of nuance to add here, obv

  const statsArray : object[] = []
  while(scoreBoard.inning < 10 || scoreBoard.homeTeam.runs === scoreBoard.awayTeam.runs) {
    const awayBats = halfInning(awayLineup, awayLineupPlace, homePitcher, scoreBoard.awayTeam.atBats)
    const homeBats = halfInning(homeLineup, homeLineupPlace, awayPitcher, scoreBoard.homeTeam.atBats)
    scoreBoard.awayTeam.runs += awayBats.runs
    scoreBoard.awayTeam.hits += awayBats.hits
    scoreBoard.homeTeam.errors += awayBats.errors
    scoreBoard.awayTeam.atBats = awayBats.totalAtBats
    scoreBoard.homeTeam.runs += homeBats.runs
    scoreBoard.homeTeam.hits += homeBats.hits
    scoreBoard.awayTeam.errors += homeBats.errors
    scoreBoard.homeTeam.atBats = homeBats.totalAtBats
    awayLineupPlace = findNextBatterIndex(awayBats.placeInLineup)
    homeLineupPlace = findNextBatterIndex(homeBats.placeInLineup)
    // this is ugly...reeeeefactor?
    statsArray.push({
      inning: scoreBoard.inning,
      awayStats: awayBats,
      homeStats: homeBats
    })
    scoreBoard.inning++
  }
  console.log(statsArray)
  // need to put something in place so if it's in extra innings and the home team score the game ends
  return (({ homeTeam, awayTeam }) => ( {homeTeam, awayTeam }))(scoreBoard)
}

console.log(playBall(bzaBallers, bzaPitcher, warlyWarlocks, warlyPitcher))