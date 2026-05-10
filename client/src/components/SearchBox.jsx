import React, { useState } from 'react'
import { Input } from './ui/input'
import { useNavigate } from 'react-router'
import { RouteSearch } from '@/helpers/routeName'

const SearchBox = ({ setShowSearch }) => {

    const navigate = useNavigate()
    const [query, setQuery] = useState()
    const getInput = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(RouteSearch(query))
        setShowSearch(false)

    }
    return (

        <form onSubmit={handleSubmit}>
            <div className="rounded-full">
                <Input name="q" onInput={getInput} placeholder="Search here..."
                    className="
                h-9
                border
                rounded-full
                border-gray-200
                dark:border-zinc-700
                bg-gray-50
                dark:bg-zinc-800
                focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
        </form>
    )
}

export default SearchBox