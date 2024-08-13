import PodcastForm from '@/components/forms/PodcastForm'
import React from 'react'

const CreatePodcastPage = () => {
  return (
    <main className='flex flex-col gap-4 w-full p-6' >
      <h2 className='text-2xl font-bold'>Create a Podcast</h2>
      <PodcastForm />
    </main>
  )
}

export default CreatePodcastPage
