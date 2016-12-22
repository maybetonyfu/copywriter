const test = require('ava')
const createOutputDir = require('./../../../src/job/task/createOutputDir.js')
const fs = require('fs-extra')

test.before('make temp folder', t => {
  fs.mkdirsSync('./tmp-createOutputDir/quz')
})

test('Create dir when not exists', t => {
  const payload = {
    sourceDir: './tmp-createOutputDir/foo',
    destinationDir: './tmp-createOutputDir/bar/quz/foo',
    sourceName: 'foo.tmpl',
    destinationName: 'bar.ext',
    vars: {
      monkey: 'harambe'
    },
    extensions: ['tmpl'],
    rawContent: '',
    interpolatedContent: ''
  }

  createOutputDir(payload)
        .then(payload => {
          const destinationExists = fs.existsSync(payload.destinationDir)
          t.true(destinationExists)
        })
})

test('Do nothing when dir exists', t => {
  const payload = {
    sourceDir: './tmp-createOutputDir/foo',
    destinationDir: './tmp-createOutputDir/quz',
    sourceName: 'foo.tmpl',
    destinationName: 'bar.ext',
    vars: {
      monkey: 'harambe'
    },
    extensions: ['tmpl'],
    rawContent: '',
    interpolatedContent: ''
  }

  createOutputDir(payload)
        .then(payload => {
          const destinationExists = fs.existsSync(payload.destinationDir)
          t.true(destinationExists)
        })
})

test.after('remove temp folder', t => {
  fs.removeSync('./tmp-createOutputDir')
})
