import { getPodcastById } from '@/app/actions/podcasts.actions'
import { Podcast, User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

const PodcastDetailsPage = async ({ params: { podcastId } }: { params: { podcastId: string } }) => {

    const podcast: Podcast & User = await getPodcastById(podcastId)
    //@ts-ignore
    const author = podcast.User;
    return (
        <main>
            <section>
                <div>
                    <Image
                        src={podcast.thumbnailImage}
                        alt={podcast.podcastTitle}
                        width={200}
                        height={200}
                    />
                </div>
                <div>
                    <h1>{podcast.podcastTitle}</h1>
                    <Image
                        src={author.imageUrl || '/profile.svg'}
                        alt={author.username}
                        width={30}
                        height={30}
                        className='rounded-full'
                    />
                    <p>{author.username}</p>
                </div>
            </section>
        </main>
    )
}

export default PodcastDetailsPage
