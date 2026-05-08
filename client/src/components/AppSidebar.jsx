import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Link } from 'react-router'
import logo from "@/assets/images/brand-logo-light.png"

import {
    AiOutlineUnorderedList,
    AiOutlineHome,
    AiOutlineComment,
    AiOutlineUser
} from "react-icons/ai"

import { ImPencil2 } from "react-icons/im"
import { GoDot } from "react-icons/go"

import {
    RouteBlog,
    RouteBlogByCategory,
    RouteCategoriesDetails,
    RouteComments,
    RouteUsers
} from '@/helpers/routeName'

import { useFetch } from '@/hooks/useFetch'
import { getEnvName } from '@/helpers/getEnvName'
import { useSelector } from 'react-redux'

const AppSidebar = () => {

    const user = useSelector((state) => state.user)

    const role = user?.user?.role
    const isAdmin = role === "admin"
    const isLoggedIn = user?.isLoggedIn

    const { data: categoryData } = useFetch(
        `${getEnvName(`VITE_API_BASE_URL`)}/category/get-all`,
        {
            method: 'GET',
            credentials: 'include'
        }
    )
    console.log(user)
    return (
        <Sidebar>
            <SidebarHeader>
                <img src={logo} alt="logo" width={100} />
            </SidebarHeader>
            <SidebarContent>
                {/* MAIN MENU */}
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <AiOutlineHome />
                                <Link className="flex items-center gap-2 w-full" to={""} >Home</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {isAdmin && (
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <AiOutlineUnorderedList />
                                    <Link className="flex items-center gap-2 w-full" to={RouteCategoriesDetails} >Categories</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}

                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <ImPencil2 />
                                <Link className="flex items-center gap-2 w-full" to={RouteBlog} >Blogs</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <AiOutlineComment />
                                <Link className="flex items-center gap-2 w-full" to={RouteComments} >Comments</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {isAdmin && (
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <AiOutlineUser />
                                    <Link className="flex items-center gap-2 w-full" to={RouteUsers} >Users</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                    </SidebarMenu>
                </SidebarGroup>

                {/* CATEGORIES */}
                <SidebarGroup>
                    <SidebarGroupLabel>Catergories</SidebarGroupLabel>
                    <SidebarMenu>
                        {categoryData && categoryData.category.length > 0
                            && categoryData.category.map((cat) => <SidebarMenuItem key={cat._id} >
                                <SidebarMenuButton>
                                    <GoDot />
                                    <Link className="flex items-center gap-2 w-full" to={RouteBlogByCategory(cat.slug)} >{cat.name}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>)
                        }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar