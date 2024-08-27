import { getCategories } from '@/app/actions/categories.actions'
import { getPodcastById } from '@/app/actions/podcasts.actions';
import PodcastForm from '@/components/forms/PodcastForm'
import React from 'react'

const EditPodcastPage = async ({ params: { podcastId } }: { params: { podcastId: string } }) => {

    const categories = await getCategories();
    const podcast = await getPodcastById(podcastId);

    return (
        <main className='flex flex-col gap-4 w-full p-6' >
            <h2 className='text-2xl font-bold'>Create a Podcast</h2>
            <PodcastForm
                categories={categories}
                action='edit'
                podcast={podcast} />
        </main>
    )
}

export default EditPodcastPage
