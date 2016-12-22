const test = require('ava')
const fs = require('fs-extra')

const mapFromDirEntries = require('./../src/mapFromDirEntries.js')

test.before('make temp folders', t => {
  fs.outputFileSync('./tmp-mapFromDirEntries/input/foo.tmpl', '')
  fs.outputFileSync('./tmp-mapFromDirEntries/input-deep/a/foo.tmpl', '')
  fs.outputFileSync('./tmp-mapFromDirEntries/input-deep/a/b/foo.tmpl', '')
  fs.outputFileSync('./tmp-mapFromDirEntries/input-deep/a/b/c/foo.tmpl', '')
  fs.outputFileSync('./tmp-mapFromDirEntries/input-illegal-ext/foo.tmpl', '')
  fs.outputFileSync('./tmp-mapFromDirEntries/input-illegal-ext/bar.tmpl1', '')
  fs.mkdirsSync('./tmp-readTemplateFile/output')
})

test('Pick up template file', t => {
  const config = {
    mappings: [
      ['./tmp-mapFromDirEntries/input', './tmp-mapFromDirEntries/output']
    ],
    extensions: ['tmpl']
  }

  const mapped = mapFromDirEntries(config)
  const expected = 1
  const actual = mapped.size
  t.is(actual, expected)
})

test('Ignore file with illegal extensions', t => {
  const config = {
    mappings: [
      ['./tmp-mapFromDirEntries/input-illegal-ext', './tmp-mapFromDirEntries/output']
    ],
    extensions: ['tmpl']
  }

  const mapped = mapFromDirEntries(config)
  const expected = 1
  const actual = mapped.size
  t.is(actual, expected)
})

test('Traverse deep folders', t => {
  const config = {
    mappings: [
      ['./tmp-mapFromDirEntries/input-deep', './tmp-mapFromDirEntries/output']
    ],
    extensions: ['tmpl']
  }

  const mapped = mapFromDirEntries(config)
  const expected = 3
  const actual = mapped.size
  t.is(actual, expected)
})

test.after('remove temp folder', t => {
  fs.removeSync('./tmp-mapFromDirEntries')
})
