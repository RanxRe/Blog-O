import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { CalendarDays, User2Icon } from 'lucide-react'
import { Link } from 'react-router'
import { RouteBlogDetails } from '@/helpers/routeName'

const BlogCard = ({ data }) => {

    const user = useSelector(state => state.user)
    console.log(data)

    return (
        <Link to={RouteBlogDetails(data.category.slug, data.slug)}>
            <Card className='cursor-pointer' >
                <CardContent>
                    <div className='flex items-center justify-between'>
                        <div className='flex justify-between items-center gap-2'>
                            <Avatar>
                                <AvatarImage src={data.author?.avatar} />
                                <AvatarFallback>
                                    {<User2Icon />}
                                </AvatarFallback>
                            </Avatar>
                            <span>{data.author?.name}</span>
                        </div>
                        {user?.user.role === 'admin' &&
                            <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">Admin</Badge>
                        }
                    </div>
                    <div className='rounded p-2 my-2' >
                        {/* feature image */}
                        <img className='rounded w-100 h-50' src={data?.featuredImage} alt="https://res.cloudinary.com/dylu28ncu/image/upload/v1774247661/samples/balloons.jpg" />
                    </div>

                    <div >
                        <p className='flex items-center gap-2 my-2'>
                            <CalendarDays size={20} />
                            <span>{new Date(data?.createdAt).toLocaleDateString()}</span>
                        </p>
                        <h2 className='text-xl font-bold line-clamp-2'>{data?.title}</h2>
                    </div>
                </CardContent>
            </Card >
        </Link>
    )
}

export default BlogCard