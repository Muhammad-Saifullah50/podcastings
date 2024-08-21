import { getDbUserWithPodcasts } from '@/app/actions/user.actions'
import PodcastCard from '@/components/PodcastCard'
import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs/server'
import { Podcast, User } from '@prisma/client'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const ProfilePage = async () => {
    const currUser = await currentUser()

    if (!currUser) redirect('/sign-in');

    const dbUser: User & { podcasts: Podcast[] } = await getDbUserWithPodcasts(currUser?.emailAddresses[0].emailAddress);

    const hasPodcasts = dbUser?.podcasts.length > 0;

    return (
        <main className='flex flex-col w-full gap-4 p-6'>
            <h1 className='text-2xl font-bold'>Podcaster Profile</h1>
            <section className='flex h-full gap-8'>
                <div>
                    <Image
                        src={currUser?.imageUrl || '/profile.svg'}
                        alt={currUser?.username || 'user'}
                        width={200}
                        height={200}
                    />
                </div>
                <div className='flex flex-col justify-center gap-4'>
                    <h2 className='text-2xl font-extrabold'>{currUser.fullName}</h2>
                    <div className='flex gap-4'>
                        <Image
                            src={'/headphone.svg'}
                            alt={'headphone'}
                            width={20}
                            height={20}
                            className='rounded-full'
                        />
                        <p className='font-normal text-white/80'><span className='font-semibold text-white'>1011</span> monthly listeners</p>
                    </div>

                    <Button variant={'primary'} className='flex justify-center gap-4'>
                        <Image
                            src={'/play.svg'}
                            width={20}
                            height={20}
                            alt='play'
                        />
                        Play a random podcast
                    </Button>
                </div>
            </section>

            <section>
                <div>
                    <h1 className='text-2xl font-bold'>All Podcasts</h1>
                    {/* // TODO: add filters  */}
                </div>

                {hasPodcasts ? (<div className='flex flex-wrap gap-4 mt-6'>
                    {dbUser.podcasts.map((podcast: Podcast) => (
                        <div key={podcast.id}>
                            <PodcastCard
                                podcastData={podcast}
                                podcastUsername={dbUser.username}
                            />
                        </div>
                    ))}
                </div>) : (
                    <div className='flex flex-col gap-4'>
                        <Image
                            src={'/magnify.svg'}
                            alt='magnify'
                            width={100}
                            height={100}
                        />

                        <p>You have not createed any podcasts yet</p>

                        <Button variant={`primary`} className='flex gap-4'>
                            <Image
                                src={'microphone.svg'}
                                alt={'microphone'}
                                width={20}
                                height={20}
                            />
                            Create a new podcast
                        </Button>
                    </div>
                )}
            </section>
        </main>
    )
}

export default ProfilePage

