import { z } from 'zod'

export const profileSchema = z.object({
    name: z.string().min(1),
    summary: z.string().min(1),
    email: z.string().email(),
    socials: z.array(
        z.object({
            name: z.string().min(1),
            url: z.string().url(),
        })
    ),
})

export type ProfileInput = z.infer<typeof profileSchema>
