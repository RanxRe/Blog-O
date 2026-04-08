import React from "react";
import { Link } from "react-router";

const Error = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">

            {/* SVG Illustration */}
            <div className="w-72 md:w-96 mb-8">
                <svg
                    viewBox="0 0 500 300"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="120"
                        fontWeight="bold"
                        dy=".3em"
                    >
                        404
                    </text>
                </svg>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
                Oops! Page not found
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-center max-w-md mb-6">
                The page you are looking for doesn’t exist or has been moved.
                Let’s get you back on track.
            </p>

            {/* Button */}
            <Link
                to="/"
                className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:opacity-90 transition flex items-center gap-2"
            >
                ← Go Home
            </Link>

        </div>
    );
};

export default Error;