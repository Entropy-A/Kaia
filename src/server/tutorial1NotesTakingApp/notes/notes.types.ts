import { z } from "zod";
import { ApiRequest } from "$/server/core/types/apiRequest.dto.js";

const noteSchema = z.object({
    title: z.string(),
    text: z.string().optional(),
});

type noteSchema = z.infer<typeof noteSchema>

export default noteSchema;