import BlogCard from '@/components/BlogCard'
import EmptyState from '@/components/EmptyState'
import Loading from '@/components/Loading'
import { getEnvName } from '@/helpers/getEnvName'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'

const Index = () => {

    const { data: blogData, loading } = useFetch(`${getEnvName(`VITE_API_BASE_URL`)}/blog/get-all`, {
        method: 'get',
        credentials: 'include'
    })
    if (loading) {
        return <Loading />
    }

    if (!blogData || blogData.blog.length === 0) {
        return (
            <EmptyState
                title="No Blogs Found"
                description="There are no blogs in this category yet. Try exploring other categories or come back later."
                actionText="Browse All Blogs"
                actionLink="/"
            />
        );
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {blogData.blog.map((blg) => (
                <BlogCard key={blg._id} data={blg} />
            ))}
        </div>
    );
}

export default Index