import React from 'react'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet, FieldError } from "@/components/ui/field"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { Link, useNavigate } from 'react-router'
import { RouteIndex, RouteSignUp } from '@/helpers/routeName'
import { getEnvName } from '@/helpers/getEnvName'
import { showToast } from '@/helpers/showToast'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/user/user.slice'
import GoogleLogin from '@/components/GoogleLogin'

const formSchema = z.object({
    email: z.email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

const SignIn = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

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
            navigate(RouteIndex)
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
        console.log(values)
    }

    return (
        <div className='flex justify-center gap-2 items-center h-screen w-screen'>
            <div className=' md:w-100' ><img src="src/assets/images/brand-logo-light.png" alt="logo" /></div>
            <Card className="w-full md:max-w-md">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>
                        Access your account..
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
                        </FieldGroup>
                        <Button type="submit" className="w-full">Sign In</Button>
                        <div className='flex justify-center mt-4'>
                            <CardDescription>Don&apos;t have an account? <Link className='text-stone-900 hover:underline' to={RouteSignUp} > Create account</Link></CardDescription>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignIn