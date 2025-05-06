import { z } from 'zod'

const educationSchema = z.object({
    institution: z.string().min(1),
    degree: z.string().min(1),
    startYear: z.number(),
    endYear: z.number().optional()
})

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
    educations: z.array(educationSchema).optional(),
})

export type ProfileInput = z.infer<typeof profileSchema>
