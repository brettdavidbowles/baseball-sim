import atBat from './atBat'
import { Batter, Pitcher } from './classes'

// errors will have to be figured at some point, low probability with variable for player attributes

const testBatter = new Batter('albert', 420, { strength: 50, luck: 50 })
const testPitcher = new Pitcher('randy', 34, { strength: 50, luck: 50 })
const atBatOutcome = {
  hit: [ "single", "double", "triple", "homerun"],
  out: [ "fieldOut", "strikeOut" ],
  neitherHitOrOut: [ "hitByPitch", "walk" ]
}

const mappedHits = atBatOutcome.hit.map((x, index) => { return index + 1 })


let currentBases = []
let runs = 0
// batter speed will come into play
// currently this base running function only advances the players when it is forced... needs to be updated so players at first typically takes two bases if theres a double and with a variable for player speed
function runBases (currentBases: boolean[], hit: string) {
  const hitNumber = atBatOutcome.hit.findIndex(x => x === hit)
  for (const [i, base] of currentBases.entries()) {
    if(base && i <= hitNumber){
      currentBases[i] = false
      i + hitNumber + 1 > 2 ? runs++ : currentBases[i + hitNumber + 1] = true
    }
  }
  hit === "homerun" ? runs++ : currentBases[hitNumber] = true
  return currentBases
}

console.log(runBases(runBases(runBases(runBases([false, false, false], "single"), "double"), "homerun"), "single"))
console.log('runs', runs)