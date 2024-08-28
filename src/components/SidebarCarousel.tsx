'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import { Podcast } from "@prisma/client"
import Image from "next/image"


const SidebarCarousel = ({ latestPodcasts }: { latestPodcasts: Podcast[] }) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
      <CarouselContent>
        {latestPodcasts.map((podcast) => (
          <CarouselItem key={podcast.id} className=" w-full h-full flex items-center justify-center">
            <Image
              src={podcast.thumbnailImage}
              width={200}
              height={200}
              alt='podcast'
              className="rounded-lg object-cover"
            />
          </CarouselItem>

        ))}
      </CarouselContent>

    </Carousel>

  )
}

export default SidebarCarousel
