import { PackageManager } from '../../prompts/options.js'

export default function getInstallKeyword(pm: PackageManager) {
    return pm === PackageManager.YARN ? 'add' : 'install'
}
