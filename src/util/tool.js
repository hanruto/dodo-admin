import axios from 'axios'


export function toTwoDigits(number) {
  return (number + 100).toString().substr(-2, 2)
}
export function formatTimeNumber(number) {
  return (number + 100).toString().substr(1, 2)
}

export function getDay(date, split) {
  split = split || '/'
  date = new Date(date)

  return date.getFullYear() + split + formatTimeNumber((date.getMonth() + 1)) + split + formatTimeNumber(date.getDate())
}

export function getHour(date) {
  date = new Date(date)

  return `${date.getHours()}:${formatTimeNumber(date.getMinutes())}`
}

export function dateFormater(originDate, isShowHour, opt = {}) {
  const daySplit = opt.daySplit || '/'
  const hourSplit = opt.hourSplit || ':'
  let formatDate = getDay(originDate, daySplit)

  if (isShowHour) {
    const formatHour = getHour(originDate, hourSplit)
    formatDate = `${formatDate} - ${formatHour}`
  }

  return formatDate
}


export const hzhjNetwork = axios.create({
  baseURL: 'https://api.justdodo.cn/',
  headers: { 'vf': 'xiaohangogogo' },
  withCredentials: false,
})
