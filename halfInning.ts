import atBat from './atBat'
import { Batter, Pitcher } from './classes'
import findNextBatterIndex from './functions/findNextBatterIndex'

// errors (player errors, not dev errors) will have to be figured at some point, low probability with variable for player attributes



export default function halfInning(lineUp: Batter[], placeInLineup: number, pitcher: Pitcher, atBats: number, inning: number) {
  let runnersOn : (false | Batter)[] = [false, false, false]
  let runs = 0
  let hits = 0
  let errors = 0
  let outs = 0
  let totalAtBats = atBats
  let atBatArray = []
  // batter speed will come into play
  // currently this base running function only advances the players when it is forced... needs to be updated so players at first typically takes two bases if theres a double and with a variable for player speed

  let placeInLineupCounter : number = placeInLineup
  while(outs < 3){
    const currentAtBat = atBat(lineUp[placeInLineupCounter], pitcher, totalAtBats, runnersOn)
    totalAtBats++
    atBatArray.push({gameAtBat: totalAtBats, ...currentAtBat, inning})
    switch(currentAtBat.outcome) {
      case "strikeOut":
        placeInLineupCounter = findNextBatterIndex(placeInLineupCounter)
        outs++
        break
      default:
        placeInLineupCounter = findNextBatterIndex(placeInLineupCounter)
        hits++
        runnersOn = [...currentAtBat.newRunnersOn]
        runs += currentAtBat.rbis
        // obviously more scenarios here, i don't know why i did a switch statement it one in the morning and i think i'm cool
    }
  }
  return {
    runs,
    hits,
    errors,
    placeInLineup: placeInLineupCounter,
    totalAtBats,
    atBatArray
  }
}