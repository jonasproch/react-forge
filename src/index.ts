import createNextApp from './builder/createNextApp.js'
import createViteApp from './builder/createViteApp.js'
import { Framework } from './prompts/options.js'
import promptUser from './prompts/promptUser.js'

const { projectName, framework, settings } = await promptUser()

switch (framework) {
    case Framework.NextJS:
        createNextApp(projectName, settings)
        break
    case Framework.Vite:
        createViteApp(projectName, settings)
}
