import React from 'react'
import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Loading from './Loading'
import { Link } from 'react-router'
import { getCategoryEditRoute } from '@/helpers/routeName'
import { showToast } from '@/helpers/showToast'
import { getEnvName } from '@/helpers/getEnvName'

const CategoryTable = ({ categoryData, loading, setRefreshData, refreshData }) => {

    const handleDelete = async (id, name) => {
        const c = confirm(`Are you sure to Delete "${name}" category ?`)
        if (c) {
            try {
                const response = await fetch(`${getEnvName('VITE_API_BASE_URL')}/category/delete/${id}`, {
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
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    categoryData && categoryData.category.length > 0 ?
                        categoryData?.category.map((cat, index) => (
                            <TableRow key={cat._id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell className="font-medium">{cat?.name}</TableCell>
                                <TableCell>{cat?.slug}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu  >
                                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8"><MoreHorizontalIcon /><span className="sr-only cursor-pointer">Open menu</span></Button>} />
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem ><Link className="flex items-center w-full" to={getCategoryEditRoute(cat._id)} >Edit</Link></DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={() => handleDelete(cat._id, cat.name)}>
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

export default CategoryTable