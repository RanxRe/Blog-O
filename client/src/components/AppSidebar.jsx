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
import SidebarLink from './SidebarLink'

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
                                <SidebarLink to="/" className="flex items-center gap-2 w-full">
                                    Home
                                </SidebarLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {isAdmin && (
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <AiOutlineUnorderedList />
                                    <SidebarLink to={RouteCategoriesDetails} className="flex items-center gap-2 w-full">
                                        Categories
                                    </SidebarLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}

                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <ImPencil2 />
                                <SidebarLink to={RouteBlog} className="flex items-center gap-2 w-full">
                                    Blogs
                                </SidebarLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <AiOutlineComment />
                                <SidebarLink to={RouteComments} className="flex items-center gap-2 w-full">
                                    Comments
                                </SidebarLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {isAdmin && (
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <AiOutlineUser />
                                    <SidebarLink to={RouteUsers} className="flex items-center gap-2 w-full">
                                        Users
                                    </SidebarLink>
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
                                    <SidebarLink to={RouteBlogByCategory(cat.slug)} className="flex items-center gap-2 w-full">
                                        {cat.name}
                                    </SidebarLink>
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