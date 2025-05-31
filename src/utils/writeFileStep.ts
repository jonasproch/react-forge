import fs from 'fs'
import ora from 'ora'

type WriteFileStepProps = {
    file: string
    content: string
	spinnerMessage: string
	successMessage: string
}

export default async function writeFileStep({
    file,
    content,
	spinnerMessage,
	successMessage,
}: WriteFileStepProps) {
    const spinner = ora(spinnerMessage).start()

    await fs.writeFileSync(file, content)

	spinner.succeed(successMessage)
}
