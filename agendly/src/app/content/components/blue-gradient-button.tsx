'use client';
import { useState } from 'react'
interface BlueGradientButtonProps {
  type?: 'button' | 'submit' | 'reset'
}
export default function BlueGradientButtonComponent({type}: BlueGradientButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      className={`
        px-8 py-3 rounded-md font-semibold text-white transition-all duration-300
         ${isHovered ? 'blue-gradient-hover' : 'bg-blue-600'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type={type}
    >
      Sign Up
      <style jsx>{`
        .blue-gradient-hover {
          background: radial-gradient(
            circle,
            #0077be 0%,
            #1e90ff 25%,
            #4169e1 50%,
            #0000cd 75%,
            #191970 100%
          );
          background-size: 200% 200%;
          animation: pulse 4s ease infinite;
        }

        @keyframes pulse {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
      `}</style>
    </button>
  )
}