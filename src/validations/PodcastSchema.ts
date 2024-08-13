import { z } from "zod"

const PodcastSchema = z.object({
    podcastTitle: z.string().min(2, {
        message: "Podcast title must be at least 2 characters.",
    }).max(50),
    podcastCategory: z.string().min(2, {
        message: "Podcast category is required.",
    }).max(50),
    podcastVoice: z.string().min(1, {
        message: "Podcast voice is required.",
    }),
    podcastDescription: z.string().min(1, {
        message: "Description is required.",
    }),
    podcastPrompt: z.string().min(10, {
        message: "Podcast prompt must be at least 10 characters.",
    }),
    thumbnailPrompt: z.string().min(10, {
        message: "Thumbnail prompt must be at least 10 characters.",
    }).optional(),
    thumbnailImage: z.string({
        message: "Thumbnail image is required or generate by AI.",
    }).url().optional(),
}).refine(data => data.thumbnailPrompt || data.thumbnailImage, {
    message: "Either thumbnail prompt or thumbnail image is required.",
});

export default PodcastSchema