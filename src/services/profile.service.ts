import { prisma } from '../utils/prisma'
import { ProfileInput } from '../validators/profile.validator'

export async function getProfile() {
    const profile = await prisma.profile.findFirst({
        include: { socials: true },
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
            },
            include: { socials: true },
        })
    }

    await prisma.socialLink.deleteMany({ where: { profileId: existing.id } })

    return await prisma.profile.update({
        where: { id: existing.id },
        data: {
            name: data.name,
            summary: data.summary,
            email: data.email,
            socials: {
                create: data.socials,
            },
        },
        include: { socials: true },
    })
}
