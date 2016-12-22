const test = require('ava')
const proxyquire = require('proxyquire')

const aResolvedPromise = (payload) => Promise.resolve(payload)
const aRejectedPromise = () => Promise.reject('A tiny error')

test('Pipe through a list of success tasks', t => {
  const fileTemplateJob = proxyquire('../../src/job/fileTemplateJob.js',
    {
      './task/readTemplateFile.js': aResolvedPromise,
      './task/interpolateTemplateFile.js': aResolvedPromise,
      './task/writeInterpolatedFile.js': aResolvedPromise,
      './task/validateExtension.js': aResolvedPromise,
      './task/createOutputDir.js': aResolvedPromise
    })

  return fileTemplateJob('foo')
        .then(result => {
          const expected = 'foo'
          const actual = result
          t.is(actual, expected)
        })
})

test('Break if a task fails', t => {
  const fileTemplateJob = proxyquire('../../src/job/fileTemplateJob.js',
    {
      './task/readTemplateFile.js': aResolvedPromise,
      './task/interpolateTemplateFile.js': aResolvedPromise,
      './task/writeInterpolatedFile.js': aRejectedPromise,
      './task/validateExtension.js': aResolvedPromise,
      './task/createOutputDir.js': aResolvedPromise
    })

  return fileTemplateJob('foo')
        .catch(err => {
          const expected = 'A tiny error'
          const actual = err
          t.is(actual, expected)
        })
})
