#!/usr/bin/env node

const semver = require('semver')
const requiredVersion = require('../package.json').engines.node

if (!semver.satisfies(process.version, requiredVersion)) {
  console.error(
    `You are using Node ${process.version}, but easy-cli-service ` +
    `requires Node ${requiredVersion}.\n请升级你的Node版本.`
  )
  process.exit(1)
}

const Service = require('../lib/Service')
const service = new Service()

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv, {
  boolean: [
    'batch'
  ]
})
const command = args._[0]
service.run(command, args, rawArgv)
