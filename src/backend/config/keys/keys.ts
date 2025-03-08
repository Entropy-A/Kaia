import {getEnvVariable} from "./env.js";

export const Keys = {
    PORT: parseInt(getEnvVariable("PORT")),
    mongoUrl: getEnvVariable("MONGODB_URL"),
}