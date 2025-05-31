import fs from 'fs'
import { Settings } from '../prompts/options.js'
import runStep from '../utils/runStep.js'
import writeFileStep from '../utils/writeFileStep.js'
import customStep from '../utils/customStep.js'

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
        successMessage: 'Vite app created',
    })

    if (eslint) {
        const esLintTypescriptDependencies = typescript
            ? ['typescript-eslint@latest', 'jiti@latest']
            : []

        await runStep({
            command: 'npm',
            args: [
                'install',
                '--save-dev',
                'eslint@latest',
                '@eslint/js@latest',
                'eslint-plugin-react@latest',
                ...esLintTypescriptDependencies,
            ],
            spinnerMessage: "Installing ESLint and it's dependencies",
            successMessage: 'ESLint installed',
        })

        const content = `import { defineConfig } from 'eslint/config'
        import js from '@eslint/js'
        ${typescript && "import ts from 'typescript-eslint'"}
        import react from 'eslint-plugin-react'

        export default defineConfig([
	        {
                files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
		        plugins: {
			        js,
                    ${typescript && 'ts,'}
                    react,
		        },
		        extends: [
                    'js/recommended',
                    ${typescript && "'ts/recommended',"}
                    'react/recommended',
                ],
	        },
        ])
        `

        await writeFileStep({
            file: `eslint.config.${typescript ? 'ts' : 'js'}`,
            content,
            spinnerMessage: 'Creating ESLint configuration',
            successMessage: 'ESLint configured',
        })

        await customStep({
            process: async () => {
                const filePath = `${name}/package.json`

                const fileContent = await fs.readFileSync(filePath, 'utf8')
                const packageJson = JSON.parse(fileContent)

                packageJson.scripts = {
                    ...(packageJson.scripts ?? {}),
                    lint: 'eslint',
                    'lint:fix': 'eslint --fix',
                }

                await fs.writeFileSync(filePath, JSON.stringify(packageJson))
            },
            spinnerMessage: 'Updating package.json',
            successMessage: 'package.json updated',
        })

        await runStep({
            command: 'npx',
            args: ['eslint', name],
            spinnerMessage: 'Linting project',
            successMessage: 'Lint rules applied',
        })
    }
}
