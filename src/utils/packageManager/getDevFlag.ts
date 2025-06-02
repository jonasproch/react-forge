import { PackageManager } from '../../prompts/options.js'

export default function getDevFlag(pm: PackageManager) {
    return pm === PackageManager.NPM || pm === PackageManager.PNPM
        ? '--save-dev'
        : '--dev'
}
