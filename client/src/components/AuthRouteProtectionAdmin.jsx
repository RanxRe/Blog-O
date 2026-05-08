import { RouteSignIn } from '@/helpers/routeName'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const AuthRouteProtectionAdmin = () => {
    const user = useSelector((state) => state.user)
    if (user && user.isLoggedIn && user.user.role === "admin") {
        return (
            <Outlet />
        )
    } else {
        return <Navigate to={RouteSignIn} />
    }
}

export default AuthRouteProtectionAdmin