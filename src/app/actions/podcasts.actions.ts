'use server'
import { db } from "@/lib/prisma"

export const getPodcastById = async (podcastId: string) => {

    try {
        const podcast = await db.podcast.findUnique({
            where: {
                id: podcastId
            },
            include: {
                User: true
            }
        });

        return podcast
    } catch (error) {
        console.error(error)
    }
}

export const getAudioUrlFromDb = async (podcastId: string) => {
    try {
        const podcast = await db.podcast.findUnique({
            where: {
                id: podcastId
            },
            select: {
                audioUrl: true
            }
        });
console.log(podcast)
        return podcast?.audioUrl
    } catch (error) {
        console.error(error)
    }
}