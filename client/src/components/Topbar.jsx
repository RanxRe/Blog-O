import React from 'react'
import logo from "@/assets/images/brand-logo-light.png"
import { AiOutlineLogin } from "react-icons/ai";
import { Button } from './ui/button'
import { Link } from 'react-router'
import SearchBox from './SearchBox';

const Topbar = () => {
    return (
        <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
            <div>
                <img src={logo} width={100} alt="logo" />
            </div>

            <div className='w-[500px]' >
                <SearchBox />
            </div>

            <div >
                <Button className="rounded-full" >
                    <Link to={"/login"} className='flex items-center gap-2 whitespace-nowrap' >
                        <AiOutlineLogin />
                        Sign In</Link>
                </Button>
            </div>
        </div>
    )
}

export default Topbar