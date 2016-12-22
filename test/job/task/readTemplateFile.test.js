const test = require('ava')
const fs = require('fs-extra')
const readTemplateFile = require('./../../../src/job/task/readTemplateFile.js')

test.before('make temp folders', t => {
  fs.outputFileSync('./tmp-readTemplateFile/foo/foo.tmpl', '{{ monkey }}')
})

test('Read template file if exists', t => {
  const payload = {
    sourceDir: './tmp-readTemplateFile/foo',
    destinationDir: './tmp-readTemplateFile/bar/quz/foo',
    sourceName: 'foo.tmpl',
    destinationName: 'bar.ext',
    vars: {
      monkey: 'harambe'
    },
    extensions: ['tmpl'],
    rawContent: '',
    interpolatedContent: ''
  }

  return readTemplateFile(payload)
    .then(payload => {
      const expected = '{{ monkey }}'
      const actual = payload.rawContent
      t.is(actual, expected)
    })
})

test('Throw error if file does not exist', t => {
  const payload = {
    sourceDir: './tmp-readTemplateFile/foo',
    destinationDir: './tmp-readTemplateFile/bar/quz/foo',
    sourceName: 'bar.tmpl',
    destinationName: 'bar.ext',
    vars: {
      monkey: 'harambe'
    },
    extensions: ['tmpl'],
    rawContent: '',
    interpolatedContent: ''
  }

  return readTemplateFile(payload)
    .catch(err => {
      const expected = 'ENOENT: no such file or directory, open \'tmp-readTemplateFile/foo/bar.tmpl\''
      const actual = err.message
      t.is(actual, expected)
    })
})

test.after('make temp folders', t => {
  fs.removeSync('./tmp-readTemplateFile')
})
