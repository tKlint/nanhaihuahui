/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-03-29 13:54:45
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-10-13 20:33:34
 * @FilePath: \weimob\nanhai-webapp\script\convertRoutes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable no-console */
/* eslint-disable id-length */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const parser = require('@babel/parser')
// const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

const code = fs.readFileSync(path.join(__dirname, '../src/app.config.ts')).toString()
const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: [
    // enable jsx and flow syntax
    // 'jsx',
    'typescript'
  ]
})


const output = generate(ast, { comments: false, compact: true }, code)
console.log(output.code.replace('export default', ''), 'pppp');
process.exit(0);
eval(`function _getRouteName() { return ${output.code.replace('export default', '')} }`)
console.log(_getRouteName, '_getRouteName')
// eslint-disable-next-line no-undef
generateRoute(_getRouteName())

function generateRoute(config) {
  const { pages, subPackages = [] } = config

  let routes = pages.map((item) => '/' + item)

  const { list = [] } = config.tabBar || {}

  const tabBar = config.tabBar?.list?.map((item) => ({ url: '/' + item.pagePath })) || []

  routes = routes.concat(
    subPackages.reduce((count, item) => {
      return count.concat((item.pages || []).map((page) => path.join('/', item.root, page).replace(/\\/g, '/')))
    }, [])
  )

  const routeNames = routes.reduce((obj, route) => {
    const routeName = route
      .split('/')
      .filter((item) => !!item)
      .filter((item, index, array) => index !== 0 && index !== array.length - 1)
      .reduce((count, item, index) => {
        const name = item.replace(/-([a-z])/g, (m, p) => p.toUpperCase())
        return index === 0 ? count + name : count + name.replace(/^./, (m) => m.toUpperCase())
      }, '')

    obj[routeName] = route

    return obj
  }, {})

  // console.log(routes, routeNames)

  let text = `
/**
 * 页面路由映射.
 * 请不要在此文件添加任何代码。因为生成后会全量覆盖
 * 运行 npm run route 或者 yarn route 自动生成
 */
`
  text +=
    'export const routeNames = ' +
    JSON.stringify(routeNames, undefined, 2)
      .replace(/"(.+)":/g, `$1:`)
      .replace(/: "(.+)"/g, `: '$1'`)
  text += '\n\n'
  if (tabBar.length) {
    text +=
      `export const tabbar = ` +
      JSON.stringify(tabBar, undefined, 2)
        .replace(/"(.+)":/g, `$1:`)
        .replace(/: "(.+)"/g, `: '$1'`)
  }

  fs.writeFileSync(path.join(__dirname, '../src/routes.ts'), text)
}

// const config = eval(`(${code.replace('export default ')})`)
// generateRoute(appConfig)
