export const msToTime = (duration: number) => {
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
