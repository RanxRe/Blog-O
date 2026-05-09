import React, { useState } from 'react'
import logoLight from "@/assets/images/brand-logo-light.png"
import logoDark from "@/assets/images/brand-logo-dark.png"
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from 'react-router'
import SearchBox from './SearchBox';
import { RouteIndex, RouteSignIn } from '@/helpers/routeName';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button"
import { IoSearchOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import UserDropDownMenu from './UserDropDownMenu';
import { useSidebar } from './ui/sidebar';
import { useTheme } from './theme-provider';

const Topbar = () => {

    const user = useSelector((state) => state.user)
    const [showSearch, setShowSearch] = useState(false)
    const { openMobile, setOpenMobile } = useSidebar()
    const { setTheme, theme } = useTheme()

    const toggleSearch = () => {
        setShowSearch(!showSearch)
    }
    return (
        <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white dark:bg-zinc-950 px-5 sm:px-4 md:px-6 border-b dark:border-zinc-800">
            <div className='md:hidden'>
                <Button variant="outline"
                    onClick={() => setOpenMobile(!openMobile)}
                    size='icon-lg'
                    className="rounded-full" >
                    <IoMenu />
                </Button>
            </div>
            <div className='px-2'>
                <Link to={RouteIndex}>
                    <img src={theme === "dark" ? logoDark : logoLight} alt="logo" className='w-70 sm:w-50 md:w-20' />
                </Link>
            </div>

            <div className='w-[500px]' >
                <div className={`md:relative md:block  absolute bg-white dark:bg-zinc-950 left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch ? 'block' : 'hidden'}`}>
                    <SearchBox />
                </div>
            </div>

            <div className='flex items-center justify-around gap-2 whitespace-nowrap' >

                <Button variant='outline' size='icon-lg' onClick={toggleSearch} className="rounded-full md:hidden">
                    <IoSearchOutline />
                </Button>

                <Button variant='outline' size='icon-lg' onClick={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                } className="rounded-full cursor-pointer">
                    {theme === "dark" ?
                        <MoonIcon />
                        :
                        <SunIcon />
                    }
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