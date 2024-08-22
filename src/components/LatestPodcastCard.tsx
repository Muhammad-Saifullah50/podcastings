'use client'
import { Podcast } from '@prisma/client'
import Image from 'next/image'
import React, { useState } from 'react'
import DropDownMenu from './DropDownMenu'
import AudioDuration from './AudioDuration'
import MyAudioPlayer from './AudioPlayer'

type LatestPodcastCardProps = {
    podcastData: Podcast & { User: { username: string } }
    index: number
}
const LatestPodcastCard = ({ podcastData, index }: LatestPodcastCardProps) => {
    const [playing, setPlaying] = useState(false);

    return (<>
        <li className='flex items-center justify-evenly'>
            {playing ? (
                <Image
                    src={'/Play.svg'}
                    alt='play'
                    width={20}
                    height={20}
                />
            ) : (
                <span>{index + 1}</span>
            )}
            <div className='flex items-center w-1/2 gap-3'>
                <Image
                    src={podcastData.thumbnailImage}
                    alt={podcastData.podcastTitle}
                    width={50}
                    height={50}
                />
                <h3 className='font-bold line-clamp-1'>{podcastData.podcastTitle}</h3>
            </div>
            <div className='flex gap-3 min-w-8'>
                <Image
                    src={'/headphone.svg'}
                    alt='headphone'
                    width={20}
                    height={20}
                />
                <span>{podcastData.numberOfPlays}</span>
            </div>
            <div className='flex gap-3 min-w-8'>
                <Image
                    src={'/clock.svg'}
                    alt='clock'
                    width={20}
                    height={20}
                />
                <AudioDuration audioUrl={podcastData.audioUrl!} />
            </div>
            <div className='flex items-center'>
                <DropDownMenu
                    podcastId={podcastData.id}
                    setPlaying={setPlaying}
                />
            </div>
        </li>
        {playing && (
            <div className="absolute bottom-0 left-0 w-full">
                <MyAudioPlayer
                    usage='bottom'
                    //@ts-ignore
                    podcast={podcastData}
                    
                />
            </div>
        )}
    </>)
}

export default LatestPodcastCard
