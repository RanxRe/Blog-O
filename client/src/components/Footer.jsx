import React from 'react'

const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <div className='text-center text-sm bg-gray-50 py-2' >
            <span style={{ fontStyle: "italic" }} >@ Copyright {year} | Designed & Developed by :- Dev Ranjeet</span>
        </div>
    )
}

export default Footer