import React from 'react'
import { getEnvName } from '@/helpers/getEnvName'
import { useFetch } from '@/hooks/useFetch'
import { FaRegComment } from "react-icons/fa";

const CommentCount = ({ blogId }) => {
    const { data, loading, error } = useFetch(`${getEnvName(`VITE_API_BASE_URL`)}/comment/get-count/${blogId}`, {
        method: 'get',
        credentials: 'include',
    })
    // console.log(data)

    return (
        <button className='flex items-center gap-2 text-gray-600'>
            <FaRegComment />
            <span>{data && data.commentCount || 0}</span>
        </button>
    )
}

export default CommentCount