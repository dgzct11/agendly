'use client'
import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto p-4 max-w-3xl mt-20">
            <Skeleton className="h-9 w-64 mb-6 mx-auto"/> 
        <ul className="space-y-2">
        {[1, 2, 3, 4, 5].map((index) => (
          <li key={index} className="bg-card rounded-lg shadow-sm p-3">
            <div className="flex items-center">
              <Skeleton className="w-5 h-5 rounded-full mr-3" />
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                </div>
                <Skeleton className="h-4 w-24 mt-1" />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center space-x-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-56" />
      </div>
    </div>
    );
}