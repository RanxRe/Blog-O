import React, { useState } from 'react'
import Loading from '@/components/Loading'
import { MoreHorizontalIcon, UserCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { showToast } from '@/helpers/showToast'
import { getEnvName } from '@/helpers/getEnvName'
import { useFetch } from '@/hooks/useFetch'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'

const Users = () => {

    const [refreshData, setRefreshData] = useState(false)
    const { data: userData, loading, error } = useFetch(`${getEnvName('VITE_API_BASE_URL')}/user/get-all-user`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

    console.log(userData)

    const handleDelete = async (id, name) => {
        const c = confirm(`Are you sure to DELETE user "${name}" ?`)
        if (c) {
            try {
                const response = await fetch(`${getEnvName('VITE_API_BASE_URL')}/user/delete/${id}`, {
                    method: 'delete',
                    credentials: "include"
                })
                const data = await response.json()
                if (!response.ok) {
                    return showToast("error", data.message)
                }
                setRefreshData(!refreshData)
                showToast("success", data.message)
            } catch (error) {
                console.log(error)
                showToast("error", error.message)
                return false
            }
        } else {
            return false
        }
    }

    if (loading) return <Loading />

    return (
        <Card>
            <CardHeader>
                <h1 className='text-2xl' >All Users</h1>
            </CardHeader>
            <CardContent>
                <CardDescription className='py-2'>Total: {userData?.totalCount || 0}</CardDescription>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-bold' >#</TableHead>
                            <TableHead className='font-bold' >Role</TableHead>
                            <TableHead className='font-bold' >Name</TableHead>
                            <TableHead className='font-bold' >Email</TableHead>
                            <TableHead className='font-bold' >Created On</TableHead>
                            <TableHead className='font-bold' >Avatar</TableHead>
                            <TableHead className="font-bold text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            userData && userData?.user.length > 0 ?
                                userData?.user.map((u, index) => (
                                    <TableRow key={u._id}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell className="font-medium"><Badge className={u?.role === "admin" ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300" : "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"}>{u?.role}</Badge></TableCell>
                                        <TableCell className="font-medium">{u?.name || "No Name"}</TableCell>
                                        <TableCell className="font-medium">{u?.email}</TableCell>
                                        <TableCell className="font-medium">{u?.createdAt
                                            ? new Date(u.createdAt).toLocaleString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : "No Date"}</TableCell>
                                        <TableCell className="font-medium"><img className='rounded-full max-w-14 max-h-14 object-fill border' src={u?.avatar || <UserCircleIcon />} alt="user-pic" /></TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu  >
                                                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8"><MoreHorizontalIcon /><span className="sr-only cursor-pointer">Open menu</span></Button>} />
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={() => handleDelete(u._id, u?.name || "No Name")}>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableCell colSpan="3">
                                        No data
                                    </TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default Users