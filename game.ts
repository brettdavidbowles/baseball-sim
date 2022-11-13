import halfInning from './halfInning'
import { Batter, Pitcher } from './classes'
import createRandomLineup from './functions/createRandomLineup'
import findNextBatterIndex from './functions/findNextBatterIndex'

const warlyWarlocks: Batter[] = createRandomLineup('test')
const warlyPitcher = new Pitcher('dan', 34, { strength: Math.random() * 100, luck: Math.random() * 100 })
const bzaBallers: Batter[] = createRandomLineup('test')
const bzaPitcher = new Pitcher('brett', 34, { strength: Math.random() * 100, luck: Math.random() * 100 })

export default function playBall(homeLineup: Batter[], homePitcher: Pitcher, awayLineup: Batter[], awayPitcher: Pitcher) {
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
  }
  let awayLineupPlace = 0
  let homeLineupPlace = 0
  // shitty var names?
  // a lot of nuance to add here, obv

  const statsArray : object[] = []
  while(scoreBoard.inning < 10 || scoreBoard.homeTeam.runs === scoreBoard.awayTeam.runs) {
    const awayBats = halfInning(awayLineup, awayLineupPlace, homePitcher)
    const homeBats = halfInning(homeLineup, homeLineupPlace, awayPitcher)
    scoreBoard.awayTeam.runs += awayBats.runs
    scoreBoard.awayTeam.hits += awayBats.hits
    scoreBoard.homeTeam.errors += awayBats.errors
    scoreBoard.homeTeam.runs += homeBats.runs
    scoreBoard.homeTeam.hits += homeBats.hits
    scoreBoard.awayTeam.errors += homeBats.errors
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
  return scoreBoard
}

console.log(playBall(bzaBallers, bzaPitcher, warlyWarlocks, warlyPitcher))