'use client'

import { Podcast, User } from '@prisma/client';
import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


type AudioPlayerProps = {
  podcast?: Podcast & { User: User }
  usage: 'podcastPage' | 'bottom' | 'top'
}
const MyAudioPlayer = ({ podcast, usage }: AudioPlayerProps) => {

  const playerStyles = () => {
    switch (usage) {
      case 'podcastPage':
        return {backgroundColor: '#232429', color: '#F97535', marginTop: '20px', borderRadius: '8px'}

      case 'bottom':
        return {
          width: '100%',
          height: '50px',
        }
      case 'top':
        return {
          width: '100%',
          height: '50px',
        }
    }

  }
  return (
    <AudioPlayer
      src={podcast?.audioUrl!}
      style={playerStyles()}
    />
  )
}

export default MyAudioPlayer
