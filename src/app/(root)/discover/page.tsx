import { getAllPodcasts } from '@/app/actions/podcasts.actions'
import PodcastCard from '@/components/PodcastCard'
import SearchBar from '@/components/SearchBar'
import { Podcast, User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DiscoverPage = async () => {

    const podcasts = await getAllPodcasts()

    return (
        <main className='p-6 flex flex-col'>
            <section>
                <SearchBar />
            </section>

            <section className='flex flex-col gap-4'>
                <h2 className='text-2xl font-bold'>Discover Community Podcasts</h2>
                <div className='flex flex-wrap gap-4 '>
                    {podcasts.map((podcast: Podcast & { User: User }) => (
                        <PodcastCard
                            podcastData={podcast}
                            podcastUsername={podcast.User.username}
                        />
                    ))}
                </div>

            </section>
        </main>
    )
}

export default DiscoverPage
