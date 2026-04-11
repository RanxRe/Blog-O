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

const AppSidebar = () => {

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
                                <Link className="flex items-center gap-2 w-full" to={""} >Categories</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <ImPencil2 />
                                <Link className="flex items-center gap-2 w-full" to={""} >Blogs</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <AiOutlineComment />
                                <Link className="flex items-center gap-2 w-full" to={""} >Comments</Link>
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
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <GoDot />
                                <Link className="flex items-center gap-2 w-full" to={""} >Dynamic Categories from bknd</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )

}

export default AppSidebar