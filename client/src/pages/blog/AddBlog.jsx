import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import slugify from "slugify"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { showToast } from '@/helpers/showToast'
import { getEnvName } from '@/helpers/getEnvName'
import { useFetch } from '@/hooks/useFetch'
import Dropzone from 'react-dropzone'
import Editor from '@/components/Editor'


const AddBlog = () => {

    const [filePreview, setFilePreview] = useState()
    const [file, setFile] = useState()

    const { data: categoryData, loading, error } = useFetch(`${getEnvName('VITE_API_BASE_URL')}/category/get-all`, {
        method: 'get',
        credentials: 'include'
    })
    console.log(categoryData)

    const formSchema = z.object({
        title: z.string().min(3, "Title must be at least 3 characters"),
        category: z.string().min(3, "Category must be at least 3 characters"),
        blogContent: z.string().min(3, "Blog Content must be at least 3 characters"),
        slug: z.string().min(3, "Slug must be at least 3 characters"),
        // image: z.string()
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            slug: "",
            category: "",
            // image: "",
            blogContent: "",
        }
    })

    const handleFileSelection = (files) => {
        if (!files || files.length == 0) return
        const file = files[0]
        const preview = URL.createObjectURL(file)
        // need to send file(image) into form so we are setting it into file variable
        setFile(file)
        setFilePreview(preview)
    }

    const blogTitle = form.watch("title")

    useEffect(() => {
        if (blogTitle) {
            const slug = slugify(blogTitle, { lower: true })
            form.setValue('slug', slug)
        }
        else {
            form.setValue("slug", "")
        }
    }, [blogTitle, form])

    async function onSubmit(values) {
        // try {
        //     const response = await fetch(`${getEnvName('VITE_API_BASE_URL')}/category/add`, {
        //         method: 'post',
        //         headers: { 'Content-type': 'application/json' },
        //         body: JSON.stringify(values)
        //     })
        //     const data = await response.json()
        //     if (!response.ok) {
        //         showToast('error', data.message)
        //         return
        //     }
        //     showToast('success', data.message)
        //     form.reset()
        // } catch (error) {
        //     showToast('error', error.message)
        // }
        // console.log(values)
    }
    return (
        <div className='flex justify-center items-center'>
            <Card className="w-250 p-4">
                <CardHeader>
                    <CardTitle>Create Post</CardTitle>
                    <CardDescription>
                        Create a new Post
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FieldGroup>
                            {/* NAME FIELD */}
                            <Controller
                                name="title"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="title">Title</FieldLabel>

                                        <Input
                                            {...field}
                                            id="title"
                                            type="text"
                                            placeholder="Suitable title for your post"
                                            aria-invalid={fieldState.invalid}
                                        />

                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />



                            {/* SLUG FIELD */}
                            <Controller
                                name="slug"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="slug">Slug</FieldLabel>

                                        <Input
                                            {...field}
                                            id="slug"
                                            type="text"
                                            placeholder="Slug"
                                            disabled
                                            aria-invalid={fieldState.invalid}
                                        />

                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />


                            {/* CATEGORY FIELD */}
                            <Controller
                                name="category"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="category">Category</FieldLabel>

                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="max-w-50 cursor-pointer">
                                                <SelectValue placeholder="Select category">
                                                    {
                                                        categoryData?.category?.find(
                                                            (cat) => cat._id === field.value
                                                        )?.name
                                                    }
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Categories</SelectLabel>
                                                    {
                                                        categoryData?.category?.map((cat) => (
                                                            <SelectItem key={cat._id} value={cat._id}>
                                                                {cat.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* IMAGE FIELD */}
                            <div className='mb-3 w-40' >
                                <span className='font-bold'>Featured Image</span>
                                <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                                    {({ getRootProps, getInputProps }) => (

                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className=' my-2 cursor-pointer flex overflow-hidden justify-center items-center w-36 h-36 border-2 border-dashed rounded' >
                                                <img src={filePreview} />
                                            </div>
                                        </div>

                                    )}
                                </Dropzone>
                            </div>
                            {/* </Controller> */}

                            {/* <div className='mb-3' >
                                
                            </div> */}

                            {/* SLUG FIELD */}
                            <Controller
                                name="blogContent"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="blogContent">Write post</FieldLabel>

                                        <Editor props={{ initialData: "" }} />

                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <Button type="submit" className="w-full cursor-pointer">Add</Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddBlog