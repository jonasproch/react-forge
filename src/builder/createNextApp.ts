import { spawn } from 'child_process'
import ora from 'ora'

export default function createNextApp(name: string) {
    const spinner = ora('Creating Next.js project').start()

    const child = spawn('npx', [
        'create-next-app@latest',
        name,
        '--ts',
        '--yes',
    ])

    child.on('close', (code) => {
        if (code !== 0) {
            spinner.fail(`create-next-app exited with code ${code}`)
            return
        }

        spinner.succeed('Next.js app created successfully!')
    })
}
