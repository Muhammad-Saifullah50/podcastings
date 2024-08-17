'use client'

import { Podcast, User } from '@prisma/client';
import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


type AudioPlayerProps = {
  podcast?: Podcast & { User: User }
}
const MyAudioPlayer = ({ podcast }: AudioPlayerProps) => {

  return (
    <AudioPlayer
      src={podcast?.audioUrl!}
    />
  )
}

export default MyAudioPlayer
