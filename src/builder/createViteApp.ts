import fs from 'fs'
import { Settings } from '../prompts/options.js'
import runStep from '../utils/runStep.js'

export default async function createViteApp(
    name: string,
    { typescript, eslint, packageManager }: Settings,
) {
    const createViteAppFlags = [
        '--',
        `--template`,
        typescript ? 'react-ts' : 'react',
    ]

    await runStep({
        command: 'npm',
        args: ['create', 'vite@latest', name, ...createViteAppFlags],
        spinnerMessage: 'Creating Vite project',
        successMessage: 'Vite app created successfully!',
    })

    if (eslint) {
        const esLintTypescriptDependencies = typescript
            ? [
                  '@typescript-eslint/eslint-plugin@latest',
                  '@typescript-eslint/parser@latest',
              ]
            : []

        await runStep({
            command: 'npm',
            args: [
                'install',
                '--save-dev',
                'eslint@latest',
                '@eslint/js@latest',
                ...esLintTypescriptDependencies,
            ],
            spinnerMessage: "Installing ESLint and it's dependencies",
            successMessage: 'ESLint installed successfully!',
        })

        await runStep({
            command: 'touch',
            args: ['eslint.config.js'],
            spinnerMessage: 'Creating ESLint config',
            successMessage: 'ESLint config created successfully!',
        })
    }
}
