'use client'

import { getAudioDuration } from "@/lib/utils"
import { useEffect, useState } from "react"

const AudioDuration = ({ audioUrl }: { audioUrl: string }) => {
    const [audioDuration, setAudioDuration] = useState(0);

    useEffect(() => {

        const fetchDuration = async () => {
            const audioDuration = await getAudioDuration(audioUrl)
            setAudioDuration(audioDuration);
        };

        fetchDuration();
    }, [audioUrl])

    const durationInSeconds = audioDuration.toFixed(2).replace('.', ':');
    return (
        <span>
            {audioDuration ? durationInSeconds : null}
        </span>
    )
}

export default AudioDuration
