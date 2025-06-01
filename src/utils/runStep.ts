import { spawnSync } from 'child_process'
import ora from 'ora'

type RunStepProps = {
    spinnerMessage: string
    successMessage: string
    command: string
    args: string[]
}

export default async function runStep({
    spinnerMessage,
    successMessage,
    command,
    args,
}: RunStepProps) {
    const spinner = ora(spinnerMessage).start()

    const { status } = await spawnSync(command, args)

    if (status !== 0) {
        spinner.fail(`${command} exited with code ${status}`)
        throw new Error(`${command} exited with code ${status}`)
    }

    spinner.succeed(successMessage)
}
