import React from 'react'
import logo from "@/assets/images/brand-logo-light.png"
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from 'react-router'
import SearchBox from './SearchBox';
import { RouteIndex, RouteSignIn } from '@/helpers/routeName';
import { SunIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button"

import UserDropDownMenu from './UserDropDownMenu';

const Topbar = () => {

    const user = useSelector((state) => state.user)
    return (
        <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
            <div>
                <Link to={RouteIndex}>
                    <img src={logo} width={100} alt="logo" />
                </Link>
            </div>

            <div className='w-[500px]' >
                <SearchBox />
            </div>

            <div className='flex items-center gap-2 whitespace-nowrap' >
                <Button variant='outline' className="rounded-full cursor-pointer text-black">
                    <SunIcon />
                </Button>
                {!user.isLoggedIn ?
                    <Button className="rounded-full" >
                        <Link to={RouteSignIn} className='flex items-center gap-2 whitespace-nowrap' >
                            <AiOutlineLogin />
                            Sign In</Link>
                    </Button>
                    :
                    <UserDropDownMenu />
                }

            </div>
        </div >
    )
}

export default Topbar