import fs from 'fs'

type WriteFileStepProps = {
    file: string
}

export default async function writeFileStep({ file }: WriteFileStepProps) {
    const content = `
        import { defineConfig } from "eslint/config";
        import js from "@eslint/js";

        export default defineConfig([
	        {
		        files: ["**/*.js"],
		        plugins: {
			        js,
		        },
		        extends: ["js/recommended"],
		        rules: {
			        "no-unused-vars": "warn",
			        "no-undef": "warn",
		        },
	        },
        ]);
    `

    await fs.writeFileSync(file, content)
}
