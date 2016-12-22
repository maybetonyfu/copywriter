const test = require('ava')
const proxyquire = require('proxyquire')

test('Pipe through a list of success tasks', t => {
  const rapidTemplate = proxyquire('../src/index.js',
    {
      './mapFromFileEntries.js': {},
      './mapFromDirEntries.js': {},
      './generatePayloads.js': {},
      './job/fileTemplateJob.js': {}
    })

  return rapidTemplate('foo')
        .then(result => {
          const expected = 'foo'
          const actual = result
          t.is(actual, expected)
        })
})
