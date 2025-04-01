import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const keysSchema = z.object({
    //NODE_ENV: z.enum(["development", "production", "test"]),
    PORT: z.string().transform(Number),
    MONGODB_URI: z.string().url(),
});

export const Keys = keysSchema.parse(process.env);