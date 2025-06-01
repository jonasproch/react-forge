import fs from 'fs'
import { PackageManager, Settings } from '../prompts/options.js'
import runStep from '../utils/runStep.js'
import customStep from '../utils/customStep.js'
import getUninstallKeyword from '../utils/packageManager/getUninstallKeyword.js'
import getPrefixFlag from '../utils/packageManager/getPrefixFlag.js'

export default async function createViteApp(
    name: string,
    { typescript, eslint, packageManager }: Settings,
) {
    // Create Vite App flags
    const createViteAppFlags = [
        ...(packageManager === PackageManager.NPM ? ['--'] : []),
        `--template`,
        typescript ? 'react-ts' : 'react',
    ]

    // Create Vite App
    await runStep({
        command: packageManager,
        args: [
            'create',
            `vite${packageManager === PackageManager.NPM && '@latest'}`,
            name,
            ...createViteAppFlags,
        ],
        spinnerMessage: 'Creating Vite project',
        successMessage: 'Vite app created',
    })

    // ESLint is setup by default by Create Vite App
    // Remove ESLint from the project if user doesn't want it
    if (!eslint) {
        // Uninstall ESLint packages
        await runStep({
            command: packageManager,
            args: [
                getUninstallKeyword(packageManager),
                getPrefixFlag(packageManager),
                name,
                '@eslint/js',
                'eslint',
                'eslint-plugin-react-hooks',
                'eslint-plugin-react-refresh',
                ...(typescript ? ['typescript-eslint'] : []),
            ],
            spinnerMessage: 'Disabling ESLint',
            successMessage: 'ESLint disabled',
        })

        // Remove ESLint config
        await customStep({
            process: async () => {
                const configPath = `${name}/eslint.config.js`

                await fs.unlinkSync(configPath)
            },
            spinnerMessage: 'Removing ESLint config',
            successMessage: 'ESLint config removed',
        })
    }
}
