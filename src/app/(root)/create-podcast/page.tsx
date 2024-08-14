
import PodcastForm from '@/components/forms/PodcastForm'
import React from 'react'
import { getCategories } from '../../actions/categories.actions'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const CreatePodcastPage = async () => {

  const categories = await getCategories()
  return (
    <main className='flex flex-col gap-4 w-full p-6' >
      <UserButton />
      <h2 className='text-2xl font-bold'>Create a Podcast</h2>
      <PodcastForm categories={categories} />
      <Link href={'/sign-in'}>Signin</Link>
    </main>
  )
}

export default CreatePodcastPage
