const test = require('ava')

const generatePayloads = require('./../src/generatePayloads.js')

test('Generate payloads', t => {
  const config = {
    mappings: [
      ['./tmp-generatePayloads/input/foo.tmpl', './tmp-mapFromFileEntries/output/foo'],
      ['./tmp-generatePayloads/input/bar.tmpl', './tmp-mapFromFileEntries/output/bar']
    ],
    extensions: ['tmpl'],
    vars: {
      monkey: 'harambe'
    }
  }

  const payloads = generatePayloads(config)
  const expected = 2
  const actual = payloads.length
  t.is(actual, expected)
})

test('Generate payloads with correct shape', t => {
  const config = {
    mappings: [
      ['./tmp-generatePayloads/input/foo.tmpl', './tmp-mapFromFileEntries/output/foo']
    ],
    extensions: ['tmpl'],
    vars: {
      monkey: 'harambe'
    }
  }

  const payloads = generatePayloads(config)
  t.true(payloads[0].hasOwnProperty('rawContent'))
  t.true(payloads[0].hasOwnProperty('interpolatedContent'))
  t.true(payloads[0].hasOwnProperty('sourceName'))
  t.true(payloads[0].hasOwnProperty('sourceDir'))
  t.true(payloads[0].hasOwnProperty('destinationName'))
  t.true(payloads[0].hasOwnProperty('destinationDir'))
  t.true(payloads[0].hasOwnProperty('extensions'))
  t.true(payloads[0].hasOwnProperty('vars'))
})
