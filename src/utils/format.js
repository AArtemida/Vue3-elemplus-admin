/*
 * @Description:
 * @Author: hy
 * @Date: 2022-03-01 09:42:12
 * @LastEditors: hy
 * @LastEditTime: 2022-03-01 09:42:47
 */
/* 数字转千分位 */
export function formatNumber(num) {
  if (num !== null) {
    return num.toString().replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
      return s + ','
    })
  }

}
/* 首字母大写 */
export function titleCase(str) {
  let newStr = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
  return newStr
}