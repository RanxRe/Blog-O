import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { FileX2 } from "lucide-react";

const EmptyState = ({ title, description, actionText, actionLink }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4">

            {/* Icon */}
            <div className="bg-muted p-5 rounded-full mb-6 shadow-sm">
                <FileX2 className="w-10 h-10 text-gray-500" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h2>

            {/* Description */}
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                {description}
            </p>

            {/* Action Button */}
            {actionText && (
                <Link to={actionLink}>
                    <Button className="px-6 py-2 cursor-pointer">
                        {actionText}
                    </Button>
                </Link>
            )}
        </div>
    );
};

export default EmptyState;