import { getPodcastById } from '@/app/actions/podcasts.actions'
import { getUserByAuthorId } from '@/app/actions/user.actions'
import { Podcast, User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

const PodcastDetailsPage = async ({ params: { podcastId } }: { params: { podcastId: string } }) => {

    const podcast: Podcast = await getPodcastById(podcastId)
    const author: User = await getUserByAuthorId(podcast.authorId)
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
                </div>
            </section>
        </main>
    )
}

export default PodcastDetailsPage
