import { spawnSync } from 'child_process'
import { PackageManager } from '../prompts/options.js'

export default async function checkPMInstallation(pm: PackageManager) {
    const { status } = await spawnSync(pm, ['--version'])

    return status === 0
}
