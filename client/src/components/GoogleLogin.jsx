import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { FcGoogle } from "react-icons/fc";
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, provider } from '@/helpers/firebase';
import { getEnvName } from '@/helpers/getEnvName';
import { showToast } from '@/helpers/showToast';
import { useNavigate } from 'react-router';
import { RouteIndex } from '@/helpers/routeName';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/user.slice';

const GoogleLogin = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const handleRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth)
                if (!result) return
                const user = result.user
                const bodyData = {
                    name: user.displayName,
                    email: user.email,
                    avatar: user.photoURL
                }
                const response = await fetch(
                    `${getEnvName('VITE_API_BASE_URL')}/auth/google-auth`,
                    {
                        method: 'post',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify(bodyData)
                    }
                )
                const data = await response.json()
                if (!response.ok) {
                    showToast('error', data.message)
                    return
                }
                dispatch(setUser(data.user))
                navigate(RouteIndex, { replace: true })
                showToast('success', data.message)
            } catch (error) {
                console.log(error)
                showToast('error', error.message)
            } finally {
                setLoading(false)
            }
        }
        handleRedirectResult()
    }, [dispatch, navigate])


    const handleLogin = async () => {
        // prevent multiple popups
        if (loading) return
        try {
            setLoading(true)
            // await auth.authStateReady?.();
            // const googleResponse = await signInWithRedirect(auth, provider)
            await signInWithRedirect(auth, provider)
            // we have to modify body coz we will get data from googleResponse
            // const user = googleResponse.user
            // const bodyData = {
            //     name: user.displayName,
            //     email: user.email,
            //     avatar: user.photoURL
            // }
            // const response = await fetch(`${getEnvName('VITE_API_BASE_URL')}/auth/google-auth`, {
            //     method: 'post',
            //     headers: { 'Content-type': 'application/json' },
            //     credentials: 'include',
            //     body: JSON.stringify(bodyData)
            // })
            // const data = await response.json()
            // if (!response.ok) {
            //     showToast('error', data.message)
            //     return
            // }
            // dispatch(setUser(data.user))
            // navigate(RouteIndex)
            // showToast('success', data.message)
            // console.log(googleResponse)
        } catch (error) {
            console.log(error)
            console.log(error.code)
            console.log(error.message)
            // if (error.code !== "auth/popup-closed-by-user") {
            //     showToast("error", error.message)
            // }
            setLoading(false)
        }
    }
    return (
        <Button
            variant='outline'
            type='button'
            className='w-full cursor-pointer'
            disabled={loading}
            onClick={handleLogin} >
            <FcGoogle /> {loading ? "Please wait..." : "Continue with Google"}
        </Button>
    )
}

export default GoogleLogin