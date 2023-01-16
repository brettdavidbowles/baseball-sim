import { atBatOutcome } from '../constants/atBatOutcome'
import { Batter } from '../classes'

export default function runBases (hit: string, runner: Batter, runnersOn: (false | Batter)[]) {
  console.log(atBatOutcome)
  const newRunnersOn = [...runnersOn]
  const hitNumber = atBatOutcome.hit.findIndex(x => x === hit)
  let runs = 0
  for (const [i, base] of newRunnersOn.entries()) {
    if(base && i <= hitNumber){
      newRunnersOn[i] = false
      i + hitNumber + 1 > 2 ? runs++ : newRunnersOn[i + hitNumber + 1] = runner
    }
  }
  hit === "homerun" ? runs++ : newRunnersOn[hitNumber] = runner
  return { newRunnersOn, runs }
}