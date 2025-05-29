import { select, input } from '@inquirer/prompts'
import { Framework, Questions } from './options.js'

export default async function promptUser(): Promise<Questions> {
    const projectName = await input({ message: 'Enter name of your project' })

    const framework = await select<Framework>({
        message: 'Choose how you want to create your app',
        choices: [
            {
                name: 'Next.js',
                value: Framework.NextJS,
            },
            {
                name: 'Vite',
                value: Framework.Vite,
                // Temporarily disabled until implementation is complete
                disabled: true,
            },
        ],
    })

    return {
        projectName,
        framework,
    }
}
