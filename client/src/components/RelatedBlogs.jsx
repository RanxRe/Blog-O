import { getEnvName } from '@/helpers/getEnvName'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { Spinner } from './ui/spinner'
import { Link } from 'react-router'
import { RouteBlogDetails } from '@/helpers/routeName'

const RelatedBlogs = ({ category, slug }) => {

    const { data, loading, error } = useFetch(`${getEnvName(`VITE_API_BASE_URL`)}/blog/get-related-blog/${category}/${slug}`, {
        method: 'get',
        credentials: "include"
    })
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner className="size-8" />
            </div>
        )
    }
    console.log(data)
    return (
        <>
            <h2 className="font-semibold mb-3">Related Blogs</h2>
            {data && data?.relatedBlogs.length > 0
                ?
                data?.relatedBlogs.map((blg) =>
                    <Link to={RouteBlogDetails(blg.category.slug || category, blg.slug)} key={blg._id} >
                        <div className='flex items-center justify-start gap-2 my-2 hover:bg-gray-100 rounded-md' >
                            <img className='rounded-md' width={80} src={blg.featuredImage} alt="blog image" />
                            <h4 className='text-md text-bolder text-gray-900 line-clamp-2' >{blg.title}</h4>
                        </div>
                    </Link>
                )
                :
                <h4 className='text-sm text-gray-600'>No related blogs.</h4>
            }
        </>
    )
}

export default RelatedBlogs