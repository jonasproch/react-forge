export enum Framework {
    NextJS = 'nextjs',
    Vite = 'vite',
}

export enum PackageManager {
    NPM = 'npm',
    YARN = 'yarn',
    PNPM = 'pnpm',
    BUN = 'bun',
}

export type Settings = {
    typescript: boolean
    eslint: boolean
    packageManager: PackageManager
    appRouter: boolean | null
    srcDir: boolean | null
    turbopack: boolean | null
}

export type Questions = {
    projectName: string
    framework: Framework
    settings: Settings
}
