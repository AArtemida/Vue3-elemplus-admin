/*
 * @Description:
 * @Author: hy
 * @Date: 2022-05-26 16:18:15
 * @LastEditors: hy
 * @LastEditTime: 2022-05-26 16:19:00
 */
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 逐一导入您的mock.ts文件
// 如果使用vite.mock.config.ts，只需直接导入文件
// 可以使用 import.meta.glob功能来进行全部导入
import mockModule from './mock'

export function setupProdMockServer() {
  createProdMockServer([...mockModule])
}
