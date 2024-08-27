'use client'
import { deletePodcast } from "@/app/actions/podcasts.actions";
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

type DropDownMenuProps = {
    podcastId: string
    setPlaying?: (playing: boolean) => void
    usage: 'actions' | 'play'
    userId?: string
};

const DropDownMenu = ({ usage, podcastId, userId, setPlaying }: DropDownMenuProps) => {
    const router = useRouter();

    const handleDelete = async () => {
        await deletePodcast(podcastId, userId!)
        router.push('/podcasts')
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Image
                        src={usage === 'play' ? '/dots.svg' : '/dotsvertical.svg'}
                        alt='dots'
                        width={20}
                        height={20}
                        className="max-h-5"

                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>More Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {usage === 'play' ? (
                        <>
                            {setPlaying && (
                                <DropdownMenuItem
                                    onClick={() => setPlaying(true)}>
                                    Play
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                                onClick={() => router.push(`/podcasts/${podcastId}`)}>
                                Details
                            </DropdownMenuItem>
                        </>) : (<>
                            <DropdownMenuItem onClick={() => router.push(`/edit-podcast/${podcastId}`)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleDelete}
                            >
                                Delete
                            </DropdownMenuItem>
                        </>)}

                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}

export default DropDownMenu
