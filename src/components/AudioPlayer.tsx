'use client'

import { incrementNoOfPlays } from '@/app/actions/podcasts.actions';
import { Podcast, User } from '@prisma/client';
import Image from 'next/image';
import React, { useRef } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


type AudioPlayerProps = {
  podcast?: Podcast & { User: User }
  usage: 'podcastPage' | 'bottom' | 'top'
}
const MyAudioPlayer = ({ podcast, usage }: AudioPlayerProps) => {
  const hasPlayedOnce = useRef(false);

  const playerStyles = () => {
    switch (usage) {
      case 'podcastPage':
        return {
          backgroundColor: 'transparent',
          color: '#F97535',
          marginTop: '20px',
          borderRadius: '8px'
        }

      case 'bottom':
        return {
          width: '100%',
          background: 'transparent',
          backdropFilter: 'blur(100px)',
        }
      case 'top':
        return {
          width: '100%',
          height: '50px',
        }
    }

  };

  const handlePlay = () => {
    if (!hasPlayedOnce.current) {
      hasPlayedOnce.current = true;
      incrementNoOfPlays(podcast?.id!);
    }
  };

  const customIcons = {
    play: <Image src={'/playbtn.svg'} alt='Play' width={40} height={40} />,
    pause: <Image src={'/pause.svg'} alt='pause' width={40} height={40} />,
    rewind: <Image src={'/previous.svg'} alt='pause' width={25} height={25} />,
    forward: <Image src={'/gonext.svg'} alt='pause' width={25} height={25} />,
    loopOff: <Image src={'/loopoff.svg'} alt='pause' width={25} height={40} />,
    volume: <Image src={'/volume.svg'} alt='pause' width={25} height={25} />,
    volumeMute: <Image src={'/volume-slash.svg'} alt='pause' width={25} height={25} />,
  }
  return (
    <AudioPlayer
      src={podcast?.audioUrl!}
      style={playerStyles()}
      onPlay={handlePlay}
      autoPlay={usage === 'bottom'}
      customIcons={customIcons}
    />
  )
}

export default MyAudioPlayer
