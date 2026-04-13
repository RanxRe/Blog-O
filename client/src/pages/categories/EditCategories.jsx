import React, { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import slugify from "slugify"
import { showToast } from '@/helpers/showToast'
import { getEnvName } from '@/helpers/getEnvName'
import { useParams } from 'react-router'
import { useFetch } from '@/hooks/useFetch'


const EditCategories = () => {

    const { categoryId } = useParams()

    const { data: categoryData, loading, error } = useFetch(`${getEnvName('VITE_API_BASE_URL')}/category/get/${categoryId}`, {
        method: 'get',
        credentials: "include"
    }, [categoryId])

    const formSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        slug: z.string().min(3, "Slug must be at least 3 characters"),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
        }
    })

    const categoryName = form.watch("name")

    useEffect(() => {
        if (categoryName) {
            const slug = slugify(categoryName, { lower: true })
            form.setValue('slug', slug)
        }
        else {
            form.setValue("slug", "")
        }
    }, [categoryName, form])

    useEffect(() => {
        if (categoryData) {
            form.setValue("name", categoryData?.category.name)
            form.setValue("slug", categoryData?.category.slug)
        }
    }, [categoryData])

    async function onSubmit(values) {
        try {
            const response = await fetch(`${getEnvName('VITE_API_BASE_URL')}/category/update/${categoryId}`, {
                method: 'put',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(values)
            })
            const data = await response.json()
            if (!response.ok) {
                showToast('error', data.message)
                return
            }
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
        console.log(values)
    }

    return (
        <div className='flex justify-center items-center max-w-screen mx-auto'>
            <Card className="w-full md:max-w-md p-4">
                <CardHeader>
                    <CardTitle>Edit Category</CardTitle>
                    <CardDescription>
                        Edit existing categories
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FieldGroup>
                            {/* NAME FIELD */}
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="name">Name</FieldLabel>

                                        <Input
                                            {...field}
                                            id="name"
                                            type="text"
                                            placeholder="Category name"
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

                        </FieldGroup>
                        <Button type="submit" className="w-full cursor-pointer">Save</Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditCategories