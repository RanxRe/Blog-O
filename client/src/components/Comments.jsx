import React from 'react'
import { MessagesSquareIcon } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field'
import { useForm, Controller } from 'react-hook-form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { showToast } from '@/helpers/showToast'
import { getEnvName } from '@/helpers/getEnvName'
import { Textarea } from './ui/textarea'
import { RouteSignIn } from '@/helpers/routeName'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'

const Comments = ({ blogId, refreshData, setRefreshData }) => {

    const user = useSelector((state) => state.user)
    const formSchema = z.object({
        comment: z.string().min(10, "Comment must be at least 10 characters"),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",
        }
    })

    async function onSubmit(values) {
        try {
            const newValues = { ...values, blogId: blogId, author: user?.user._id }
            const response = await fetch(`${getEnvName('VITE_API_BASE_URL')}/comment/add`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(newValues)
            })
            const data = await response.json()
            if (!response.ok) {
                showToast('error', data.message)
                return
            }
            setRefreshData(!refreshData)
            showToast('success', data.message)
            form.reset()
            console.log(newValues)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    return (
        <div className='border-t mt-5 pt-2'>
            <h4 className='flex items-center gap-2 text-2xl font-bold'>
                <MessagesSquareIcon size={30} /> Comments</h4>
            {user && user?.isLoggedIn ?
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FieldGroup>
                        {/* NAME FIELD */}
                        <Controller
                            name="comment"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="comment"></FieldLabel>

                                    <Textarea
                                        {...field}
                                        placeholder="Write your thoughts on this blog..."
                                        aria-invalid={fieldState.invalid} />

                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </FieldGroup>
                    <Button type="submit" className="w-25 cursor-pointer">Comment</Button>

                </form>
                :
                <Button className="cursor-pointer mt-5">
                    <Link to={RouteSignIn} >Sign In to comment</Link>
                </Button>
            }

        </div >
    )
}

export default Comments