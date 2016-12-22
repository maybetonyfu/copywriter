const test = require('ava')
const validateExtension = require('./../../../src/job/task/validateExtension.js')

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
    rawContent: '',
    interpolatedContent: ''
  }

  return validateExtension(payload)
        .then(actual => {
          const expected = payload
          t.deepEqual(actual, expected)
        })
})

test('Throw error if ext name doesn\'t match', t => {
  const payload = {
    sourceDir: './tmp/foo',
    destinationDir: './tmp/bar/quz/foo',
    sourceName: 'foo.tmpl',
    destinationName: 'bar.ext',
    vars: {
      monkey: 'harambe'
    },
    extensions: ['tmpl'],
    rawContent: '',
    interpolatedContent: ''
  }

  const expected = 'File extension doesn\'t match'
  return validateExtension(payload)
    .catch(err => {
      const actual = err.message
      t.is(actual, expected)
    })
})
