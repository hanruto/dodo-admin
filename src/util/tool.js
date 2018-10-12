import axios from 'axios'


export function dateFilter(date) {
  date = new Date(date)

  return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`
}

export const hzhjNetwork = axios.create({
  baseURL: 'https://api.justdodo.cn/',
  headers: { 'vf': 'xiaohangogogo' },
  withCredentials: false,
})

