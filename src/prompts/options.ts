export enum Framework {
    NextJS = 'nextjs',
    Vite = 'vite',
}

export type Settings = {
    typescript: boolean
}

export type Questions = {
    projectName: string
    framework: Framework
    settings: Settings
}
