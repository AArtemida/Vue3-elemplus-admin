import { MockMethod } from 'vite-plugin-mock'
import { UserInfo } from '../src/model/userModel'
import { titleCase } from '../src/utils/format'

const getUserList = {
  url: '/mock/getUserList',
  method: 'get',
  statusCode: 200,
  response: ({ query }: { query: any }) => {
    const { rows, start, role, search } = query
    // 返回的结果集
    let alls: UserInfo[] = []
    let list: UserInfo[] = []
    const total = 20

    for (let i = 0; i < total; i++) {
      let uRole: string = i < 4 ? 'admin' : 'user'
      let item: UserInfo = {
        userId: 'user' + i,
        username: titleCase(uRole) + i,
        role: uRole,
      }

      alls.push(item)
    }

    let filterRes = alls.filter((item: UserInfo) => {
      return (
        (!role || item.role === role) &&
        (!search ||
          item.username
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()))
      )
    })
    list = filterRes.slice(start, start + rows)

    return {
      code: 1,
      data: list,
      total: filterRes.length,
    }
  },
}
export default [getUserList] as MockMethod[]
