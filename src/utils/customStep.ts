import ora from 'ora'

type CustommStepProps = {
    process: () => void
    spinnerMessage: string
    successMessage: string
}

export default async function customStep({
    process,
    spinnerMessage,
    successMessage,
}: CustommStepProps) {
    const spinner = ora(spinnerMessage).start()

    await process()

    spinner.succeed(successMessage)
}
