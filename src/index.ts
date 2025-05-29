import promptUser from './prompts/promptUser.js'

const { framework } = await promptUser()

console.log(`Chosen framework: ${framework}`)
