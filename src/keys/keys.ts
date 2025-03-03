import {getEnvVariable} from "./env.js";

export const Keys = {
    mongoUrl: getEnvVariable("MONGODB_URL")
}