import { prisma } from '../utils/prisma'
import { ProfileInput } from '../validators/profile.validator'

export async function getProfile() {
    const profile = await prisma.profile.findFirst({
        include: { socials: true, educations: true },
    })
    return profile
}

export async function updateProfile(data: ProfileInput) {
    const existing = await prisma.profile.findFirst()

    if (!existing) {
        return await prisma.profile.create({
            data: {
                name: data.name,
                summary: data.summary,
                email: data.email,
                socials: {
                    create: data.socials,
                },
                educations: {
                    create: data.educations,
                },
            },
            include: { socials: true, educations: true },
        })
    }

    await prisma.socialLink.deleteMany({ where: { profileId: existing.id } })
    await prisma.education.deleteMany({ where: { profileId: existing.id } })

    return await prisma.profile.update({
        where: { id: existing.id },
        data: {
            name: data.name,
            summary: data.summary,
            email: data.email,
            socials: {
                create: data.socials,
            },
            educations: {
                create: data.educations,
            },
        },
        include: { socials: true, educations: true },
    })
}
