import { z } from "zod";

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
        message: "Thumbnail prompt must be at least 10 characters." 
    }).optional(),
    thumbnailImage: z.custom<File[]>().refine(files => files.length > 0, {
        message: "Thumbnail image is required.",
    }).optional(),
}).refine(data => { console.log(data); data.thumbnailPrompt !== '' || (data.thumbnailImage && data.thumbnailImage.length > 0)}, {
    message: "Either thumbnail prompt or thumbnail image is required.",
});

export default PodcastSchema;
