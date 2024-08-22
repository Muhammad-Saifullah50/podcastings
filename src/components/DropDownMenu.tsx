'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import MyAudioPlayer from "./AudioPlayer"

type DropDownMenuProps = {
    podcastId: string
    setPlaying: (playing: boolean) => void
};

const DropDownMenu = ({ podcastId, setPlaying }: DropDownMenuProps) => {
    const router = useRouter();
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Image
                        src={'/dots.svg'}
                        alt='dots'
                        width={20}
                        height={20}
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>More Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setPlaying(true)}>
                        Play
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push(`/podcasts/${podcastId}`)}>
                        Details
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}

export default DropDownMenu
