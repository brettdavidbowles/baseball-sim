import { Batter } from '../classes.js'

export default function createRandomLineup(teamName: string) {
  const lineup : Batter[] = []
  for(let i=0; i<9; i++){
    lineup.push(new Batter(`${teamName} Player ${i + 1}`, Math.random() * 1000, { strength: Math.random() * 100, luck: Math.random() * 100 }))
  }
  return lineup
}