'use server'

import { v2 as cloudinary } from 'cloudinary';

interface createPodcastParams {
    podcastTitle: string
    podcastCategory: string,
    podcastDescription: string
    thumbnailImage: string | File | undefined,
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})
export const createPodcast = async (data: createPodcastParams) => {
    try {
        console.log(data)
    } catch (error) {

    }
}