export default function findNextBatterIndex (currentIndex: number) {
  if(currentIndex === 8) return 0
  return currentIndex++
}