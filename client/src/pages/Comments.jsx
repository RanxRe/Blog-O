import React, { useState } from 'react'
import Loading from '@/components/Loading'
import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link } from 'react-router'
import { getCategoryEditRoute } from '@/helpers/routeName'
import { showToast } from '@/helpers/showToast'
import { getEnvName } from '@/helpers/getEnvName'
import { useFetch } from '@/hooks/useFetch'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const Comments = () => {

    const [refreshData, setRefreshData] = useState(false)
    const { data: commentData, loading, error } = useFetch(`${getEnvName('VITE_API_BASE_URL')}/comment/get-all-comments`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

    console.log(commentData)

    const truncate = (text, length = 30) => {
        if (!text) return "";
        return text.length > length ? text.substring(0, length) + "..." : text;
    };

    const handleDelete = async (id, title) => {
        const c = confirm(`Are you sure to DELETE comment for blog title "${title}" ?`)
        if (c) {
            try {
                const response = await fetch(`${getEnvName('VITE_API_BASE_URL')}/comment/delete/${id}`, {
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
                <h1 className='text-2xl' >All comments</h1>
            </CardHeader>
            <CardContent>
                <CardDescription className='py-2'>Total: {commentData?.totalCount || 0}</CardDescription>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-bold' >#</TableHead>
                            <TableHead className='font-bold' >Blog Title</TableHead>
                            <TableHead className='font-bold' >Comment By</TableHead>
                            <TableHead className='font-bold' >Date</TableHead>
                            <TableHead className='font-bold' >Comment</TableHead>
                            <TableHead className="font-bold text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            commentData && commentData?.comments.length > 0 ?
                                commentData?.comments.map((com, index) => (
                                    <TableRow key={com._id}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell className="font-medium">{com?.blogId?.title || "No Blog"}</TableCell>
                                        <TableCell className="font-medium">{com?.user?.name || "No Name"}</TableCell>
                                        <TableCell className="font-medium">{com?.createdAt
                                            ? new Date(com.createdAt).toLocaleString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : "No Date"}</TableCell>
                                        <TableCell className="max-w-[200px] truncate">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <span className="cursor-pointer">
                                                            {truncate(com?.comment, 40)}
                                                        </span>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="max-w-xs break-words">
                                                        {com?.comment}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu  >
                                                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8"><MoreHorizontalIcon /><span className="sr-only cursor-pointer">Open menu</span></Button>} />
                                                <DropdownMenuContent align="end">
                                                    {/* <DropdownMenuItem ><Link className="flex items-center w-full" to={getCategoryEditRoute(com._id)} >Edit</Link></DropdownMenuItem>
                                                    <DropdownMenuSeparator /> */}
                                                    <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={() => handleDelete(com._id, com?.blogId?.title || "Unknown Blog")}>
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

export default Comments