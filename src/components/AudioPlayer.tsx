'use client'

import { Podcast } from '@prisma/client';
import React from 'react'
import { AudioPlayer as ReactAudioPlayer } from 'react-modern-audio-player';

type AudioPlayerProps = {
    podcast?: Podcast
}
const AudioPlayer =  ({ podcast }: AudioPlayerProps) => {

    const playlist = [
        {
            name: podcast?.podcastTitle,
            src: podcast?.audioUrl,
            img: podcast?.thumbnailImage,
            id: podcast?.id,
            writer: podcast?.User.username
        }
    ]
    return (
        <AudioPlayer
        playList={playlist}
        audioInitialState={{
          muted: true,
          volume: 0.2,
          curPlayId: 1,
        }}
        placement={{
          interface: {
            templateArea: {
              trackTimeDuration: "row1-5",
              progress: "row1-4",
              playButton: "row1-6",
              repeatType: "row1-7",
              volume: "row1-8",
            },
          },
          player: "bottom-left",
        }}
        activeUI={{
          all: true,
          progress: "waveform",
        }}
      />
    )
}

export default AudioPlayer
