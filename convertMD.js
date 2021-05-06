const showdown = require('showdown')
const fs = require('fs')
const path = require('path')
const ncp = require('ncp').ncp

ncp.limit = 16

// copy images into /docs
ncp(path.join('assets', 'images'), path.join('docs', 'assets', 'images'), err => err ? console.log(err) : null)

// copy css into /docs
ncp(path.join('assets', 'template', 'css'), path.join('docs', 'css'), err => err ? console.log(err) : null)

const converter = new showdown.Converter()

const template = fs.readFileSync(path.join('assets', 'template', 'index.html'), 'utf8')

const insertIntoTemplate = (content, template) => {
  const attachmentPoint = 'id="content">'
  const [before, after] = template.split(attachmentPoint)
  return [before, attachmentPoint, content, after].join('')
}

const index = fs.readFileSync(path.join('markdown', './index.md'), 'utf8')
const html = insertIntoTemplate(converter.makeHtml(index), template)
fs.writeFileSync(path.join('docs', 'index.html'), html)

const views = fs.readdirSync(path.join('markdown')).filter(x => x !== 'index.md')

views.forEach(view => {
  const mdPath = path.join('markdown', view)
  const md = fs.readFileSync(mdPath, 'utf8')
  const html = insertIntoTemplate(converter.makeHtml(md), template)

  const outputPath = path.join('docs', view.split('.')[0] + '.html')
  fs.writeFileSync(outputPath, html)
})

