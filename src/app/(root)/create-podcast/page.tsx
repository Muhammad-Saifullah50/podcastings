
import PodcastForm from '@/components/forms/PodcastForm'
import React from 'react'
import { getCategories } from '../../actions/categories.actions'

const CreatePodcastPage = async () => {

  const categories = await getCategories()
  return (
    <main className='flex flex-col gap-4 w-full p-6' >
      <h2 className='text-2xl font-bold'>Create a Podcast</h2>
      <PodcastForm categories={categories} action='create'/>
    </main>
  )
}

export default CreatePodcastPage
