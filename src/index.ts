#!/usr/bin/env node
import { Command } from 'commander'
import { createRequire } from 'module'
import createNextApp from './builder/createNextApp.js'
import createViteApp from './builder/createViteApp.js'
import { Framework } from './prompts/options.js'
import promptUser from './prompts/promptUser.js'
import installPM from './utils/installPM.js'

const require = createRequire(import.meta.url)
const packageJson = require('../package.json')

const program = new Command(packageJson.name)

program
    .description('Create a React project with auto setup')
    .version(
        packageJson.version,
        '-v, --version',
        `Output the current version of ${packageJson.name}`,
    )
    .action(main)

program.parse(process.argv)

async function main() {
    const { projectName, framework, settings } = await promptUser()

    try {
        if (settings.installPM) {
            await installPM(settings.packageManager)
        }

        switch (framework) {
            case Framework.NextJS:
                await createNextApp(projectName, settings)
                break
            case Framework.Vite:
                await createViteApp(projectName, settings)
        }

        process.exit(0)
    } catch (err) {
        console.log(`An error occurred while running React Forge: \n${err}`)
        process.exit(1)
    }
}
