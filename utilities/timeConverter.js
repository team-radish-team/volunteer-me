const normalize = timeStr => {
  const hours = timeStr.slice(0, 2)
  const minutes = timeStr.slice(2, 5)

  let parsedHours = parseInt(hours)
  if (parsedHours > 12) {
    parsedHours -= 12
  }
  const parsedString = parsedHours.toString()
  return parsedString + minutes
}

export default normalize
