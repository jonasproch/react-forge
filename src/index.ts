import createNextApp from './builder/createNextApp.js'
import { Framework } from './prompts/options.js'
import promptUser from './prompts/promptUser.js'

const { projectName, framework } = await promptUser()

switch (framework) {
    case Framework.NextJS:
        createNextApp(projectName)
}
