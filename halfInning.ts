import atBat from './atBat'
import { Batter, Pitcher } from './classes'
import createRandomLineup from './functions/createRandomLineup'
import findNextBatterIndex from './functions/findNextBatterIndex'

// errors will have to be figured at some point, low probability with variable for player attributes

const testBatter = new Batter('albert', 420, { strength: 50, luck: 50 })
const atBatOutcome = {
  hit: [ "single", "double", "triple", "homerun"],
  out: [ "fieldOut", "strikeOut" ],
  neitherHitOrOut: [ "hitByPitch", "walk" ]
}

const mappedHits = atBatOutcome.hit.map((x, index) => { return index + 1 })

// const randomLineup: Batter[] = createRandomLineup('test')
// const randomPitcher = new Pitcher('randy', 34, { strength: Math.random() * 100, luck: Math.random() * 100 })

export default function halfInning(lineUp: Batter[], placeInLineup: number, pitcher: Pitcher) {
  let currentBases = [false, false, false]
  let runs = 0
  let hits = 0
  let errors = 0
  let outs = 0
  // batter speed will come into play
  // currently this base running function only advances the players when it is forced... needs to be updated so players at first typically takes two bases if theres a double and with a variable for player speed
  // function runBases (currentBases: boolean[], hit: string) {
  function runBases (hit: string) {
    const hitNumber = atBatOutcome.hit.findIndex(x => x === hit)
    for (const [i, base] of currentBases.entries()) {
      if(base && i <= hitNumber){
        currentBases[i] = false
        i + hitNumber + 1 > 2 ? runs++ : currentBases[i + hitNumber + 1] = true
      }
    }
    hit === "homerun" ? runs++ : currentBases[hitNumber] = true
  }
  let placeInLineupCounter : number = placeInLineup
  // const findNextBatterIndex = (currentIndex: number) => {
  //   if(currentIndex === 8) return 0
  //   return currentIndex++
  // }
  while(outs < 3){
    const currentAtBat = atBat(lineUp[placeInLineupCounter], pitcher)
    switch(currentAtBat) {
      case "strikeOut":
        outs++
        placeInLineupCounter = findNextBatterIndex(placeInLineupCounter)
        break
      default:
        hits++
        placeInLineupCounter = findNextBatterIndex(placeInLineupCounter)
        runBases(currentAtBat)
        // obviously more scenarios here, i don't know why i did a switch statement it one in the morning and i think i'm cool
    }
  }
  return {
    runs: runs,
    hits: hits,
    errors: errors,
    placeInLineup: placeInLineupCounter
  }
}

// console.log(halfInning(randomLineup, 0, randomPitcher))