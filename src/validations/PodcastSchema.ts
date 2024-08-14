import { z } from "zod";

const PodcastSchema = z.object({
  podcastTitle: z.string()
    .min(2, { message: "Podcast title must be at least 2 characters." })
    .max(50, { message: "Podcast title must be at most 50 characters." }),
  
  podcastCategory: z.string()
    .min(2, { message: "Podcast category must be at least 2 characters." })
    .max(50, { message: "Podcast category must be at most 50 characters." }),
  
  podcastDescription: z.string()
    .min(1, { message: "Description is required." }),
  
  podcastPrompt: z.string()
    .min(10, { message: "Podcast prompt must be at least 10 characters." })
    .optional(),
  
  thumbnailPrompt: z.string().optional(),
  
  thumbnailImage: z.union([
    z.string().url({ message: "Thumbnail image must be a valid URL." }),
    z.custom<File>()
  ]).optional(),

}).refine(data => data.thumbnailImage, {
  message: "Thumbnail image must be provided.",
});

export default PodcastSchema;
