import React from 'react'
import { Button } from './ui/button'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/helpers/firebase';
import { getEnvName } from '@/helpers/getEnvName';
import { showToast } from '@/helpers/showToast';
import { useNavigate } from 'react-router';
import { RouteIndex } from '@/helpers/routeName';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/user.slice';

const GoogleLogin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const googleResponse = await signInWithPopup(auth, provider)
            // we have to modify body coz we will get data from googleResponse
            const user = googleResponse.user
            const bodyData = {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL
            }
            const response = await fetch(`${getEnvName('VITE_API_BASE_URL')}/auth/google-auth`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(bodyData)
            })
            const data = await response.json()
            if (!response.ok) {
                showToast('error', data.message)
                return
            }
            dispatch(setUser(data.user))
            navigate(RouteIndex)
            showToast('success', data.message)
            console.log(googleResponse)
        } catch (error) {
            showToast('error', error.message)
        }
    }
    return (
        <Button variant='outline' className='w-full cursor-pointer' onClick={handleLogin} >
            <FcGoogle />
            Continue with Google
        </Button>
    )
}

export default GoogleLogin