import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEnvName } from '@/helpers/getEnvName'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'

const Index = () => {

    const { data: blogData, loading } = useFetch(`${getEnvName(`VITE_API_BASE_URL`)}/blog/get-all`, {
        method: 'get',
        ceredentials: 'include'
    })
    if (loading) {
        return <Loading />
    }

    return (
        <div className='grid grid-cols-3 gap-10 wrap' >
            {blogData && blogData.blog.length > 0 ?
                blogData.blog.map((blg) => <BlogCard key={blg._id} data={blg} />)
                :
                <>
                    <div>This place looks empty...🙄🙄</div>
                </>
            }
        </div>
    )
}

export default Index