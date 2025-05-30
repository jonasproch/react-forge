import { spawn } from 'child_process'
import ora from 'ora'
import { Settings } from '../prompts/options.js'

export default function createViteApp(name: string, { typescript }: Settings) {
    const spinner = ora('Creating Vite project').start()

    const flags = ['--', `--template`, typescript ? 'react-ts' : 'react']

    const child = spawn('npm', ['create', 'vite@latest', name, ...flags])

    child.on('close', (code) => {
        if (code !== 0) {
            spinner.fail(`vite exited with code ${code}`)
            return
        }

        spinner.succeed('Vite app created successfully!')
    })
}
