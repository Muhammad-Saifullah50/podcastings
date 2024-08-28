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

export const incrementNoOfPlays = async (podcastId: string) => {
    try {
        const podcast = await db.podcast.update({
            where: {
                id: podcastId
            },
            data: {
                numberOfPlays: {
                    increment: 1
                }
            }
        });
        return podcast
    } catch (error) {
        console.error(error)
    }
}

export const getTrendingPodcasts = async () => {
    try {
        const podcasts = await db.podcast.findMany({
            orderBy: {
                numberOfPlays: 'desc'
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

export const deletePodcast = async (userId: string, podcastId: string) => {
    try {
        if (!userId) {
            throw new Error("User not found")
        };
        const podcast = await db.podcast.delete({
            where: {
                id: podcastId
            }
        });
        return podcast
    } catch (error) {
        console.error(error)
    }
    
}