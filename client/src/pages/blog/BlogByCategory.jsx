import React from 'react'
import { useParams } from 'react-router'
import { Spinner } from '@/components/ui/spinner'
import { getEnvName } from '@/helpers/getEnvName'
import { useFetch } from '@/hooks/useFetch'
import BlogCard from '@/components/BlogCard'
import EmptyState from '@/components/EmptyState'
import { BiCategory } from "react-icons/bi";

const BlogByCategory = () => {
    const { category } = useParams()
    const { data: blogData, loading } = useFetch(`${getEnvName(`VITE_API_BASE_URL`)}/blog/get-blog-by-category/${category}`, {
        method: 'get',
        credentials: 'include'
    }, [category])

    //  1. Show loader FIRST
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner className="size-10" />
            </div>
        )
    }

    //  2. Then check empty state AFTER loading
    if (!blogData || blogData?.blog.length === 0) {
        return (
            <EmptyState
                title="No Blogs Found"
                description={`There are no blogs in ${blogData?.categoryData.name || category} category yet.`}
                actionText="Browse All Blogs"
                actionLink="/"
            />
        )
    }

    //  3. Finally render data
    return (
        <>
            <div className='mb-6 flex flex-row items-center gap-4'>
                <BiCategory className='text-gray-600' size={30} />
                <h3 className='text-3xl font-bold text-gray-800'>{blogData?.categoryData.name || category}</h3>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {blogData.blog.map((blg) => (
                    <BlogCard key={blg._id} data={blg} />
                ))}
            </div>
        </>
    )
}


export default BlogByCategory