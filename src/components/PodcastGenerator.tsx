'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import Loader from "./Loader";
import AudioPlayer from "./AudioPlayer";
import { Podcast, User } from "@prisma/client";
import MyAudioPlayer from "./AudioPlayer";

interface PodcastGeneratorProps {
  prompt: string,
  podcastId: string
}


const PodcastGenerator = ({ prompt, podcastId }: PodcastGeneratorProps) => {

  const [loading, setLoading] = useState(false);
  const [podcastData, setPodcastData] = useState<Podcast & { User: User } | null>(null);
  const handleClick = async () => {
    try {
      setLoading(true);
      const request = await fetch('/api/podcasts/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, podcastId }),
      });

      const response = await request.json();

      if (response.status === 201) {
        setPodcastData(response.data)
        console.log(podcastData)
      }
    } catch (error) {
      console.error(error)
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      {podcastData ? (
        <MyAudioPlayer
        usage="podcastPage"
        podcast={podcastData}
        />
      ) : (
        <Button
          variant={'primary'}
          className='mt-4 flex '
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? <Loader size={25} /> : 'Generate Podcast'}
        </Button>
      )}

    </div>

  )
}

export default PodcastGenerator
