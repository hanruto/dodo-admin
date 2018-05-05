export function dateFilter(date) {
    date = new Date(date);
    return date.getFullYear() + '年 ' + (date.getMonth() + 1) + '月 ' + date.getDay() + '日'
}

