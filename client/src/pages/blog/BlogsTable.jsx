import React from 'react'
import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { data, Link } from 'react-router'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Loading from '@/components/Loading'
import { showToast } from '@/helpers/showToast'
import { getEnvName } from '@/helpers/getEnvName'
import { RouteBlogEdit } from '@/helpers/routeName'

const BlogsTable = ({ blogData, loading, setRefreshData, refreshData }) => {

    const handleDelete = async (id, title) => {
        const c = confirm(`Are you sure to Delete blog:"${id}"-"${title}" ?`)
        if (c) {
            try {
                const response = await fetch(`${getEnvName('VITE_API_BASE_URL')}/blog/delete/${id}`, {
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
    console.log(blogData?.blog)

    if (loading) return <Loading />
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='font-bold' >#</TableHead>
                    <TableHead className='font-bold' >Author</TableHead>
                    <TableHead className='font-bold' >Category</TableHead>
                    <TableHead className="font-bold">Title</TableHead>
                    <TableHead className="font-bold">Slug</TableHead>
                    <TableHead className="font-bold">Dated</TableHead>
                    <TableHead className="font-bold text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    blogData?.blog?.length > 0 ?
                        blogData?.blog.map((blg, index) => (
                            <TableRow key={blg._id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell className="font-medium">{blg?.author.name}</TableCell>
                                <TableCell className="font-medium">{blg?.category.name}</TableCell>
                                <TableCell className="font-medium">{blg?.title}</TableCell>
                                <TableCell>{blg?.slug}</TableCell>
                                <TableCell>{new Date(blg?.createdAt).toLocaleString()}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu  >
                                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8"><MoreHorizontalIcon /><span className="sr-only cursor-pointer">Open menu</span></Button>} />
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem ><Link className="flex items-center w-full" to={RouteBlogEdit(blg._id)} >Edit</Link></DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={() => handleDelete(blg._id, blg.title)}>
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
    )
}

export default BlogsTable