import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { getEnvName } from '@/helpers/getEnvName';
import { useFetch } from '@/hooks/useFetch';
import { useSelector } from 'react-redux';
import { showToast } from '@/helpers/showToast';
import { useNavigate } from 'react-router';
import { RouteSignIn } from '@/helpers/routeName';

const LikeCount = ({ blogId }) => {
    const user = useSelector((state) => state.user)
    const [likeCount, setLikeCount] = useState(0)
    const navigate = useNavigate()

    const { data, loading, error } = useFetch(`${getEnvName(`VITE_API_BASE_URL`)}/like/get-like/${blogId}`, {
        method: 'get',
        credentials: 'include',
    })
    console.log(data)

    useEffect(() => {
        if (data) {
            setLikeCount(data.likeCount)
        }
    }, [data])

    const handleLike = async () => {
        try {
            if (!user.isLoggedIn) {
                showToast('error', "Please login to like a blog")
                navigate(RouteSignIn)
                return
            }
            const response = await fetch(`${getEnvName(`VITE_API_BASE_URL`)}/like/do-like`, {
                method: 'post',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ userId: user.user._id, blogId: blogId })
            })
            if (!response.ok) {
                showToast("error", response.statusText)
            }
            const responseData = await response.json()
            setLikeCount(responseData.likeCount)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    return (
        <div className='cursor-pointer' >
            <button onClick={handleLike} type='button' className='flex items-center gap-1 text-gray-600'>
                <FaRegHeart />
                <span>{likeCount}</span>
            </button>
        </div>
    )
}

export default LikeCount