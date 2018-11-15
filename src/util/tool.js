import axios from 'axios'


export function toTwoDigits(number){
  return (number + 100).toString().substr(-2, 2)
}

export function dateFilter(date, hasHour) {
  date = new Date(date)
  if (hasHour){
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${toTwoDigits(date.getHours())}:${toTwoDigits(date.getMinutes())}:${toTwoDigits(date.getSeconds())}`
  }

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

export const hzhjNetwork = axios.create({
  baseURL: 'https://api.justdodo.cn/',
  headers: { 'vf': 'xiaohangogogo' },
  withCredentials: false,
})
