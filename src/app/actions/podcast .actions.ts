interface createPodcastParams {
    podcastTitle: string  
    podcastCategory: string,
    podcastDescription: string
    thumbnailImage: string | File | undefined,
}
export const createPodcast = async (data: createPodcastParams) => {

}