import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {

    const data = await request.json();

    const url = 'https://open-ai21.p.rapidapi.com/texttospeech';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY!,
            'x-rapidapi-host': process.env.RAPID_API_HOST!,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: data.prompt })

    };

    try {
        // const response = await fetch(url, options);
        // const result = await response.json();

        // const audioUrl = result.url;

        const audioUrl = 'https://audiospace-1-r4970717.deta.app/getvoice?id=WXL6F76CA5579SPN8UCJ1723807218.2815068'

        const uploadedAudioUrl = await cloudinary.uploader.upload(audioUrl, {
            use_filename: true,
            resource_type: 'video'
        });

        const podcast = await db.podcast.update({
            where: {
                id: data.podcastId
            },
            data: {
                audioUrl: uploadedAudioUrl.secure_url
            }
        });

        return NextResponse.json({ message: 'Podcast created successfully', data: podcast, status: 201 })
    } catch (error) {
        console.error(error);

        return NextResponse.json({ message: 'Podcast creation failed', error: error, status: 500 })
    }
}

