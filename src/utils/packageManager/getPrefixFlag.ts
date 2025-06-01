import { PackageManager } from '../../prompts/options.js'

export default function getPrefixFlag(pm: PackageManager) {
    switch (pm) {
        case PackageManager.NPM:
            return '--prefix'
        case PackageManager.YARN:
            return '--cwd'
        case PackageManager.PNPM:
            return '--dir'
        case PackageManager.BUN:
            return '--cwd'
    }
}
