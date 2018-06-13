'use strict'

const debug = require('debug')('platziverse:db:setup')
const db = require('./')
const inquirer = require('inquirer')
const chalk = require('chalk')

const prompt = inquirer.createPromptModule()

async function setup () {
	const answer = await prompt([
		{
			type: 'confirm',
			name: 'setup',
			message: 'Esto va a destruir su base de datos, ¿Estás seguro?'
		}
	])

	if (!answer.setup) {
		return console.log('good :)');
	}

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'admin123',
    host: process.env.DB_HOST || 'localhost',
    logging: s => debug(s),
		dialect: 'postgres',
		setup: true
  }
  await db(config).catch(handleFatalError)

  console.log('Success')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red(['fatal error'])} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
