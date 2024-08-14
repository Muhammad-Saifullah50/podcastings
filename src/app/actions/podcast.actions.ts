'use server'

import { db } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

export const createPodcast = async (data: string) => {
    try {
        const user = await currentUser();

        const dataobj = JSON.parse(data)

        const result = await cloudinary.uploader.upload(dataobj.thumbnailImage, {
            use_filename: true,
            transformation: [
                { width: 200, height: 200, crop: 'fill', quality: 100, },
            ]
        })

        const imageUrl = result.secure_url;

       const podcast = await db.podcast.create({
            data: {
                ...dataobj,
                authorId: user?.id,
                thumbnailImage: imageUrl
            }
        });

        return podcast

    } catch (error) {
        console.error(error)
    }
}