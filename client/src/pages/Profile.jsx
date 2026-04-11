import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { file, set, z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { getEnvName } from '@/helpers/getEnvName'
import { showToast } from '@/helpers/showToast'
import { useDispatch, useSelector } from 'react-redux'
import { CameraIcon, User2Icon } from 'lucide-react'
import { useFetch } from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import Dropzone from 'react-dropzone'
import { setUser } from '@/redux/user/user.slice'


const formSchema = z.object({
    name: z.string("Enter a valid email address").min(3, "Name is too short"),
    email: z.email("Enter a valid email address"),
    bio: z.string("Enter a valid email address").min(10, "Bio must contain at least 10 character long").max(200, "Bio is too long (200 words max)."),
    password: z.string().min(8, "Password must be at least 8 characters long") // optional
})

const Profile = () => {

    const [filePreview, setFilePreview] = useState()
    const [file, setFile] = useState()
    const user = useSelector((state) => state.user)
    const { data: userData, loading, error } = useFetch(`${getEnvName("VITE_API_BASE_URL")}/user/get-user-detail/${user?.user?._id}`,
        {
            method: 'get',
            credentials: 'include'
        })

    const dispatch = useDispatch()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            bio: "",
            password: "",
        }
    })

    useEffect(() => {
        if (userData?.success) {
            form.reset({
                name: userData?.user.name,
                email: userData?.user.email,
                bio: userData?.user.bio,
            })
        }
    }, [userData])

    useEffect(() => {
        return () => {
            if (filePreview) {
                URL.revokeObjectURL(filePreview)
            }
        }
    }, [filePreview])

    async function onSubmit(values) {
        try {
            const formData = new FormData()
            // for media append
            formData.append('file', file)
            // for text data, values should be srnt in JSON string
            formData.append('data', JSON.stringify(values))

            const response = await fetch(`${getEnvName('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`, {
                method: 'put',
                // headers: { 'Content-type': 'application/json' }, will be multipart data which is done automatically so removing it
                credentials: 'include',
                // formData will be sent from bofy
                body: formData
            })
            const data = await response.json()
            if (!response.ok) {
                showToast('error', data.message)
                return
            }
            dispatch(setUser(data.user))
            // navigate(RouteIndex)
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
        console.log(values)
    }

    const handleFileSelection = (files) => {
        if (!files || files.length == 0) return
        const file = files[0]
        const preview = URL.createObjectURL(file)
        // need to send file(image) into form so we are setting it into file variable
        setFile(file)
        setFilePreview(preview)
    }

    if (loading) return <Loading />

    return (
        <Card className="max-w-screen-md mx-auto">
            <CardContent>
                <div className='flex justify-center items-center mt-10'>

                    <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (

                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Avatar className="w-28 h-28 relative group">
                                    <AvatarImage src={filePreview ? filePreview : userData?.user?.avatar} />
                                    <div className='absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center overflow-hidden border-4 border-stone-400 cursor-pointer rounded-full group-hover:flex hidden'>
                                        <CameraIcon className='text-gray-400' />
                                    </div>
                                    <AvatarFallback>{<User2Icon />}</AvatarFallback>
                                </Avatar>
                            </div>

                        )}
                    </Dropzone>

                </div>
                <div>
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
                                            placeholder="John Doe"
                                            aria-invalid={fieldState.invalid}
                                        />

                                        <FieldDescription>
                                            Enter your name
                                        </FieldDescription>

                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            {/* EMAIL FIELD */}
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>

                                        <Input
                                            {...field}
                                            id="email"
                                            type="email"
                                            placeholder="example@mail.com"
                                            aria-invalid={fieldState.invalid}
                                        />

                                        <FieldDescription>
                                            Enter your email
                                        </FieldDescription>

                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* BIO FIELD */}
                            <Controller
                                name="bio"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="bio">Bio</FieldLabel>

                                        <Textarea
                                            {...field}
                                            id="bio"
                                            type="text"
                                            placeholder="Tell us about you..."
                                            aria-invalid={fieldState.invalid}
                                        />

                                        <FieldDescription>
                                            Enter your bio. Max 200
                                        </FieldDescription>

                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* PASSWORD FIELD */}
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>

                                        <Input
                                            {...field}
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            aria-invalid={fieldState.invalid}
                                        />

                                        <FieldDescription>
                                            Must be at least 8 characters
                                        </FieldDescription>

                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <Button type="submit" className="w-full cursor-pointer mt-5">Save Profile</Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    )
}

export default Profile