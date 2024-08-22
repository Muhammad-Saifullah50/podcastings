'use server'
import { db } from "@/lib/prisma"

export const getAllPodcasts = async () => {

    try {
        const podcasts = await db.podcast.findMany({
            include: {
                User: true
            }
        });
        return podcasts
    } catch (error) {
        console.error(error)
    }
};

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

export const getLatestPodcasts = async () => {
    try {
        const podcasts = await db.podcast.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                User: true
            },
            take: 4
        });

        return podcasts
    } catch (error) {
        console.error(error)
    }

}

export const getTopPodcasters = async () => {
    try {
        const topPodcasters = await db.user.findMany({
            orderBy: {
                podcasts: {
                    _count: 'desc'
                }
            },
            include: {
                podcasts: true
            },
            take: 4
        });

        return topPodcasters

    } catch (error) {
        console.error(error)
    }
}