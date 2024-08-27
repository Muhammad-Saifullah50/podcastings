import { getPodcastById } from "@/app/actions/podcasts.actions";
import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/prisma";
import { Podcast, User } from "@prisma/client";
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
        const response = await fetch(url, options);
        const result = await response.json();

        const audioUrl = result.url;

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

        const podcastWithUser: Podcast & { User: User } = await getPodcastById(podcast.id)

        return NextResponse.json({ message: 'Podcast created successfully', data: podcastWithUser, status: 201 })
    } catch (error) {
        console.error(error);

        return NextResponse.json({ message: 'Podcast creation failed', error: error, status: 500 })
    }
}

