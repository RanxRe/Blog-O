import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from 'react-router'
import logo from "@/assets/images/brand-logo-light.png"
import { AiOutlineUnorderedList, AiOutlineHome, AiOutlineComment, AiOutlineUser } from "react-icons/ai";
import { ImPencil2 } from "react-icons/im";
import { GoDot } from "react-icons/go";
import { RouteBlog, RouteBlogByCategory, RouteCategoriesDetails, RouteComments } from '@/helpers/routeName';
import { useFetch } from '@/hooks/useFetch';
import { getEnvName } from '@/helpers/getEnvName';

const AppSidebar = () => {

    const { data: categoryData } = useFetch(`${getEnvName(`VITE_API_BASE_URL`)}/category/get-all`, {
        method: 'get',
        ceredentials: 'include'
    })

    return (
        <Sidebar>
            <SidebarHeader>
                <img src={logo} alt="logo" width={100} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <AiOutlineHome />
                                <Link className="flex items-center gap-2 w-full" to={""} >Home</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <AiOutlineUnorderedList />
                                <Link className="flex items-center gap-2 w-full" to={RouteCategoriesDetails} >Categories</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
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
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <AiOutlineUser />
                                <Link className="flex items-center gap-2 w-full" to={""} >Users</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

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