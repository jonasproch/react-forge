import { spawn } from 'child_process'
import ora from 'ora'
import { Settings } from '../prompts/options.js'

export default function createNextApp(name: string, { typescript }: Settings) {
    const spinner = ora('Creating Next.js project').start()

    const flags = [
        '--no-tailwind',
        '--no-eslint',
        '--app',
        '--src-dir',
        '--turbopack',
        '--import-alias',
        '@/*',
        '--use-npm',
        typescript ? '--ts' : '--js',
    ]

    const child = spawn('npx', ['create-next-app@latest', name, ...flags])

    child.on('close', (code) => {
        if (code !== 0) {
            spinner.fail(`create-next-app exited with code ${code}`)
            return
        }

        spinner.succeed('Next.js app created successfully!')
    })
}
