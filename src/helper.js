export function convertTime(time) {
  let d = new Date(time)
  let c = new Date()
  let result = (d.getHours() < 10 ? "0" : "") + d.getHours() + ":"
  result += (d.getMinutes() < 10 ? "0" : "") + d.getMinutes()
  if (c.getDay() !== d.getDay()) {
    result = d.getDay() + "/" + d.getMonth() + " " + result
  }
  return result
}