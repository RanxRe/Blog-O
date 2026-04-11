import React, { useEffect } from 'react'
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { getEnvName } from '@/helpers/getEnvName'
import { showToast } from '@/helpers/showToast'
import { useDispatch, useSelector } from 'react-redux'
import { CameraIcon, User2Icon } from 'lucide-react'
import { useFetch } from '@/hooks/useFetch'
import Loading from '@/components/Loading'


const formSchema = z.object({
    name: z.string("Enter a valid email address").min(3, "Name is too short"),
    email: z.email("Enter a valid email address"),
    bio: z.string("Enter a valid email address").min(10, "Bio must contain at least 10 character long").max(200, "Bio is too long (200 words max)."),
    password: z.string() // optional
})

const Profile = () => {

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

    async function onSubmit(values) {
        try {
            const response = await fetch(`${getEnvName('VITE_API_BASE_URL')}/auth/signin`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
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

    if (loading) return <Loading />

    return (
        <Card className="max-w-screen-md mx-auto">
            <CardContent>
                <div className='flex justify-center items-center mt-10'>
                    <Avatar className="w-28 h-28 relative group">
                        <AvatarImage src={userData?.user?.avatar} />
                        <div className='absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center overflow-hidden border-4 border-stone-400 cursor-pointer rounded-full group-hover:flex hidden'>
                            <CameraIcon className='text-gray-400' />
                        </div>
                        <AvatarFallback>{<User2Icon />}</AvatarFallback>
                    </Avatar>

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