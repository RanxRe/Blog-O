import React, { useState } from 'react'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import logoLight from "@/assets/images/brand-logo-light.png"
import logoDark from "@/assets/images/brand-logo-dark1.png"
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
import { useTheme } from '@/components/theme-provider'
import { Spinner } from '@/components/ui/spinner'

const formSchema = z.object({
    email: z.email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

const SignIn = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { setTheme, theme } = useTheme()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    async function onSubmit(values) {
        setLoading(true)
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
                setLoading(false)
                return
            }
            dispatch(setUser(data.user))
            navigate(RouteIndex)
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setLoading(false)
        }
        // console.log(values)
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4 py-10'>

            <div className='w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>

                {/* LEFT SIDE - DESKTOP LOGO */}
                <div className='hidden md:flex flex-col items-center justify-center'>

                    <Link to={RouteIndex}>
                        <img
                            src={theme === "dark" ? logoDark : logoLight}
                            alt="logo"
                            className='w-72 lg:w-96 object-contain rounded-md'
                        />
                    </Link>

                    <p className='mt-6 text-muted-foreground text-center max-w-sm'>
                        Welcome back to Blog-O. Continue your journey and explore amazing blogs.
                    </p>

                </div>

                {/* RIGHT SIDE - SIGN IN CARD */}
                <Card className="w-full max-w-md mx-auto shadow-xl border dark:border-zinc-800">

                    <CardHeader className="space-y-4">

                        {/* MOBILE LOGO */}
                        <div className='flex justify-center md:hidden'>

                            <Link to={RouteIndex}>
                                <img
                                    src={theme === "dark" ? logoDark : logoLight}
                                    alt="logo"
                                    className='w-20 object-contain rounded-md'
                                />
                            </Link>

                        </div>

                        <div className='text-center md:text-left'>
                            <CardTitle className="text-2xl">
                                Sign In
                            </CardTitle>

                            <CardDescription>
                                Access your account
                            </CardDescription>
                        </div>

                    </CardHeader>

                    <CardContent>

                        {/* GOOGLE LOGIN */}
                        <div>

                            <GoogleLogin />

                            <div className='relative my-6'>

                                <div className='border-t dark:border-zinc-700'></div>

                                <span className='absolute left-1/2 -translate-x-1/2 -top-3 bg-white dark:bg-zinc-900 px-3 text-sm text-muted-foreground'>
                                    OR
                                </span>

                            </div>

                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >

                            <FieldGroup>

                                {/* EMAIL */}
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>

                                            <FieldLabel htmlFor="email">
                                                Email
                                            </FieldLabel>

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

                                {/* PASSWORD */}
                                <Controller
                                    name="password"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>

                                            <FieldLabel htmlFor="password">
                                                Password
                                            </FieldLabel>

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

                            <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                                {loading && <Spinner className="mr-2" />}
                                {loading ? "Signing In... Please wait !" : "Sign In"}
                            </Button>

                            <div className='text-center pt-2'>

                                <CardDescription>
                                    Don&apos;t have an account?{" "}

                                    <Link
                                        className='text-stone-900 dark:text-gray-200 hover:underline font-medium'
                                        to={RouteSignUp}
                                    >
                                        Create account
                                    </Link>

                                </CardDescription>

                            </div>

                        </form>

                    </CardContent>

                </Card>

            </div>

        </div>
    )
}

export default SignIn