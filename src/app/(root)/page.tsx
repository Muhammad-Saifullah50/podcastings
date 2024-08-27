import PodcastCard from "@/components/PodcastCard";
import { getLatestPodcasts, getTrendingPodcasts } from "../actions/podcasts.actions";
import { Podcast } from "@prisma/client";
import LatestPodcastCard from "@/components/LatestPodcastCard";
import Link from "next/link";

export default async function Home() {

  const latestPodcasts = await getLatestPodcasts();
  const trendingPodcasts = await getTrendingPodcasts();

  return (
    <main className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-4">
        <h2 className='text-2xl font-bold'>Trending Podcasts</h2>

        <div className="flex items-center flex-wrap justify-start w-full">
          {trendingPodcasts.map((podcast: Podcast & { User: { username: string } }) => (
            <PodcastCard
              key={podcast.id}
              podcastData={podcast}
              podcastUsername={podcast.User.username} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className='text-2xl font-bold'>Latest Podcasts</h2>
          <Link
            href={'/discover'}
            className="font-semibold text-orange">
            See All
          </Link>
        </div>

        <div className="mt-4">
          <ol className="flex flex-col gap-8">
            {latestPodcasts.map((podcast: Podcast & { User: { username: string } }, index: number) => (
              <LatestPodcastCard
                key={podcast.id}
                podcastData={podcast}
                index={index}
              />
            ))}
          </ol>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className='text-2xl font-bold'>Popular Podcasts</h2>

        <div className="flex items-center justify-start w-full flex-wrap">
          {trendingPodcasts.map((podcast: Podcast & { User: { username: string } }) => (
            <PodcastCard
              key={podcast.id}
              podcastData={podcast}
              podcastUsername={podcast.User.username} />
          ))}
        </div>
      </section>
    </main>
  );
}
