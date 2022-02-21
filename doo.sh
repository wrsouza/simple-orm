#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const migrations = path.resolve(
  __dirname, 
  'src', 
  'database', 
  'migrations')
const seeds = path.resolve(
  __dirname, 
  'src', 
  'database',
  'seeds',
  'database.js')

function delay(seconds) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 1000 * seconds)
  })
}

async function createTables(files) {
  for (const file of files) {
    const table = require(path.join(migrations, file))
    table.up()
    await delay(0.5)
  }
  await delay(0.5)
  process.exit(0)
}

async function dropTables(files) {
  for (const file of files.reverse()) {
    const table = require(path.join(migrations, file))
    await table.down()
    await delay(1)
  }
  await delay(0.5)
  process.exit(0)
}

async function runSeeds(files) {
  for (const file of files) {
    await file.run()
    await delay(0.5)
  }
  await delay(0.5)
  process.exit(0)
}

if (process.argv.length > 2) {
  const argv = process.argv.pop().replace('-', '')

  if (argv === 'migration') {
    fs.readdir(
      migrations,
      (err, files) => {
        if (err) {
          console.log(err)
          return;
        }
        createTables(files)
      })
  } else if (argv === 'rollback') {
    fs.readdir(
      migrations,
      (err, files) => {
        if (err) {
          console.log(err)
          return
        }
        dropTables(files)
      })
  } else if (argv === 'seeds') {
    
    const databaseSeeder = require(seeds)
    runSeeds(databaseSeeder.handler())

  } else {
    console.log(`argument not exists`)
    process.exit(0)
  }
  
} else {
  console.log(`argument not defined`)
  process.exit(0)
}


