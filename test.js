const fs = require('fs')
const path = require('path')
const test = require('brittle')
const tmp = require('test-tmp')
const standard = require('./index.js')

test('basic', async function (t) {
  const cwd = await tmp(t)
  const file = path.join(cwd, 'example.c')

  await fs.promises.writeFile(file, 'char* text = "Hello World!";')

  await standard.init({ cwd })

  t.is(await standard.check({ cwd, stdio: 'ignore' }), 1)

  t.is(await standard.check({ cwd, stdio: 'ignore' }), 1)

  t.is(await fs.promises.readFile(file, 'utf8'), 'char* text = "Hello World!";')

  t.is(await standard.fix({ cwd }), 0)

  t.is(await fs.promises.readFile(file, 'utf8'), 'char *text = "Hello World!";')

  t.is(await standard.check({ cwd }), 0)
})
