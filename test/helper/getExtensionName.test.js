const test = require('ava')
const getExtensionName = require('./../../src/helper/getExtensionName.js')

test('Return extension name', t => {
  const ext = getExtensionName('/home/tony/file.ext')
  t.is(ext, 'ext')
})

test('Return last extension name', t => {
  const ext = getExtensionName('/home/tony/file.txt.jpg.js.json.ext')
  t.is(ext, 'ext')
})

test('Return empty string if no extension provided', t => {
  const ext = getExtensionName('/home/tony/file')
  t.is(ext, '')
})

test('Return extension name if filename starts with .', t => {
  const ext = getExtensionName('.file.ext')
  t.is(ext, 'ext')
})

test('Return empty string if filename starts with . and with no extension name', t => {
  const ext = getExtensionName('.file')
  t.is(ext, '')
})

test('Return extension name if file comes from ./', t => {
  const ext = getExtensionName('./file.ext')
  t.is(ext, 'ext')
})

test('Return empty string if file ./ abd with no extension name', t => {
  const ext = getExtensionName('.file')
  t.is(ext, '')
})
