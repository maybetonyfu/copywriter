const test = require('ava')
const fs = require('fs-extra')

const mapFromFileEntries = require('./../src/mapFromFileEntries.js')

test.before('make temp folders', t => {
  fs.outputFileSync('./tmp-mapFromFileEntries/input/foo.tmpl', '')
  fs.outputFileSync('./tmp-mapFromFileEntries/input-illegal-ext/foo.tmpl', '')
  fs.outputFileSync('./tmp-mapFromFileEntries/input-illegal-ext/bar.tmpl1', '')
})

test('Pick up template file', t => {
  const config = {
    mappings: [
      ['./tmp-mapFromFileEntries/input/foo.tmpl', './tmp-mapFromFileEntries/output/foo']
    ],
    extensions: ['tmpl']
  }

  const mapped = mapFromFileEntries(config)
  const expected = 1
  const actual = mapped.size
  t.is(actual, expected)
})

test('Ignore file with illegal extensions', t => {
  const config = {
    mappings: [
      ['./tmp-mapFromFileEntries/input-illegal-ext/foo.tmpl', './tmp-mapFromFileEntries/output/foo'],
      ['./tmp-mapFromFileEntries/input-illegal-ext/bar.tmpl1', './tmp-mapFromFileEntries/output/bar']
    ],
    extensions: ['tmpl']
  }

  const mapped = mapFromFileEntries(config)
  const expected = 1
  const actual = mapped.size
  t.is(actual, expected)
})

test.after('remove temp folder', t => {
  fs.removeSync('./tmp-mapFromFileEntries')
})
