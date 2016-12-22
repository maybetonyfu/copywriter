const test = require('ava')
const fs = require('fs-extra')
const writeInterpolatedFile = require('./../../../src/job/task/writeInterpolatedFile.js')

test.before('make temp folders', t => {
  fs.outputFileSync('./tmp-writeInterpolatedFile/bar/quz/foo/bar.ext', 'hello')
})

test('Write new content into old file', t => {
  const payload = {
    sourceDir: './tmp-readTemplateFile/foo',
    destinationDir: './tmp-writeInterpolatedFile/bar/quz/foo',
    sourceName: 'foo.tmpl',
    destinationName: 'bar.ext',
    vars: {
      monkey: 'harambe'
    },
    extensions: ['tmpl'],
    rawContent: '',
    interpolatedContent: 'harambe'
  }

  return writeInterpolatedFile(payload)
    .then(payload => {
      const expected = 'harambe'
      const actual = fs.readFileSync('./tmp-writeInterpolatedFile/bar/quz/foo/bar.ext', 'utf-8')
      t.is(actual, expected)
    })
})

test.after('remove temp folders', t => {
  fs.removeSync('./tmp-writeInterpolatedFile')
})
