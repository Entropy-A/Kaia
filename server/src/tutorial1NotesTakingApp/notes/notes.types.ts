import { z } from "zod";

const noteSchema = z.object({
    title: z.string(),
    text: z.string().optional(),
});

type noteSchema = z.infer<typeof noteSchema>
export default noteSchema;