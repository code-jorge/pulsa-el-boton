module.exports = {
  parseDate: text=> {
    const [date, time] = text.split(" ", 2)
    const [day, month, year] = date.split("/", 3)
    const [hour, minutes] = time.split(":", 2)
    return new Date(year, month-1, day, hour, minutes)
  }
}