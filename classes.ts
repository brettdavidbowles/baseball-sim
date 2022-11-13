class Player {
  name: string
  id: number

  constructor(name: string, id: number) {
    this.name = name
    this.id = id
  }
}
interface BatterStats {
  strength: number,
  luck: number
}
interface PitcherStats {
  strength: number,
  luck: number
}
class Batter extends Player {
  stats: BatterStats
  constructor(name: string, id: number, stats: BatterStats) {
    super(name, id),
    this.stats = stats
  }
}
class Pitcher extends Player {
  stats: PitcherStats
  constructor(name: string, id: number, stats: PitcherStats) {
    super(name, id)
    this.stats = stats
  }
}

export { Player, BatterStats, PitcherStats, Batter, Pitcher}