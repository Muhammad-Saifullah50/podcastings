"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
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
import Image from "next/image"
import FileUploader from "../FileUploader"

const PodcastForm = () => {
    {}
    const form = useForm<z.infer<typeof PodcastSchema>>({
        resolver: zodResolver(PodcastSchema),
    })

    function onSubmit(values: z.infer<typeof PodcastSchema>) {
        console.log(values)
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
                                            <SelectValue placeholder="Select a category for your podcast" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="m@example.com">m@example.com</SelectItem>
                                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                                        <SelectItem value="m@support.com">m@support.com</SelectItem>
                                    </SelectContent>
                                </Select>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="podcastVoice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Podcast voice</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a voice for your podcast" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="m@example.com">m@example.com</SelectItem>
                                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                                        <SelectItem value="m@support.com">m@support.com</SelectItem>
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
                        <FormItem className="font-bold">
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
                        <TabsTrigger value="thumbnail" className="font-bold text-white">AI prompt to generate thumbnail</TabsTrigger>
                        <TabsTrigger value="upload" className="font-bold text-white">Upload custom image</TabsTrigger>
                    </TabsList>

                    <TabsContent value="thumbnail">
                        <FormField
                            control={form.control}
                            name="thumbnailPrompt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder="Write a promopt to generate a thumbnail for your podcast" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TabsContent>
                    <TabsContent value="upload">
                        <FormField
                            control={form.control}
                            name="thumbnailImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <FileUploader files={field.value} onChange={field.onChange}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TabsContent>
                </Tabs>

                <Button type="submit" variant={'primary'} className="w-full hover:bg-orange/90">Submit & publish podcast</Button>
            </form>
        </Form>
    )
}

export default PodcastForm
