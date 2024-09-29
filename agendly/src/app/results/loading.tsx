'use client'
export default function Loading() {
    return (
        <div>
            <span className="inline-block h-5 animate-pulse bg-gray-200" 
            style={{animationDelay: `${1 * 0.5}s`, animationDuration: "1s"}}></span>
            <h1>Loading...</h1>
        </div>
    );
}