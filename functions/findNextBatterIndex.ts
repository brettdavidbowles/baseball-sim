export default function findNextBatterIndex (currentIndex: number) {
  return currentIndex === 8 ? 0 : currentIndex + 1
}