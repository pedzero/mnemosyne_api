import { prisma } from '../utils/prisma'
import { ProjectInput } from '../validators/project.validator'

export async function fetchProjects() {
    const projects = await prisma.project.findMany({
        select: {
            id: true,
            name: true,
            summary: true,
            stack: true,
            technologies: {
                select: {
                    name: true,
                    url: true
                }
            },
            repositories: {
                select: {
                    name: true,
                    url: true
                }
            },
            collaborators: {
                select: {
                    name: true,
                    portfolioUrl: true
                }
            },
            images: {
                take: 1,
                select: {
                    data: true,
                }
            }
        }
    })
    return projects
}

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