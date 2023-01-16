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
  const atBatArray: object[] = []
  while(scoreBoard.inning < 10 || scoreBoard.homeTeam.runs === scoreBoard.awayTeam.runs) {
    const awayBats = halfInning(awayLineup, awayLineupPlace, homePitcher, scoreBoard.awayTeam.atBats, scoreBoard.inning)
    scoreBoard.awayTeam.runs += awayBats.runs
    scoreBoard.awayTeam.hits += awayBats.hits
    scoreBoard.awayTeam.atBats = awayBats.totalAtBats
    scoreBoard.homeTeam.errors += awayBats.errors
    awayLineupPlace = findNextBatterIndex(awayBats.placeInLineup)
    atBatArray.push(...awayBats.atBatArray)

    if(scoreBoard.inning < 9 || scoreBoard.homeTeam.runs === scoreBoard.awayTeam.runs) {
      const homeBats = halfInning(homeLineup, homeLineupPlace, awayPitcher, scoreBoard.homeTeam.atBats, scoreBoard.inning)
      scoreBoard.homeTeam.runs += homeBats.runs
      scoreBoard.homeTeam.hits += homeBats.hits
      scoreBoard.awayTeam.errors += homeBats.errors
      scoreBoard.homeTeam.atBats = homeBats.totalAtBats
      homeLineupPlace = findNextBatterIndex(homeBats.placeInLineup)
      statsArray.push({
        inning: scoreBoard.inning,
        awayRuns: scoreBoard.awayTeam.runs,
        homeTeamRuns: scoreBoard.homeTeam.runs

        // awayStats: awayBats,
        // homeStats: homeBats
      })
      // atbat count is wrong 1/15/23
      atBatArray.push(...homeBats.atBatArray)
    } else{
      statsArray.push({
        inning: scoreBoard.inning,
        // awayStats: awayBats
      })
    }
    scoreBoard.inning++
  }
  scoreBoard.inning--
  // need to put something in place so if it's in extra innings and the home team score the game ends
  // return (({ homeTeam, awayTeam, inning }) => ( {homeTeam, awayTeam, inning }))(scoreBoard)
  return { atBatArray, statsArray }
}
const { atBatArray, statsArray } = playBall(bzaBallers, bzaPitcher, warlyWarlocks, warlyPitcher)
// console.log(atBatArray, statsArray)
console.log('atBats', atBatArray)
console.log('stats', statsArray)