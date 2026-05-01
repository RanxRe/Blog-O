import { getEnvName } from '@/helpers/getEnvName'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { Spinner } from './ui/spinner'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { User2Icon } from 'lucide-react'

const CommentList = ({ blogId, refreshData }) => {

    const { data, loading, error } = useFetch(`${getEnvName(`VITE_API_BASE_URL`)}/comment/get/${blogId}`, {
        method: 'get',
        credentials: 'include',
    }, [refreshData])
    // console.log(data)

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner className="size-8" />
            </div>
        )
    }
    return (
        <div className='mt-10'>
            {!data ?
                <h5>No comments on this post yet !</h5>
                :
                <>
                    <h4 className='text-2xl font-bold'>{data?.comments.length} Comments</h4>
                    <div className='mt-5'>
                        {data?.comments.length > 0 && data?.comments.map((comm) =>
                            <div className='flex flex-column gap-2' key={comm._id}>
                                <Avatar>
                                    <AvatarImage src={comm?.author.avatar} />
                                    <AvatarFallback>{<User2Icon />}</AvatarFallback>
                                </Avatar>
                                <div className='mb-10'>
                                    <p className="text-xs text-gray-500" >{comm?.author.name}</p>
                                    <p className="text-xs text-gray-500"> {new Date(comm?.createdAt).toDateString()}</p>
                                    <p className='pt-3'>
                                        {comm?.comment}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            }
        </div>
    )
}

export default CommentList