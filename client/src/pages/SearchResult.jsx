import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEnvName } from '@/helpers/getEnvName'
import { useFetch } from '@/hooks/useFetch'
import { SearchIcon } from 'lucide-react'
import React from 'react'
import { useSearchParams } from 'react-router'

const SearchResult = () => {
    const [searchParams] = useSearchParams()
    const q = searchParams.get('q')


    const { data: blogData, loading } = useFetch(`${getEnvName(`VITE_API_BASE_URL`)}/blog/search?q=${q}`, {
        method: 'get',
        credentials: 'include'
    }, [q])
    if (loading) {
        return <Loading />
    }

    if (q === null) {
        return <h3>Cannot search for empty string. Please type something to search.</h3>
    }

    return (
        <>
            <div className='mb-6 flex flex-row items-center gap-4'>
                <SearchIcon className='text-gray-600' size={30} />
                {blogData?.blog.length > 0 ?
                    <h3 className='text-3xl font-bold text-gray-800'>Found: ({blogData?.blog.length}) blogs for &apos;{q}&apos;</h3>
                    :
                    <h3 className='text-3xl font-bold text-gray-800'>No blogs found for &apos;{q}&apos;</h3>
                }
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {blogData.blog.map((blg) => (
                    <BlogCard key={blg._id} data={blg} />
                ))}
            </div>
        </>
    )
}

export default SearchResult