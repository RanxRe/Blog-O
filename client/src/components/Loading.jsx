import React from 'react'
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { LoaderIcon } from "lucide-react"

function Loading({ className, ...props }) {
    return (
        <LoaderIcon
            role="status"
            aria-label="Loading"
            className={cn("size-20 animate-spin flex justify-center items-center", className)}
            {...props}
        />
    )
}

export function SpinnerCustom() {
    return (
        <div className="flex items-center justify-center gap-4">
            <Spinner />
        </div>
    )
}
export default Loading