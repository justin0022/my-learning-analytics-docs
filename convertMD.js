const showdown = require('showdown')
const fs = require('fs')
const path = require('path')

const converter = new showdown.Converter()

const views = fs.readdirSync(path.join('markdown', 'views'))

const index = fs.readFileSync(path.join('markdown', './index.md'), 'utf8')
const html = converter.makeHtml(index)
fs.writeFileSync(path.join('static', 'index.html'), html)

views.forEach(view => {
  const mdPath = path.join('markdown', 'views', view)
  const md = fs.readFileSync(mdPath, 'utf8')
  const html = converter.makeHtml(md)

  const outputPath = path.join('static', 'views', view.split('.')[0] + '.html')
  fs.writeFileSync(outputPath, html)
})

