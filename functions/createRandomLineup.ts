import { Batter } from '../classes.js'
import { attributes } from '../constants/attributes'

export default function createRandomLineup(teamName: string) {
  const lineup : Batter[] = []
  for(let i=0; i<9; i++){
    const playerAttributes = attributes.map(attribute => ({
      name: attribute,
      level: Math.random() * 100
    }))
    lineup.push(new Batter(`${teamName} Player ${i + 1}`, Math.random() * 1000, playerAttributes))
  }
  return lineup
}