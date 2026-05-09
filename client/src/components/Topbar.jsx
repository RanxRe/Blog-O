import React, { useState } from 'react'
import logo from "@/assets/images/brand-logo-light.png"
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from 'react-router'
import SearchBox from './SearchBox';
import { RouteIndex, RouteSignIn } from '@/helpers/routeName';
import { SunIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button"
import { IoSearchOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import UserDropDownMenu from './UserDropDownMenu';
import { useSidebar } from './ui/sidebar';

const Topbar = () => {

    const user = useSelector((state) => state.user)
    const [showSearch, setShowSearch] = useState(false)
    // const { toggleSidebar, open, setOpen } = useSidebar()
    const { openMobile, setOpenMobile } = useSidebar()

    const toggleSearch = () => {
        setShowSearch(!showSearch)
    }
    return (
        <div className="flex justify-around items-center h-16 fixed w-full z-20 bg-white px-5 sm:px-4 md:px-6 border-b">
            <div className='md:hidden'>
                <Button variant="ghost"
                    onClick={() => setOpenMobile(!openMobile)}
                    size='icon-lg' >
                    <IoMenu />
                </Button>
            </div>
            <div>
                <Link to={RouteIndex}>
                    <img src={logo} alt="logo" className='sm:w-50 md:w-20' />
                </Link>
            </div>

            <div className='w-[500px]' >
                <div className={`md:relative md:block  absolute bg-white left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch ? 'block' : 'hidden'}`}>
                    <SearchBox />
                </div>
            </div>

            <div className='flex items-center justify-around gap-2 whitespace-nowrap' >

                <Button variant='outline' size='icon-sm' onClick={toggleSearch} className="rounded-full md:hidden">
                    <IoSearchOutline />
                </Button>

                <Button variant='outline' size='icon-sm' className="rounded-full cursor-pointer text-black">
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