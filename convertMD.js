const showdown = require('showdown')
const fs = require('fs')
const path = require('path')

const converter = new showdown.Converter()

const template = fs.readFileSync(path.join('_assets', 'template', 'index.html'), 'utf8')

const insertIntoTemplate = (content, template) => {
  const attachmentPoint = 'id="content">'
  const [before, after] = template.split(attachmentPoint)
  return [before, attachmentPoint, content, after].join('')
}

const index = fs.readFileSync(path.join('markdown', './index.md'), 'utf8')
const html = insertIntoTemplate(converter.makeHtml(index), template)
fs.writeFileSync(path.join('static', 'index.html'), html)

const views = fs.readdirSync(path.join('markdown', 'views'))

views.forEach(view => {
  const mdPath = path.join('markdown', 'views', view)
  const md = fs.readFileSync(mdPath, 'utf8')
  const html = insertIntoTemplate(converter.makeHtml(md), template)

  const outputPath = path.join('static', 'views', view.split('.')[0] + '.html')
  fs.writeFileSync(outputPath, html)
})

