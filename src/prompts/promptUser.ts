import { select, input, confirm } from '@inquirer/prompts'
import { Framework, PackageManager, Questions } from './options.js'

export default async function promptUser(): Promise<Questions> {
    const projectName = await input({ message: 'Enter name of your project' })

    const framework = await select<Framework>({
        message: 'Choose how you want to create your app',
        choices: [
            {
                name: 'Next.js',
                value: Framework.NextJS,
            },
            {
                name: 'Vite',
                value: Framework.Vite,
            },
        ],
    })

    const typescript = await confirm({
        message: 'Do you wish to use Typescript?',
    })

    let appRouter: boolean | null = null
    let srcDir: boolean | null = null
    let turbopack: boolean | null = null

    if (framework === Framework.NextJS) {
        appRouter = await confirm({
            message: 'Would you like to use the Next.js App Router?',
        })

        srcDir = await confirm({
            message: 'Would you like to initialize inside a "src/" directory?',
        })

        turbopack = await confirm({
            message: 'Would you like to use turbopack?',
        })
    }

    const packageManager = await select<PackageManager>({
        message: 'Choose what package manager you want to use',
        choices: [
            {
                name: 'npm',
                value: PackageManager.NPM,
            },
            {
                name: 'yarn',
                value: PackageManager.YARN,
            },
            {
                name: 'pnpm',
                value: PackageManager.PNPM,
            },
            {
                name: 'bun',
                value: PackageManager.BUN,
            },
        ],
    })

    const eslint = await confirm({
        message: 'Would you like to use ESLint?',
    })

    return {
        projectName,
        framework,
        settings: {
            typescript,
            eslint,
            packageManager,
            appRouter,
            srcDir,
            turbopack,
        },
    }
}
