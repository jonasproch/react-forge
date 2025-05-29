import { select } from '@inquirer/prompts'
import { Framework, Questions } from './options.js'

export default async function promptUser(): Promise<Questions> {
    const framework = await select({
        message: 'Choose how you want to create your app',
        choices: [
            {
                name: 'Next.js',
                value: Framework.NextJS,
            },
            {
                name: 'Vite',
                value: Framework.Vite,
            },
        ],
    })

    return {
        framework,
    }
}
