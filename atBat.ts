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

const findAttributesAndApplyWeight = (player: Batter | Pitcher, attributeWeightObjects: AttributeWeight[], atBats: number) => {
  const relevantAttributes: number[] = []
  attributeWeightObjects.forEach(({ name, weight }) => {
    const playerAttribute = player.attributes.find(attribute => attribute.name === name)
    if(playerAttribute) {
      relevantAttributes.push( playerAttribute.level * weight )
    }
  })
  // the random should probably be pulled out of this but i gotta sleep
  // i pulled the random out but was tired then too so who the fuck knows
  const appliedAttributes = Object.values(relevantAttributes).reduce((a, b) => a + b, 0) / 100
  if(player instanceof Pitcher){
    console.log('piteceere attalkfas', appliedAttributes)
  } else {
    console.log('batterhadf', appliedAttributes)
  }
  const endurance = player.attributes.find(attribute => attribute.name === 'endurance')?.level || 0
  if(player instanceof Pitcher) {
    console.log(player.attributes.find(attribute => attribute.name === 'endurance'))
    console.log('endruandafad', 1 - (endurance / 100))
    const pitcherFatigue = (1 - (endurance / 100)) * atBats / 200
    console.log('fatigue', pitcherFatigue)
    console.log(appliedAttributes - pitcherFatigue > 0 ? appliedAttributes - pitcherFatigue : 0)
    return appliedAttributes - pitcherFatigue > 0 ? appliedAttributes - pitcherFatigue : 0
  }
  // const batterFatigue = ((1 - (endurance / 100)) * atBats) / 1800
  // console.log('batterfatigue', batterFatigue)
  // return appliedAttributes - batterFatigue > 0 ? appliedAttributes - batterFatigue : 0
  return appliedAttributes
}

export default function atBat (batter: Batter, pitcher: Pitcher, atBats: number) {
  const random = Math.random()

  const batterAdvantage = findAttributesAndApplyWeight(batter, battingAverageAttributes, atBats)
  const pitcherAdvantage = findAttributesAndApplyWeight(pitcher, earnedRunAverageAttributes, atBats)
  const hitCalc = random - batterAdvantage + pitcherAdvantage
  console.log('ba', batterAdvantage, 'pa', pitcherAdvantage, 'hc', hitCalc, 'random', random)
  if(hitCalc < .2) {
    console.log('slugging', findAttributesAndApplyWeight(batter, sluggingPercentageAttributes, atBats))
    const sluggingRandom = Math.random()
    const sluggingProbability = sluggingRandom * findAttributesAndApplyWeight(batter, sluggingPercentageAttributes, atBats)
    // randomness needs to be applied here
    // does this need a new random number? probably not, but maybe
    // check to make sure these are realistic
    if(sluggingProbability > .80) return "homerun"
    if(sluggingProbability > .65) return "triple"
    if(sluggingProbability > .50) return "double"
    return "single"
  }
  return "strikeOut"
  // this will obviously need to support more options and the bulk of attribute influence will take place in this function
}
