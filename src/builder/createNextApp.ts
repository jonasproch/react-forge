import { spawn } from 'child_process'
import ora from 'ora'
import { PackageManager, Settings } from '../prompts/options.js'
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
        args: ['create-next-app@latest', name, ...createNextAppFlags],
        spinnerMessage: 'Creating Next.js project',
        successMessage: 'Next.js app created',
    })
}
