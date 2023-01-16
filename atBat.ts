import { AttributeWeight, Batter, Pitcher, Player } from './classes'
import { battingAverageAttributes, earnedRunAverageAttributes, sluggingPercentageAttributes } from './constants/attributes'
import randomPitchCount from './functions/randomPitchCount'
import runBases from './functions/runBases'
import { atBatOutcome } from './constants/atBatOutcome'

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
  // if(player instanceof Pitcher){
  //   console.log('piteceere attalkfas', appliedAttributes)
  // } else {
  //   console.log('batterhadf', appliedAttributes)
  // }
  const endurance = player.attributes.find(attribute => attribute.name === 'endurance')?.level || 0
  if(player instanceof Pitcher) {
    const pitcherFatigue = (1 - (endurance / 100)) * atBats / 200
    return appliedAttributes - pitcherFatigue > 0 ? appliedAttributes - pitcherFatigue : 0
  }
  return appliedAttributes
}

export default function atBat (batter: Batter, pitcher: Pitcher, atBats: number, runnersOn: (false | Batter)[]) {
  const random = Math.random()

  const batterAdvantage = findAttributesAndApplyWeight(batter, battingAverageAttributes, atBats)
  const pitcherAdvantage = findAttributesAndApplyWeight(pitcher, earnedRunAverageAttributes, atBats)
  const hitCalc = random - batterAdvantage + pitcherAdvantage
  let outcome
  let pitchCount
  if(hitCalc < .2) {
    const sluggingRandom = Math.random()
    const sluggingProbability = sluggingRandom * findAttributesAndApplyWeight(batter, sluggingPercentageAttributes, atBats)
    // randomness needs to be applied here
    // does this need a new random number? probably not, but maybe
    // check to make sure these are realistic
    pitchCount = randomPitchCount(false, false)
    if(sluggingProbability > .80) {
      outcome = "homerun"
    } else if(sluggingProbability > .65) {
      outcome = "triple"
    } else if(sluggingProbability > .50) {
      outcome = "double"
    } else {
      outcome = "single"
    }
  } else {
    pitchCount = randomPitchCount(true, false)
    outcome = "strikeOut"
  }
  const { strikes, balls } = pitchCount
  if(outcome !== "strikeOut"){
    const { newRunnersOn, runs: rbis } = runBases(outcome, batter, runnersOn)
    return {
      outcome,
      strikes,
      balls,
      rbis,
      newRunnersOn,
      // batter
    }
  } else {
    return {
      outcome,
      strikes,
      balls,
      rbis: 0,
      newRunnersOn: runnersOn
    }
  }
  // this will obviously need to support more options and the bulk of attribute influence will take place in this function
}
