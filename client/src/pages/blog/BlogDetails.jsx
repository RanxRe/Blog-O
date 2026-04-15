import React from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import BlogsTable from './BlogsTable'
import { RouteBlogAdd } from '@/helpers/routeName'
import { useFetch } from '@/hooks/useFetch'
import { getEnvName } from '@/helpers/getEnvName'



const BlogDetails = () => {

    const { data: categoryData, loading, error } = useFetch(`${getEnvName('VITE_API_BASE_URL')}/category/get-all`, {
        method: 'get',
        credentials: 'include'
    })
    return (
        <div>
            <Card>
                <CardHeader>
                    <div>
                        <Button >
                            <Link to={RouteBlogAdd}>Add Post</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* <CardDescription className='py-2'>Total: {categoryData?.totalCount || 0}</CardDescription> */}
                    {/* <CategoryTable categoryData={categoryData} loading={loading} refreshData={refreshData} setRefreshData={setRefreshData} /> */}
                    <BlogsTable
                    // categoryData={categoryData}
                    // loading={loading}
                    //   refreshData={refreshData}
                    //    setRefreshData={setRefreshData}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default BlogDetails