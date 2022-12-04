import { AttributeWeight, Batter, Pitcher, Player } from './classes'
import { battingAverageAttributes, earnedRunAverageAttributes, sluggingPercentageAttributes } from './constants/attributes'

// move this shit to a constants file
const atBatOutcome = {
  hit: [ "single", "double", "triple", "homerun"],
  out: [ "fieldOut", "strikeOut" ],
  neitherHitOrOut: [ "hitByPitch", "walk" ]
}

// should probably have a way to weight stats, also, change the word stats to attributes or something
// attributes should probably be more weakly typed, probably just an array of objects with agnostic calculating. this way when you add one, it doesn't fuck up the model

const findAttributesAndApplyWeight = (player: Batter | Pitcher, attributeWeightObjects: AttributeWeight[], randomlyGeneratedNumber: number) => {
  const relevantAttributes: number[] = []
  attributeWeightObjects.forEach(({ name, weight }) => {
    const playerAttribute = player.attributes.find(attribute => attribute.name === name)
    if(playerAttribute) {
      relevantAttributes.push( playerAttribute.level * weight )
    }
  })
  return randomlyGeneratedNumber * ( Object.values(relevantAttributes).reduce((a, b) => a + b, 0) / 100 )
}

export default function atBat (batter: Batter, pitcher: Pitcher) {
  const random = Math.random()

  const batterAdvantage = findAttributesAndApplyWeight(batter, battingAverageAttributes, random)
  const pitcherAdvantage = findAttributesAndApplyWeight(pitcher, earnedRunAverageAttributes, random)
  const hitCalc = random - batterAdvantage + pitcherAdvantage
  if(hitCalc < .3) {
    const sluggingProbability = findAttributesAndApplyWeight(batter, sluggingPercentageAttributes, Math.random())
    // does this need a new random number? probably not, but maybe
    // check to make sure these are realistic
    if(sluggingProbability < .05) return "homerun"
    if(sluggingProbability < .15) return "triple"
    if(sluggingProbability < .25) return "double"
    return "single"
  }
  return "strikeOut"
  // this will obviously need to support more options and the bulk of attribute influence will take place in this function
}
