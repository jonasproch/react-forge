import { select, input, confirm } from '@inquirer/prompts'
import { Framework, PackageManager, Questions } from './options.js'
import checkPMInstallation from '../utils/checkPMInstallation.js'

export default async function promptUser(): Promise<Questions> {
    let projectName = await input({ message: 'Enter the name of your project (leave empty to use current folder)' })

    // Set current folder to use as path to project
    if (projectName.trim() === '') {
        projectName = '.'
    }

    const framework = await select<Framework>({
        message: 'Choose how you want to create your app',
        choices: [
            {
                name: 'Vite',
                value: Framework.Vite,
            },
            {
                name: 'Next.js',
                value: Framework.NextJS,
            },
        ],
    })

    const typescript = await confirm({
        message: 'Do you wish to use Typescript?',
    })

    let appRouter: boolean | null = null
    let srcDir: boolean | null = null
    let turbopack: boolean | null = null

    // Next.js specific prompts
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

    let packageManager = await select<PackageManager>({
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
                name: 'pnpm (Disabled until fully tested)',
                value: PackageManager.PNPM,
                // Disabled until properly tested
                disabled: true,
            },
            {
                name: 'bun (Disabled until fully tested)',
                value: PackageManager.BUN,
                // Disabled until properly tested
                disabled: true,
            },
        ],
    })

    let installPM: boolean | null = null

    // Check if chosen package manager is installed
    // If not offer to install it
    if (!(await checkPMInstallation(packageManager))) {
        installPM = await confirm({
            message:
                'The selected package manager is not installed. Would you like to install it?',
        })

        if (!installPM) {
            console.log(
                'Package manager has been switched to npm. If you wish to exit press Control + C.',
            )

            packageManager = PackageManager.NPM
        }
    }

    const eslint = await confirm({
        message: 'Would you like to use ESLint?',
    })

    const tailwind = await confirm({
        message: 'Would you like to use Tailwind?',
    })

    return {
        projectName,
        framework,
        settings: {
            typescript,
            eslint,
            packageManager,
            installPM,
            appRouter,
            srcDir,
            turbopack,
            tailwind,
        },
    }
}
