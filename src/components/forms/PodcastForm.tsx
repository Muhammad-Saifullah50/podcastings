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
import { createPodcast } from "@/app/actions/podcast.actions"
import { fileToDataUrl } from "@/lib/utils"

interface PodcastFormProps {
    categories: {
        id: string
        name: string
    }[]
}
const PodcastForm = ({ categories }: PodcastFormProps) => {
    const form = useForm<z.infer<typeof PodcastSchema>>({
        resolver: zodResolver(PodcastSchema),
        defaultValues: {
            podcastTitle: "",
            podcastCategory: "",
            podcastDescription: "",
            podcastPrompt: "",
            thumbnailPrompt: '',
            thumbnailImage: undefined,
        }
    });

    const [generatedImageUrl, setGeneratedImageUrl] = useState("")
    const [uploadedImage, setUploadedImage] = useState(undefined)
    const [loading, setLoading] = useState(false)



    async function onSubmit(values: z.infer<typeof PodcastSchema>) {
        try {
            setLoading(true)

            if (values.thumbnailImage instanceof File) {
                const imageDataUrl = await fileToDataUrl(values.thumbnailImage);
                form.setValue('thumbnailImage', imageDataUrl);
            }
            const data = {
                podcastTitle: values.podcastTitle,
                podcastCategory: values.podcastCategory,
                podcastDescription: values.podcastDescription,
                thumbnailImage: values.thumbnailImage,
            };
            await createPodcast(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const generateThumbnail = async (value: string) => {
        try {
            setLoading(true)
            const url = await generateAIThumbnail(value)
            setGeneratedImageUrl(url || '')
            form.setValue('thumbnailImage', url);

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
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
                                <Textarea placeholder="Write a short description for your podcast" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="podcastPrompt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">AI prompt to generate podcast</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write a promopt to generate your podcast" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Tabs defaultValue="thumbnail">
                    <TabsList >
                        <TabsTrigger
                            value="thumbnail"
                            className="font-bold text-white"
                            disabled={uploadedImage ? true : false}>AI prompt to generate thumbnail</TabsTrigger>
                        <TabsTrigger
                            value="upload"
                            className="font-bold text-white"
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
                                            disabled={!field.value || field.value.length < 10}
                                            onClick={() => generateThumbnail(field.value as string)}>
                                            {loading ? <Loader size={25} /> : 'Generate'}
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
                                            uploadedImage={uploadedImage}
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
                    disabled={!generatedImageUrl && !uploadedImage}
                    type="submit"
                    variant={'primary'}
                    className="w-full">
                    {loading ? <Loader size={25} /> : 'Submit & publish podcast'}
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
