import { RouteSignIn } from '@/helpers/routeName'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const AuthRouteProtection = () => {
    const user = useSelector((state) => state.user)
    if (user && user.isLoggedIn) {
        return (
            <Outlet />
        )
    } else {
        return <Navigate to={RouteSignIn} />
    }
}

export default AuthRouteProtection