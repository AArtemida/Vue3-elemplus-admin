/*
 * @Description:
 * @Author: hy
 * @Date: 2022-02-23 15:07:46
 * @LastEditors: hy
 * @LastEditTime: 2022-02-23 15:07:46
 */
export default function replaceMail(html) {
  // 所有邮箱替换
  let mailReg1 = /<[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)>/gi
  if(html) {
    let mails = html.match(mailReg1)
    if (mails && mails.length) {
      mails.forEach(mail => {
        mail = mail
          .replace(/<em.*?em>/gi, '')
          .replace(/<div.*?div>/gi, '')
          .replace(/<span.*?span>/gi, '')
          .replace(/<p.*?p>/gi, '')
          .replace(/".*?"/g, '')
        if (mail) {
          let mailStr = mail.replace('<', '').replace('>', '')
          let emailReg = new RegExp('(' + mail + '){1}', 'gi')
          html = html.replace(emailReg, `&lt;${mailStr}&gt;`)
        }
      })
    }
  }
  return html || ''
}