import { prisma } from '../utils/prisma'
import { ProjectInput } from '../validators/project.validator'

export async function createProject(data: ProjectInput) {
    const createdProject = await prisma.project.create({
        data: {
            name: data.name,
            summary: data.summary,
            description: data.description,
            stack: data.stack,

            technologies: {
                create: data.technologies?.map(tech => ({
                    name: tech.name,
                    url: tech.url,
                })),
            },

            repositories: {
                create: data.repositories?.map(repo => ({
                    name: repo.name,
                    url: repo.url,
                })),
            },

            collaborators: {
                create: data.collaborators?.map(collab => ({
                    name: collab.name,
                    portfolioUrl: collab.portfolioUrl,
                })),
            },

            images: {
                create: data.images?.map(image => ({
                    data: Buffer.from(image.data, 'base64'),
                })),
            },
        },
        include: {
            technologies: true,
            repositories: true,
            collaborators: true,
            images: true,
        },
    })

    return createdProject
}