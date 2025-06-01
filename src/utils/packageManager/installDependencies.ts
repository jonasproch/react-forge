import { PackageManager } from '../../prompts/options.js'
import runStep from '../runStep.js'
import getInstallKeyword from './getInstallKeyword.js'
import getPrefixFlag from './getPrefixFlag.js'

export default async function installDependencies(
    pm: PackageManager,
    projectName: string,
) {
    await runStep({
        command: pm,
        args: ['install', getPrefixFlag(pm), `${projectName}/`],
        spinnerMessage: `Running ${pm} ${getInstallKeyword(pm)}`,
        successMessage: `${pm} install complete`,
    })
}
