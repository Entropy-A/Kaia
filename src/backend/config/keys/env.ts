import {config} from "dotenv";
import {resolve} from "path";

const path = resolve(process.cwd(), ".env");
config({path});

export function getEnvVariable(name: string): string {
    const envVariable = process.env[name];

    if (!envVariable) {
        throw new Error(`Environment variable "${name}" not found.`);
    }

    return envVariable;
}