const got = require('got')
const swaggerTypescriptApi = require('swagger-typescript-api')
const path = require('path')
const fs = require('fs-extra')
const Eta = require('eta')
const { docSource, output, swaggerOption, apifoxOption, swaggerTypescriptApiOption, groupNameMap } = require('./config');

(async () => {
  if (docSource === 'swagger') {
    const docs = await getAllApi()
    clearRequestDir()
    // 只有一个分组.不做分组
    if (docs.length === 1 && docs[0]) {
      const item = { ...docs[0], name: '' }
      await generateApi(item)
    } else {
      await docs.filter(item => item.name !== 'external').reduce((resolve, item) => {
        return resolve.then(() => generateApi(item))
      }, Promise.resolve())
    }

  } else {
    await apifoxOption.projects.reduce(async (resolve, { name, url }) => {
      const data = await got(url, {
        parseJson: text => {
          const pareData = JSON.parse(text, (key, value) => key === '$ref' ? decodeURIComponent(value) : value);
          // fs.writeFileSync(path.resolve(__dirname, './api.json'), JSON.stringify(pareData))
          return pareData
        }
      }).json()
      return resolve.then(() => generateApi({ data, name, url }))
    }, Promise.resolve())
  }

  generateIndex()
})()

/**
 * 获取所有的接口
 * @returns
 */
async function getAllApi() {
  const { host, basePath = '' } = swaggerOption
  const swaggerResourceUrl = host + basePath + '/swagger-resources'

  const res = await got(swaggerResourceUrl).json() // 获取分组

  // 获取所有分组下面的接口
  const apidocs = await Promise.all(
    (res || []).map(async (item) => {
      const url = host + basePath + item.url
      let data
      try {
        data = await got(url).json()
      } catch (error) {
        console.log('接口文档有错误', url)
      }

      return { ...item, data }
    })
  )
  return apidocs
}

/** 生成api */
async function generateApi(data) {
  const { data: spec, name, url } = data
  if (!spec) {
    return
  }

  const dname = groupNameMap[name] || name

  try {

    console.log('生成', spec.host, url)
    const { files } = await swaggerTypescriptApi.generateApi({ ...swaggerTypescriptApiOption, spec })

    const destDir = path.resolve(output, dname || '')
    files.forEach(({ content, name }) => {
      fs.ensureDirSync(destDir)
      if (dname) {
        content = content.replace('"./instance"', '"../instance"')
      }
      fs.writeFileSync(path.resolve(destDir, name), content)
    })

    setTimeout(() => {
      fs.removeSync(path.join(destDir, 'http-client.ts'))
    })
  } catch (error) {
    console.error('生成', url, '失败')
  }
}

async function generateIndex() {
  let groups = fs
    .readdirSync(output)
    .filter((file) => {
      const stat = fs.statSync(path.resolve(output, file))
      return stat.isDirectory()
    })
    .reduce((result, dir) => {
      const files = fs
        .readdirSync(path.resolve(output, dir))
        .filter((file) => /^[A-Z].+\.ts/.test(file))
        .map((name) => [dir, path.basename(name, '.ts')])
      return result.concat(files)
    }, [])

  const indexTs = Eta.render(fs.readFileSync(path.resolve(__dirname, './index.eta')).toString(), { groups })
  fs.writeFileSync(path.resolve(output, 'index.ts'), indexTs)
}

function clearRequestDir() {
  fs.readdirSync(output).forEach((name) => {
    const file = path.resolve(output, name)
    const stat = fs.statSync(file)
    if (stat.isDirectory()) {
      fs.removeSync(file)
    } else if (['Admin.ts', 'API.ts', 'data-contracts.ts'].includes(name)) {
      fs.removeSync(file)
    }
  })
}
