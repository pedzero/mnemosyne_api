import { z } from 'zod'

export const idParamSchema = z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a valid integer'),
})

export type IdParam = z.infer<typeof idParamSchema>
