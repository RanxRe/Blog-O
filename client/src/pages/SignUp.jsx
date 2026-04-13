import React from 'react'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet, FieldError } from "@/components/ui/field"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { Link, useNavigate } from 'react-router'
import { RouteSignIn } from '@/helpers/routeName'
import { getEnvName } from '@/helpers/getEnvName'
import { showToast } from '@/helpers/showToast'
import GoogleLogin from '@/components/GoogleLogin'



const SignUp = () => {

    const navigate = useNavigate()

    const formSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        email: z.email("Enter a valid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string()
    }).refine(data => data.password === data.confirmPassword,
        {
            message: "Password and Confirm Password must be same.",
            path: ["confirmPassword"] //shows error under this field
        })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    async function onSubmit(values) {
        try {
            const response = await fetch(`${getEnvName('VITE_API_BASE_URL')}/auth/signup`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(values)
            })
            const data = await response.json()
            if (!response.ok) {
                showToast('error', data.message)
                return
            }
            navigate(RouteSignIn)
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
        console.log(values)
    }

    return (
        <div className='flex justify-center items-center h-screen w-screen my-20'>
            <Card className="w-full md:max-w-md p-4">
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        Connect with Blog-O
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className=''>
                        <GoogleLogin />
                        <div className='border-t-2 my-5 flex justify-center items-center'>
                            <span className='absolute bg-white text-sm' >OR</span>
                        </div>
                    </div>
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
                                            Enter your Name
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

                            {/* CONFIRMPASSWORD FIELD */}
                            <Controller
                                name="confirmPassword"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="confirmPassword">confirm Password</FieldLabel>

                                        <Input
                                            {...field}
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            aria-invalid={fieldState.invalid}
                                        />

                                        {/* <FieldDescription>
                                            Must be at least 8 characters
                                        </FieldDescription> */}

                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <Button type="submit" className="w-full cursor-pointer">Sign In</Button>
                        <div className='flex justify-center mt-4'>
                            <CardDescription>Already have an account? <Link className='text-stone-900 hover:underline' to={RouteSignIn} > Log in</Link></CardDescription>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUp