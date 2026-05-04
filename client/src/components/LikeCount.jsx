import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getEnvName } from '@/helpers/getEnvName';
import { useFetch } from '@/hooks/useFetch';
import { useSelector } from 'react-redux';
import { showToast } from '@/helpers/showToast';
import { useNavigate } from 'react-router';
import { RouteSignIn } from '@/helpers/routeName';

const LikeCount = ({ blogId }) => {
    const user = useSelector((state) => state.user)
    const [likeCount, setLikeCount] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [loadingLike, setLoadingLike] = useState(false)
    const navigate = useNavigate()

    const { data, loading, error } = useFetch(`${getEnvName(`VITE_API_BASE_URL`)}/like/get-like/${blogId}/${user && user.isLoggedIn ? user.user._id : ""}`, {
        method: 'get',
        credentials: 'include',
    })
    // console.log(data)

    useEffect(() => {
        if (data) {
            setLikeCount(data.likeCount)
            setIsLiked(data.isLiked)
        }
    }, [data])

    const handleLike = async () => {
        if (loadingLike) return;
        setLoadingLike(true)
        try {
            if (!user.isLoggedIn) {
                showToast('error', "Please login to like a blog")
                navigate(RouteSignIn)
                return
            }

            if (likeCount <= 0 && isLiked) return;

            //  Optimistic UI
            // setIsLiked(prev => {
            //     const newValue = !prev
            //     setLikeCount(count => count + (newValue ? 1 : -1))
            //     return newValue
            // })


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
            // ONLY sync if mismatch
            setLikeCount(responseData.likeCount)
            setIsLiked(!isLiked)
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setLoadingLike(false)
        }
    }

    return (

        <button disabled={loadingLike} onClick={handleLike} type='button' className='cursor-pointer flex items-center gap-1 transition-all duration-200'>
            {isLiked ? (
                <FaHeart className="text-red-500 scale-110 transition-all duration-200" />
            ) : (
                <FaRegHeart className="text-gray-600 transition-all duration-200" />
            )}
            <span>{likeCount}</span>
        </button>

    )
}

export default LikeCount