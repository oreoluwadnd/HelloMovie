import * as React from "react";

import { cn } from "../utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative w-full  flex justify-center items-center">
        <input
          type={type}
          className={cn(
            "flex text-white w-full  h-14 md:h-[60px] md:placeholder:text-lg rounded-2xl text-xl bg-slate-900 px-14 ring-offset-background placeholder:text-base placeholder:text-slate-600  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute top-0 left-0 flex h-full text-amber-400 ml-6">
          <svg
            className="w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M7.222 0a7.222 7.222 0 0 1 5.775 11.56l-.011.012 4.721 4.72a1 1 0 0 1 .083 1.32l-.083.095a1 1 0 0 1-1.414 0l-4.721-4.721-.012.01a7.187 7.187 0 0 1-4.095 1.444l-.243.004A7.222 7.222 0 1 1 7.222 0Zm0 2a5.222 5.222 0 1 0 0 10.444A5.222 5.222 0 0 0 7.222 2Z"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
