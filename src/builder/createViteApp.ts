import fs from 'fs'
import { PackageManager, Settings } from '../prompts/options.js'
import runStep from '../utils/runStep.js'
import customStep from '../utils/customStep.js'
import getUninstallKeyword from '../utils/packageManager/getUninstallKeyword.js'
import getPrefixFlag from '../utils/packageManager/getPrefixFlag.js'
import getInstallKeyword from '../utils/packageManager/getInstallKeyword.js'

export default async function createViteApp(
    name: string,
    { typescript, eslint, packageManager, tailwind }: Settings,
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
                const eslintConfigPath = `${name}/eslint.config.js`

                await fs.unlinkSync(eslintConfigPath)
            },
            spinnerMessage: 'Removing ESLint config',
            successMessage: 'ESLint config removed',
        })
    }

    // Setup Tailwind
    if (tailwind) {
        // Install Tailwind packages
        await runStep({
            command: packageManager,
            args: [
                getInstallKeyword(packageManager),
                getPrefixFlag(packageManager),
                name,
                'tailwindcss',
                '@tailwindcss/vite',
            ],
            spinnerMessage: 'Installing Tailwind',
            successMessage: 'Tailwind installed',
        })

        // Add Tailwind plugin in Vite config
        await customStep({
            process: async () => {
                const viteConfigPath = `${name}/vite.config.${
                    typescript ? 'ts' : 'js'
                }`

                let viteConfig = await fs.readFileSync(viteConfigPath, 'utf8')

                viteConfig =
                    "import tailwindcss from '@tailwindcss/vite'\n" + viteConfig

                viteConfig = viteConfig.replace(
                    /plugins:\s*\[/,
                    (match) => `${match}tailwindcss(), `,
                )

                await fs.writeFileSync(viteConfigPath, viteConfig)
            },
            spinnerMessage: 'Updating Vite config',
            successMessage: 'Vite config updated',
        })

        // Add Tailwind import to index.css
        await customStep({
            process: async () => {
                const indexCssPath = `${name}/src/index.css`

                let indexCss = await fs.readFileSync(indexCssPath, 'utf-8')

                indexCss = '@import "tailwindcss";\n\n' + indexCss

                await fs.writeFileSync(indexCssPath, indexCss)
            },
            spinnerMessage: 'Adding Tailwind import into index css file',
            successMessage: 'Tailwind import added',
        })
    }

    await runStep({
        command: packageManager,
        args: [
            getInstallKeyword(packageManager),
            getPrefixFlag(packageManager),
            name,
        ],
        spinnerMessage: `Running ${packageManager} ${getInstallKeyword(
            packageManager,
        )}`,
        successMessage: `${packageManager} ${getInstallKeyword(
            packageManager,
        )} complete`,
    })
}
