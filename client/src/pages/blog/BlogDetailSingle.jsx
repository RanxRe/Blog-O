import React, { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { getEnvName } from '@/helpers/getEnvName'
import { useFetch } from '@/hooks/useFetch'
import { useParams } from 'react-router'
import { decode } from 'entities'
import Comments from '@/components/Comments'
import CommentList from '@/components/CommentList'

const BlogDetailSingle = () => {

    const [refreshData, setRefreshData] = useState(false)
    const { slug } = useParams()
    const { data, loading, error } = useFetch(`${getEnvName(`VITE_API_BASE_URL`)}/blog/get-blog/${slug}`, {
        method: 'get',
        credentials: 'include',
    })
    console.log(data)

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner className="size-8" />
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {data?.blog && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* LEFT - BLOG CONTENT */}
                    <div className="lg:col-span-2">
                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {data?.blog.title}
                        </h1>
                        {/* Featured Image */}
                        <img
                            src={data?.blog.featuredImage}
                            alt={data?.blog.title}
                            className="w-full h-[400px] object-cover rounded-2xl mb-6"
                        />

                        {/* Category */}
                        <span className="inline-block bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full mb-4">
                            {data?.blog.category.name}
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {data?.blog.title}
                        </h1>

                        {/* Author + Date */}
                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src={data?.blog.author.avatar}
                                alt={data?.blog.author.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-sm font-medium">
                                    {data?.blog.author.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(data?.blog.createdAt).toDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Content */}
                        <div dangerouslySetInnerHTML={{ __html: decode(data?.blog.blogContent) || "" }} className="prose max-w-none" />
                    </div>

                    {/* RIGHT - SIDEBAR */}
                    <div className="space-y-6">

                        {/* Author Card */}
                        <div className="border rounded-2xl p-5 shadow-sm">
                            <h2 className="font-semibold mb-3">Author</h2>
                            <div className="flex items-center gap-3">
                                <img
                                    src={data?.blog.author.avatar}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-medium">
                                        {data?.blog.author.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {data?.blog.author.role}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="border rounded-2xl p-5 shadow-sm">
                            <h2 className="font-semibold mb-3">Blog Info</h2>
                            <p className="text-sm text-gray-600">
                                <strong>Category:</strong> {data?.blog.category.name}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Updated:</strong>{" "}
                                {new Date(data?.blog.updatedAt).toDateString()}
                            </p>
                        </div>

                    </div>
                    <div className='mt-10'>
                        <Comments blogId={data?.blog?._id} refreshData={refreshData} setRefreshData={setRefreshData} />
                        <CommentList blogId={data?.blog?._id} refreshData={refreshData} />
                    </div>
                </div>

            )}
        </div>
    )
}

export default BlogDetailSingle