import { z } from "zod";
export const codeSchema = z.object({
    username: z.string().min(3).max(25),
    srcCode: z.string().min(1),
    stdinp : z.string(),
    lang: z.string(),
    stdout: z.string(),
    status: z.string(),
})