import { PackageManager, Settings } from '../prompts/options.js'
import getDevFlag from '../utils/packageManager/getDevFlag.js'
import getInstallKeyword from '../utils/packageManager/getInstallKeyword.js'
import getPrefixFlag from '../utils/packageManager/getPrefixFlag.js'
import runStep from '../utils/runStep.js'

export default async function createNextApp(
    name: string,
    {
        typescript,
        eslint,
        packageManager,
        tailwind,
        appRouter,
        srcDir,
        turbopack,
        prettier,
    }: Settings,
) {
    // Create Next App flags
    const createNextAppFlags = [
        tailwind ? '--tailwind' : '--no-tailwind',
        eslint ? '--eslint' : '--no-eslint',
        appRouter ? '--app' : '--no-app',
        srcDir ? '--src-dir' : '--no-src-dir',
        turbopack ? '--turbopack' : '--no-turbopack',
        '--import-alias',
        '@/*',
        {
            [PackageManager.NPM]: '--use-npm',
            [PackageManager.YARN]: '--use-yarn',
            [PackageManager.PNPM]: '--use-pnpm',
            [PackageManager.BUN]: '--use-bun',
        }[packageManager],
        typescript ? '--ts' : '--js',
    ]

    // Create Next App
    await runStep({
        command: 'npx',
        args: ['create-next-app@latest', `${name}/`, ...createNextAppFlags],
        spinnerMessage: 'Creating Next.js project',
        successMessage: 'Next.js app created',
    })

    // Setup Prettier
    if (prettier) {
        // Install prettier
        await runStep({
            command: packageManager,
            args: [
                getInstallKeyword(packageManager),
                getDevFlag(packageManager),
                getPrefixFlag(packageManager),
                `${name}/`,
                'prettier',
            ],
            spinnerMessage: 'Installing Prettier',
            successMessage: 'Prettier installed',
        })
    }
}
