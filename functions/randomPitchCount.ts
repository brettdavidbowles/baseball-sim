export default function randomPitchCount(isStrikeout: boolean, isWalk: boolean) {
  const strikesRandom = Math.random()
  const ballsRandom = Math.random()
  let ballCount
  if(ballsRandom < .25){
    ballCount = 0
  } else if(ballsRandom < .5){
    ballCount = 1
  } else if(ballsRandom < .75){
    ballCount = 2
  } else {
    ballCount = 3
  }
  let strikeCount
  if(strikesRandom < .1){
    strikeCount = 0
  } else if(strikesRandom < .5) {
    strikeCount = 1
  } else {
    strikeCount = 2
  }
  return {
    strikes: isStrikeout ? 3 : strikeCount,
    balls: isWalk ? 4 : ballCount
  }
}