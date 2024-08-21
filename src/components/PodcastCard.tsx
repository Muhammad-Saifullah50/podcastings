import { Podcast } from '@prisma/client';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface PodcastCardProps {
    podcastUsername: string;
    podcastData: Podcast
}

const PodcastCard = ({ podcastData: podcast, podcastUsername }: PodcastCardProps) => {
    return (
        <Link
            key={podcast.id}
            href={`/podcasts/${podcast.id}`}
            className='flex flex-col items-center justify-start gap-4 p-3 rounded-xl hover:bg-dark-secondary w-44 h-auto'>
            <Image
                src={podcast?.thumbnailImage}
                alt={podcast?.podcastTitle}
                width={150}
                height={150}
            />
            <div>
                <h3 className='font-bold text-white text-base line-clamp-1'>{podcast?.podcastTitle}</h3>
                <p className='text-sm text-white/80'>{podcastUsername}</p>
            </div>
        </Link>
    )
}

export default PodcastCard
