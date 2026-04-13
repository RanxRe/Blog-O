import CategoryTable from '@/components/CategoryTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { getEnvName } from '@/helpers/getEnvName'
import { RouteCategoriesAdd } from '@/helpers/routeName'
import { useFetch } from '@/hooks/useFetch'
import React, { useState } from 'react'
import { Link } from 'react-router'

const CategoriesDetails = () => {

    const [refreshData, setRefreshData] = useState(false)

    const { data: categoryData, loading, error } = useFetch(`${getEnvName('VITE_API_BASE_URL')}/category/get-all`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

    return (
        <div>
            <Card>
                <CardHeader>
                    <div>
                        <Button >
                            <Link to={RouteCategoriesAdd}>Add Category</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <CardDescription className='py-2'>Total: {categoryData?.totalCount || 0}</CardDescription>
                    <CategoryTable categoryData={categoryData} loading={loading} refreshData={refreshData} setRefreshData={setRefreshData} />
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoriesDetails