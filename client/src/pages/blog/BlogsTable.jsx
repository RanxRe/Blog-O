import React from 'react'
import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const BlogsTable = () => {
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
                {/* {
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
              } */}
            </TableBody>
        </Table>
    )
}

export default BlogsTable