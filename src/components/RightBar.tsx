import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import SidebarCarousel from "./SidebarCarousel";
import { getLatestPodcasts, getTopPodcasters } from "@/app/actions/podcasts.actions";
import UserCard from "./UserCard";
import { Podcast } from "@prisma/client";

interface RightBarProps {
  currUser: User | null;
}
const RightBar = async ({ currUser }: RightBarProps) => {

  const latestPodcasts = await getLatestPodcasts();
  const topPodcasters = await getTopPodcasters();

  return (
    <aside className='hidden xl:flex flex-col xl:w-1/4 bg-dark-secondary px-10 py-6' >
      <div className="w-full">
        {currUser ? (
          <div className="flex items-center justify-between w-full" >
            <div className="flex items-center gap-4">
              <Image
                src={currUser?.imageUrl}
                width={60}
                height={60}
                alt='profile'
                className='rounded-full'
              />
              <h5 className="font-semibold text-base">{currUser?.fullName}</h5>
            </div>

            <div className="flex">
              <Image src={'/chevron.svg'} width={30} height={30} alt='chevron' />
            </div>

          </div>
        ) : (
          <p>Not signed in</p>
        )}

      </div >

      <div>
        <div className="flex w-full justify-between items-center py-10">
          <h5 className="text-lg font-bold">Fans Also Like</h5>
          <p className="text-orange font-semibold">See All</p>
        </div>

        <SidebarCarousel latestPodcasts={latestPodcasts} />
      </div>

      <div>
        <div className="flex w-full justify-between items-center py-10">
          <h5 className="text-lg font-bold">Top Podcasters</h5>
          <p className="text-orange font-semibold">See All</p>
        </div>

        <div className="flex flex-col gap-4">
          {topPodcasters.map((podcaster: any) => {
            return (
              <UserCard
                key={podcaster.id}
                data={podcaster} />
            )
          })}
        </div>
      </div>
    </aside >
  )
}

export default RightBar
