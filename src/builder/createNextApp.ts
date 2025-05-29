import { exec } from 'child_process'

export default function createNextApp(name: string) {
    exec(`npx create-next-app@latest ${name} --ts --yes`)
}
