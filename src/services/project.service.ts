import { NotFoundError } from '../utils/errors'
import { prisma } from '../utils/prisma'
import { deleteImage, uploadImage } from '../utils/upload'
import { ProjectInput } from '../validators/project.validator'

export async function fetchProjects() {
    const projects = await prisma.project.findMany({
        orderBy: {
            order: 'asc',
        },
        select: {
            id: true,
            name: true,
            summary: true,
            stack: true,
            order: true,
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
                    url: true,
                }
            }
        }
    })
    return projects
}

export async function fetchSingleProject(id: number) {
    const project = await prisma.project.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            summary: true,
            description: true,
            stack: true,
            order: true,
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
                    url: true,
                }
            }
        }
    })
    return project
}

export async function createProject(data: ProjectInput, files: Express.Multer.File[]) {
    const uploadedPhotos: string[] = []
    if (files) {
        for (const file of files) {
            const url = await uploadImage(file)
            uploadedPhotos.push(url)
        }
    }

    const createdProject = await prisma.project.create({
        data: {
            name: data.name,
            summary: data.summary,
            description: data.description,
            stack: data.stack,
            order: data.order,

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
                create: uploadedPhotos.map(url => ({ url })),
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

export async function updateProject(id: number, data: ProjectInput, files: Express.Multer.File[]) {
    const project = await prisma.project.findUnique({
        where: { id },
        include: { images: true },
    })

    if (!project) {
        throw new NotFoundError('Project not found')
    }

    for (const image of project.images) {
        const fileName = image.url.split('/').pop()
        if (fileName) {
            await deleteImage(fileName)
        }
    }

    await prisma.image.deleteMany({ where: { projectId: id } })

    const uploadedPhotos: string[] = []
    if (files) {
        for (const file of files) {
            const url = await uploadImage(file)
            uploadedPhotos.push(url)
        }
    }

    const updated = await prisma.project.update({
        where: { id },
        data: {
            name: data.name,
            summary: data.summary,
            description: data.description,
            stack: data.stack,
            order: data.order,
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
                create: uploadedPhotos.map(url => ({ url })),
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

export async function deleteProject(id: number) {
    const existing = await prisma.project.findUnique({
        where: { id },
        include: { images: true },
    })

    if (!existing) {
        throw new NotFoundError('Project not found')
    }

    for (const image of existing.images) {
        const fileName = image.url.split('/').pop()
        if (fileName) {
            await deleteImage(fileName)
        }
    }

    await prisma.project.delete({
        where: { id },
    })

    return { message: 'Project deleted successfully' }
}
