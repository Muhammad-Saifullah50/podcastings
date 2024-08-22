import { Podcast, User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

const UserCard = ({ data }: { data: User & { podcasts: Podcast[] } }) => {
    return (
        <div className='flex gap-4 items-center justify-between'>
                <Image
                    src={data.imageUrl!}
                    alt='profile'
                    width={50}
                    height={50}
                    className='rounded-lg'
                />
            <div className='flex items-center justify-between w-full'>
                <h6 className='text-lg font-bold'>{data.username}</h6>
                <p className='text-xs font-normal'>{data.podcasts.length} Podcasts</p>
            </div>
        </div>
    )
}

export default UserCard
