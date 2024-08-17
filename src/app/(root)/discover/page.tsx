import { getAllPodcasts } from '@/app/actions/podcasts.actions'
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
                        <Link href={`/podcasts/${podcast.id}`} className='flex flex-col items-center justify-start gap-4 p-3 rounded-xl hover:bg-dark-secondary w-56 h-auto'>
                            <Image
                                src={podcast?.thumbnailImage}
                                alt={podcast?.podcastTitle}
                                width={200}
                                height={200}
                            />
                            <div>
                                <h3 className='font-bold text-white text-base line-clamp-1'>{podcast?.podcastTitle}</h3>
                                <p className='text-sm text-white/80'>{podcast?.User?.username}</p>
                            </div>
                        </Link>
                    ))}
                </div>

            </section>
        </main>
    )
}

export default DiscoverPage
