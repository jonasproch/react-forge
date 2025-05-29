import promptUser from './prompts/promptUser.js'

const { projectName, framework } = await promptUser()

console.log(`Project name: ${projectName}`)
console.log(`Chosen framework: ${framework}`)
