import { z } from 'zod'

const technologySchema = z.object({
    name: z.string().min(1),
    url: z.string().url()
})

const repositorySchema = z.object({
    name: z.string().min(1),
    url: z.string().url()
})

const collaboratorSchema = z.object({
    name: z.string().min(1),
    portfolioUrl: z.string().url()
})

const imageSchema = z.object({
    url: z.string()
})

export const projectSchema = z.object({
    name: z.string().min(1),
    summary: z.string().min(1),
    description: z.string().min(1),
    stack: z.enum(['frontend', 'backend', 'full']),
    order: z.number().optional(),
    technologies: z.array(technologySchema).optional(),
    repositories: z.array(repositorySchema).optional(),
    collaborators: z.array(collaboratorSchema).optional(),
    images: z.array(imageSchema).optional()
})

export type ProjectInput = z.infer<typeof projectSchema>
