import React from "react";

export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        <rect width="32" height="32" rx="8" fill="url(#grad_bg)" />
        <path
          d="M9 10C9 8.89543 9.89543 8 11 8H17C18.6569 8 20 9.34315 20 11V15C20 16.6569 18.6569 18 17 18H13V22C13 23.1046 12.1046 24 11 24C9.89543 24 9 23.1046 9 22V10Z"
          fill="white"
        />
        <path
          d="M23 14C23 12.8954 22.1046 12 21 12C19.8954 12 19 12.8954 19 14V22C19 23.1046 19.8954 24 21 24C22.1046 24 23 23.1046 23 22V14Z"
          fill="white"
          fillOpacity="0.7"
        />
        <defs>
          <linearGradient
            id="grad_bg"
            x1="0"
            y1="0"
            x2="32"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1c4eff" />
            <stop offset="0.5" stopColor="#c86fff" />
            <stop offset="1" stopColor="#fe881b" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
        Project<span className="text-nexa-lavender-3 font-medium">Match</span>
      </span>
    </div>
  );
}
