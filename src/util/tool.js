import axios from 'axios'


export function toTwoDigits(number){
  return (number + 100).toString().substr(-2, 2)
}

export function dateFilter(date, hasHour) {
  date = new Date(date)
  if (hasHour){
    return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日 ${toTwoDigits(date.getHours())}:${toTwoDigits(date.getMinutes())}:${toTwoDigits(date.getSeconds())}`
  }

  return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`
}

export const hzhjNetwork = axios.create({
  baseURL: 'https://api.justdodo.cn/',
  headers: { 'vf': 'xiaohangogogo' },
  withCredentials: false,
})
