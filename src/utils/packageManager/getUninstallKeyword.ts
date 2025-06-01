import { PackageManager } from '../../prompts/options.js'

export default function getUninstallKeyword(pm: PackageManager) {
    return pm === PackageManager.NPM ? 'uninstall' : 'remove'
}
