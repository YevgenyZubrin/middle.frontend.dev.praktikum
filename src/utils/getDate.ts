const getDate = (date: Date): string => {
  const todayDate = new Date()

  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  const todayDay = todayDate.getDate()
  const todayMonth = todayDate.getMonth()
  const todayYear = todayDate.getFullYear()

  if (month === todayMonth && year === todayYear) {
    if (day === todayDay) {
      return 'сегодня'
    }
    if (day + 1 === todayDay) {
      return 'вчера'
    }
  }
  return `${day}.${month}.${year}`
}

export default getDate
