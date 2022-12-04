import { AttributeWeight } from "../classes"

const attributes : string[] = [
  'strength', 'speed', 'endurance', 'composure', 'reflexes', 'intellect', 'willpower'
]
// make this list required as names for AttributeWeights

const battingAverageAttributes : AttributeWeight[] = [
  {
    name: 'composure',
    weight: .3,
  },
  {
    name: 'reflexes',
    weight: .7
  }
]

const earnedRunAverageAttributes : AttributeWeight[] = [
  {
    name: 'strength',
    weight: .3
  },
  {
    name: 'composure',
    weight: .4
  },
  {
    name: 'intellect',
    weight: .3
  }
]

const sluggingPercentageAttributes : AttributeWeight[] = [
  {
    name: 'strength',
    weight: 1
  }
]
export {
  attributes,
  battingAverageAttributes,
  earnedRunAverageAttributes,
  sluggingPercentageAttributes
}