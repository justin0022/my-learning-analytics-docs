const showdown = require('showdown')
const fs = require('fs')
const path = require('path')

const converter = new showdown.Converter()

const viewsPath = ('./views')
const views = fs.readdirSync(viewsPath)

const staticPath = ('./static')

const index = fs.readFileSync('./index.md', 'utf8')
const html = converter.makeHtml(index)
fs.writeFileSync(path.join(staticPath, 'index.html'), html)

views.forEach(view => {
  const mdPath = path.join(viewsPath, view)
  const md = fs.readFileSync(mdPath, 'utf8')
  const html = converter.makeHtml(md)

  const outputPath = path.join(staticPath, 'views', view.split('.')[0] + '.html')
  fs.writeFileSync(outputPath, html)
})

