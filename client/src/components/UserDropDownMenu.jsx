import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, useNavigate } from 'react-router'
import { Edit, LucideLogOut, User2Icon, UserCog2Icon } from 'lucide-react'
import { Button } from '@base-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getEnvName } from '@/helpers/getEnvName'
import { removeUser } from '@/redux/user/user.slice'
import { showToast } from '@/helpers/showToast'
import { RouteIndex, RouteProfile } from '@/helpers/routeName'

const UserDropDownMenu = () => {

    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            const response = await fetch(`${getEnvName('VITE_API_BASE_URL')}/auth/logout`, {
                method: 'post',
                // headers: { 'Content-type': 'application/json' },// we re not sending anything so removing it
                credentials: 'include',//   must be include coz without it, it will not send cookie,if no cookie sent it wont clear cookie
                // body: JSON.stringify(values)//  not sending anything in body so removing it
            })
            const data = await response.json()
            if (!response.ok) {
                showToast('error', data.message)
                return
            }
            dispatch(removeUser())
            navigate(RouteIndex)
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    return (

        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant='ghost' />}>
                <Avatar className={'cursor-pointer'}>
                    <AvatarImage src={user?.user?.avatar} />
                    <AvatarFallback>{<User2Icon />}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-50' >
                <DropdownMenuGroup>
                    <DropdownMenuLabel >
                        <p className='text-sm font-bold text-black'>{user?.user?.name}</p>
                        <p className='text-sm'>{user?.user?.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem >
                        <Link to={RouteProfile} className="flex items-center gap-2 w-full">
                            <UserCog2Icon />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuItem >
                        <Link to="/example" className="flex items-center gap-2 w-full">
                            <Edit />
                            Create Blog
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="group">
                        <Button onClick={handleLogout} className="flex items-center gap-2 w-full cursor-pointer">
                            <LucideLogOut className="text-red-500 group-hover:text-red-700" />
                            <span className="text-red-500 group-hover:text-red-700">
                                Logout
                            </span>
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserDropDownMenu