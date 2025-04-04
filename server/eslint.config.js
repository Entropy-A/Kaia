import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    {
        ignores: ["**/node_modules/**", "**/dist/**"],
    },
    ...tseslint.configs.recommended,
    {
        // TypeScript-specific settings
        files: ["**/*.ts"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
            },
            parser: tseslint.parser,
            parserOptions: {
                project: true,
            },
        },
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "caughtErrorsIgnorePattern": "^_"
                }
            ],
            "semi": ["warn", "always"],
            "quotes": ["warn", "double"],
            "indent": ["warn", 4],
            "comma-dangle": ["warn", "always-multiline"],
            "arrow-spacing": ["warn"],
            "keyword-spacing": ["warn"],
            "space-infix-ops": ["warn"],
            "object-curly-spacing": ["warn", "always"],
            "space-before-blocks": ["warn"],
            "block-spacing": ["warn"],
        },
    },
]);