class Player {
  name: string
  id: number

  constructor(name: string, id: number) {
    this.name = name
    this.id = id
  }
}
// interface BatterStats {
//   strength: number,
//   luck: number
// }
// interface PitcherStats {
//   strength: number,
//   luck: number
// }

interface PlayerAttribute {
  name: string,
  level: number
}
interface AttributeWeight {
  name: string,
  weight: number
}
class Batter extends Player {
  attributes: PlayerAttribute[]
  constructor(name: string, id: number, attributes: PlayerAttribute[]) {
    super(name, id),
    this.attributes = attributes
  }
}
class Pitcher extends Player {
  attributes: PlayerAttribute[]
  constructor(name: string, id: number, attributes: PlayerAttribute[]) {
    super(name, id)
    this.attributes = attributes
  }
}

export { Player, PlayerAttribute, AttributeWeight, Batter, Pitcher}