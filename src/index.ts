import fs from 'fs'
import { program } from 'commander'
import chalk from 'chalk'
import prompts from 'prompts'
import type { PromptObject } from 'prompts'
import { commonExec, commonHandleCallback } from './utils'

const questions: Array<PromptObject<string>> = [
  {
    type: 'text',
    name: 'title',
    message: 'What\'s your file name?',
  },
  {
    type: 'multiselect',
    name: 'contents',
    message: 'wirte your file contents',
    choices: [
      { title: 'Red', value: '#ff0000' },
      { title: 'Green', value: '#00ff00' },
      { title: 'Blue', value: '#0000ff' },
    ],
  },
]

program
  .option('-s, --start <start>', 'file start')
  .description('description')
  .command('create')
  .action(createFile)

program
  .option('-d, --del <del>', 'file delete')
  .description('description')
  .command('del')
  .action(deleteFile)

program.parse(process.argv)

const green = chalk.green
const warning = chalk.yellow

async function createFile() {
  const options = program.opts()
  console.log('options', options)
  const res = await showOptions()
  console.log('res', res)
  fs.writeFileSync(`./${res.title}.txt`, res.contents.join(','))
}

async function showOptions() {
  const onSubmit = (prompt: PromptObject, answer: any) => {
    console.log(green(`Thanks I got ${answer} from ${prompt.name}`))
  }
  const onCancel = () => {
    console.log(warning('Never stop prompting!'))
    return true
  }
  const response = await prompts(questions, { onSubmit, onCancel })
  return response
}

async function deleteFile() {
  const options = program.opts()
  console.log('options', options)
  // fs.rmSync(`./${options.del}`)
  const a = await checkout()
  console.log(a)
}

function checkout() {
  return new Promise((resolve, reject) => {
    commonExec('git checkout main', commonHandleCallback(resolve, reject))
  })
}
