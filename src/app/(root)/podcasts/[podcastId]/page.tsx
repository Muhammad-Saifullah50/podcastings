import { getPodcastById } from '@/app/actions/podcasts.actions'
import AudioPlayer from '@/components/AudioPlayer'
import DropDownMenu from '@/components/DropDownMenu'
import PodcastGenerator from '@/components/PodcastGenerator'
import { Podcast, User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

const PodcastDetailsPage = async ({ params: { podcastId } }: { params: { podcastId: string } }) => {

    const podcast: Podcast & { User: User } = await getPodcastById(podcastId)
    const author = podcast.User;

    return (
        <main className='flex flex-col gap-4 p-6 w-full'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Podcast Details</h1>
                <span>
                    <Image
                        src={'/headphone.svg'}
                        width={20}
                        height={20}
                        alt='headphone'
                    />
                    <span className='font-bold'>{podcast.numberOfPlays}</span>
                </span>
            </div>
            <section className='flex gap-8 h-full'>
                <div>
                    <Image
                        src={podcast?.thumbnailImage}
                        alt={podcast?.podcastTitle}
                        width={200}
                        height={200}
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-bold'>{podcast?.podcastTitle}</h2>
                        <DropDownMenu/>
                    </div>
                    <div className='flex gap-4 items-center justify-start'>
                        <Image
                            src={author?.imageUrl || '/profile.svg'}
                            alt={author?.username}
                            width={30}
                            height={30}
                            className='rounded-full'
                        />
                        <p className='text-white/80 font-normal'>{author?.username}</p>
                    </div>

                </div>
            </section>

            <section className='flex flex-col gap-8'>
                <section>
                    <h3 className='text-xl font-bold'>Description</h3>
                    <p className='font-medium opacity-80'>{podcast.podcastDescription}</p>
                </section>

                <section>
                    <h3 className='text-xl font-bold'>Transcription</h3>
                    <p className='font-medium opacity-80'>{podcast.podcastTranscription}</p>

                    {podcast.audioUrl ? (
                        <AudioPlayer
                            podcast={podcast}
                            usage='podcastPage'
                        />
                    ) : (<PodcastGenerator
                        prompt={podcast?.podcastTranscription}
                        podcastId={podcast?.id}
                    />
                    )}
                </section>

                {podcast.thumbnailPrompt &&
                    <section>
                        <h3 className='text-xl font-bold'>Thumbnail Prompt</h3>
                        <p className='font-medium opacity-80'>{podcast.thumbnailPrompt}</p>
                    </section>
                }

                <section>
                    {/* similar podcasts */}
                </section>
            </section>


        </main>
    )
}

export default PodcastDetailsPage
