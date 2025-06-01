import { spawnSync } from 'child_process'
import { PackageManager } from '../prompts/options.js'
import ora from 'ora'
import runStep from './runStep.js'

export default async function installPM(pm: PackageManager) {
    let pkg

    switch (pm) {
        case PackageManager.YARN:
            pkg = 'yarn'
            break
        case PackageManager.PNPM:
            pkg = 'pnpm@latest-10'
            break
        case PackageManager.BUN:
            pkg = 'bun'
        default:
            throw new Error('Trying to install unsupported package manager')
    }

    await runStep({
        command: 'npm',
        args: ['install', '--global', pkg],
        spinnerMessage: `Installing ${pm}`,
        successMessage: `${pm} installed`,
    })
}
