"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import PodcastSchema from "@/validations/PodcastSchema"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import FileUploader from "../FileUploader"
import { generateAIThumbnail } from "@/app/actions/image.actions"
import { useState } from "react"
import Image from "next/image"
import Loader from "../Loader"
import { fileToDataUrl } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Podcast } from "@prisma/client"

interface PodcastFormProps {
    categories: {
        id: string
        name: string
    }[]
    action: 'create' | 'edit';
    podcast: Podcast;
}
const PodcastForm = ({ action, podcast, categories }: PodcastFormProps) => {
    const form = useForm<z.infer<typeof PodcastSchema>>({
        resolver: zodResolver(PodcastSchema),
        defaultValues: {
            podcastTitle: podcast?.podcastTitle || "",
            podcastCategory: podcast?.category || "",
            podcastDescription: podcast?.podcastDescription || "",
            podcastTranscription: podcast?.podcastTranscription || "",
            thumbnailPrompt: podcast?.thumbnailPrompt || '',
            thumbnailImage: podcast?.thumbnailImage || undefined,
        }
    });

    const [generatedImageUrl, setGeneratedImageUrl] = useState("")
    const [uploadedImage, setUploadedImage] = useState(undefined)
    const [formLoading, setFormLoading] = useState(false)
    const [thumbnailLoading, setThumbnailLoading] = useState(false)

    const router = useRouter();

    const generateThumbnail = async (value: string) => {
        try {
            setThumbnailLoading(true)
            const url = await generateAIThumbnail(value)
            setGeneratedImageUrl(url || '')
            form.setValue('thumbnailImage', url);

        } catch (error) {
            console.error(error)
        } finally {
            setThumbnailLoading(false)
        }
    }


    async function onSubmit(values: z.infer<typeof PodcastSchema>) {
        try {
            setFormLoading(true)

            let thumbnailImage = values.thumbnailImage;
            if (thumbnailImage instanceof File || (thumbnailImage && typeof thumbnailImage === 'object' && 'path' in thumbnailImage)) {

                thumbnailImage = await fileToDataUrl(thumbnailImage);
                form.setValue('thumbnailImage', thumbnailImage);
            }
            const data = {
                podcastTitle: values.podcastTitle,
                category: values.podcastCategory,
                podcastDescription: values.podcastDescription,
                podcastTranscription: values.podcastTranscription,
                thumbnailPrompt: values.thumbnailPrompt,
                thumbnailImage: thumbnailImage,
            };

            if (action === 'create') {
                const request = await fetch('/api/podcasts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const podcast = await request.json();


                router.push(`/podcasts/${podcast?.data?.id}`);
            };

            const updatedData = {
                id: podcast.id,
                podcastTitle: values.podcastTitle,
                category: values.podcastCategory,
                podcastDescription: values.podcastDescription,
                podcastTranscription: values.podcastTranscription,
                thumbnailPrompt: values.thumbnailPrompt,
                thumbnailImage: thumbnailImage,
            }

            if (action === 'edit') {
                const request = await fetch('/api/podcasts', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                });

                const podcast = await request.json();


                router.push(`/podcasts/${podcast?.data?.id}`);
            }

            //todo: error dispplay through toast
        } catch (error) {
            console.error(error)
        } finally {
            setFormLoading(false)
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="podcastTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Podcast title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nextjs Podcast" {...field}
                                    className="placeholder:text-light-secondary placeholder:font-normal text-white font-bold"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="podcastCategory"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Category</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Select a category for your podcast"
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.name} >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="podcastDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Podcast Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write a short description for your podcast" {...field} rows={10} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="podcastTranscription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Transcript to generate podcast</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write a transcript to generate speech for your podcast" {...field} rows={15} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Tabs defaultValue="thumbnail">
                    <TabsList className="flex-col md:flex gap-4">
                        <TabsTrigger
                            value="thumbnail"
                            className="font-bold text-white flex justify-start"
                            disabled={uploadedImage ? true : false}>AI prompt to generate thumbnail
                        </TabsTrigger>
                        <TabsTrigger
                            value="upload"
                            className="font-bold text-white flex justify-start"
                            disabled={generatedImageUrl ? true : false}>Upload custom image</TabsTrigger>
                    </TabsList>

                    <TabsContent value="thumbnail">
                        {generatedImageUrl ? (
                            <Image
                                src={generatedImageUrl}
                                width={200}
                                height={200}
                                alt="AI generated thumbnail"
                                className="mx-auto object-contain"
                            />
                        ) : (
                            <FormField
                                control={form.control}
                                name="thumbnailPrompt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea placeholder="Write a promopt to generate a thumbnail for your podcast"
                                                {...field}
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            variant={'primary'}
                                            disabled={!field.value || field.value.length < 10 || thumbnailLoading}
                                            onClick={() => generateThumbnail(field.value as string)}>
                                            {thumbnailLoading ? <Loader size={25} /> : 'Generate'}
                                        </Button>
                                        <FormDescription className="text-light-secondary text-sm">Due to rate limits, you can generate only once</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                    </TabsContent>
                    <TabsContent value="upload">
                        <FormField
                            control={form.control}
                            name="thumbnailImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <FileUploader
                                            //@ts-ignore
                                            files={field.value}
                                            onChange={field.onChange}
                                            uploadedImage={uploadedImage || podcast?.thumbnailImage}
                                            setUploadedImage={setUploadedImage} />
                                    </FormControl>
                                    {uploadedImage && (
                                        <FormDescription className="text-light-secondary text-sm">Click again to change the image</FormDescription>
                                    )}

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TabsContent>
                </Tabs>

                <Button
                    disabled={!generatedImageUrl && !uploadedImage && !podcast?.thumbnailImage || formLoading}
                    type="submit"
                    variant={'primary'}
                    className="w-full">
                    {formLoading ? <Loader size={25} /> : `Submit & ${action === 'create' ? 'publish' : 'edit'} podcast`}
                </Button>

                {!generatedImageUrl && !uploadedImage &&
                    (<FormDescription
                        className="text-light-secondary text-sm relative bottom-6">The button will be enabled after you have generated or uploaded an image
                    </FormDescription>)}
            </form>
        </Form>
    )
}

export default PodcastForm
