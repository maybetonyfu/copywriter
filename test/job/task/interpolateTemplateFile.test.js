const test = require('ava')
const interpolateTemplateFile = require('./../../../src/job/task/interpolateTemplateFile.js')

test('Interpolate legit variable', t => {
  const payload = {
    sourceDir: './tmp/foo',
    destinationDir: './tmp/bar/quz/foo',
    sourceName: 'foo.tmpl',
    destinationName: 'bar.ext',
    vars: {
      monkey: 'harambe'
    },
    extensions: ['tmpl'],
    rawContent: '{{ monkey }}',
    interpolatedContent: ''
  }

  interpolateTemplateFile(payload)
        .then(payload => {
          const expected = 'harambe'
          const actual = payload.interpolatedContent
          t.is(actual, expected)
        })
})

test('Throw error if template has undefined variable', t => {
  const payload = {
    sourceDir: './tmp/foo',
    destinationDir: './tmp/bar/quz/foo',
    sourceName: 'foo.tmpl',
    destinationName: 'bar.ext',
    vars: {
      monkey: 'harambe'
    },
    extensions: ['tmpl'],
    rawContent: '{{ cat }}',
    interpolatedContent: ''
  }

  return interpolateTemplateFile(payload)
    .catch(err => {
      const expected = 'cat is not defined'
      const actual = err.message
      t.is(actual, expected)
    })
})
