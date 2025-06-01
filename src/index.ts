#!/usr/bin/env node
import createNextApp from './builder/createNextApp.js'
import createViteApp from './builder/createViteApp.js'
import { Framework } from './prompts/options.js'
import promptUser from './prompts/promptUser.js'
import installPM from './utils/installPM.js'

const { projectName, framework, settings } = await promptUser()

try {
    if (settings.installPM) {
        await installPM(settings.packageManager)
    }

    switch (framework) {
        case Framework.NextJS:
            await createNextApp(projectName, settings)
            break
        case Framework.Vite:
            await createViteApp(projectName, settings)
    }
} catch (err) {
    console.log(`An error occurred while running React Forge: \n${err}`)
}
