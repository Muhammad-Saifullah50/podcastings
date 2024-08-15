import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {

    try {
        const user = await currentUser();
        const data = await request.json();

        const result = await cloudinary.uploader.upload(data.thumbnailImage, {
            use_filename: true,
            transformation: [
                { width: 200, height: 200, crop: 'fill', quality: 100, },
            ]
        })
        const imageUrl = result.secure_url;

        const podcast = await db.podcast.create({
            data: {
                ...data,
                authorId: user?.id,
                thumbnailImage: imageUrl,
                category: data.category
            }
        });

        return NextResponse.json({ message: 'Podcast created successfully', data: podcast, status: 201 })

    } catch (error) {
        console.error(error)

        return NextResponse.json({ message: 'Something went wrong', error: error, status: 500 })
    }

}

