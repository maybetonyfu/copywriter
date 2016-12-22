#! /usr/bin/env node

const yargs = require('yargs')
const fs = require('fs-extra')

const rapidTemplate = require('./src')

const configCommandOption = {
  f: {
    alias: 'config-file',
    coerce: file => JSON.parse(fs.readFileSync(file, 'utf8')),
    demand: true,
    describe: 'Provide a config file. Supported format: JSON',
    nargs: 1
  }
}

const args = yargs
    .usage('Usage: rapid-template [options]')
    .options(configCommandOption)
    .argv

rapidTemplate(args.f)
