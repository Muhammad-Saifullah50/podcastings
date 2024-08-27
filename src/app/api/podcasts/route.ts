import { getDbUser } from "@/app/actions/user.actions";
import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Podcast, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {

    try {
        const user = await currentUser();
        const data = await request.json();

        if (!user) {
            return NextResponse.json({ message: 'Unauthorized', status: 401 })
        };

        const dbUser: User = await getDbUser(user?.emailAddresses[0].emailAddress);

        const result = await cloudinary.uploader.upload(data.thumbnailImage, {
            use_filename: true,
            transformation: [
                { width: 200, height: 200, crop: 'fill', quality: 100, },
            ]
        })
        const imageUrl = result.secure_url;

        const podcast: Podcast = await db.podcast.create({
            data: {
                ...data,
                thumbnailImage: imageUrl,
                category: data.category,
                userId: dbUser?.id
            }
        });

        return NextResponse.json({ message: 'Podcast created successfully', data: podcast, status: 201 })

    } catch (error) {
        console.error(error)

        return NextResponse.json({ message: 'Something went wrong', error: error, status: 500 })
    }

}

export const PUT = async (request: NextRequest) => {

    try {
        const user = await currentUser();
        const data = await request.json();

        if (!user) {
            return NextResponse.json({ message: 'Unauthorized', status: 401 })
        };

        const dbUser: User = await getDbUser(user?.emailAddresses[0].emailAddress);

        const hasImageChanged = data.thumbnailImage.includes('base64');

        let imageUrl = data.thumbnailImage;

        if (hasImageChanged) {
            const result = await cloudinary.uploader.upload(data.thumbnailImage, {
                use_filename: true,
                transformation: [
                    { width: 200, height: 200, crop: 'fill', quality: 100 },
                ],
            });
            imageUrl = result.secure_url;
        }
        const updatedPodcast: Podcast = await db.podcast.update({
            where: {
                id: data.id
            },
            data: {
                thumbnailImage: imageUrl,
                category: data.category,
                userId: dbUser?.id,
                podcastTitle: data.podcastTitle,
                podcastDescription: data.podcastDescription,
                podcastTranscription: data.podcastTranscription,
                thumbnailPrompt: data.thumbnailPrompt,
            }
        });

        return NextResponse.json({ message: 'Podcast updated successfully', data: updatedPodcast, status: 200 })

    } catch (error) {
        console.error(error)

        return NextResponse.json({ message: 'Something went wrong', error: error, status: 500 })
    }

}

