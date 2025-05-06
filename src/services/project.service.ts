import { NotFoundError } from '../utils/errors'
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

export async function fetchSingleProject(id: number) {
    const projects = await prisma.project.findMany({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            summary: true,
            description: true,
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

export async function updateProject(id: number, data: ProjectInput) {
    const project = await prisma.project.findUnique({
        where: { id },
    })

    if (!project) {
        throw new NotFoundError('Project not found')
    }

    const updated = await prisma.project.update({
        where: { id },
        data: {
            name: data.name,
            summary: data.summary,
            description: data.description,
            stack: data.stack,
            technologies: {
                deleteMany: {},
                create: data.technologies?.map(t => ({
                    name: t.name,
                    url: t.url,
                })),
            },
            repositories: {
                deleteMany: {},
                create: data.repositories?.map(r => ({
                    name: r.name,
                    url: r.url,
                })),
            },
            collaborators: {
                deleteMany: {},
                create: data.collaborators?.map(c => ({
                    name: c.name,
                    portfolioUrl: c.portfolioUrl,
                })),
            },
            images: {
                deleteMany: {},
                create: data.images?.map(img => ({
                    data: Buffer.from(img.data, 'base64'),
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

    return updated
}


