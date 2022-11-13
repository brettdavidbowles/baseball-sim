import { Batter, Pitcher } from './classes'

// move this shit to a constants file
const atBatOutcome = {
  hit: [ "single", "double", "triple", "homerun"],
  out: [ "fieldOut", "strikeOut" ],
  neitherHitOrOut: [ "hitByPitch", "walk" ]
}


const testBatter = new Batter('albert', 420, { strength: 50, luck: 50 })
const testPitcher = new Pitcher('randy', 34, { strength: 50, luck: 50 })
// should probably have a way to weight stats, also, change the word stats to attributes or something
// attributes should probably be more weakly typed, probably just an array of objects with agnostic calculating. this way when you add one, it doesn't fuck up the model


export default function atBat (batter: Batter, pitcher: Pitcher) {
  const random = Math.random()

  const batterAdvantage = random * ( Object.values(batter.stats).reduce((a, b) => a + b, 0) / ( 100 * Object.values(batter.stats).length ))
  const pitcherAdvantage = random * ( Object.values(pitcher.stats).reduce((a, b) => a + b, 0) / ( 100 * Object.values(pitcher.stats).length ))
  const hitCalc = random - batterAdvantage + pitcherAdvantage
  if(hitCalc < .3) {
    const sluggingRandom = Math.random()
    if(sluggingRandom < .05) return "homerun"
    if(sluggingRandom < .15) return "triple"
    if(sluggingRandom < .25) return "double"
    return "single"
  }
  return "strikeOut"
  // this will obviously need to support more options and the bulk of attribute influence will take place in this function
}
