import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number
    max?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    ({ className, value = 0, max = 100, ...props }, ref) => {
        const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

        return (
            <div
                ref={ref}
                className={cn(
                    "relative h-2 w-full overflow-hidden rounded-full",
                    className
                )}
                style={{ backgroundColor: '#1a2a2f' }}
                {...props}
            >
                <div
                    className="h-full transition-all duration-300 ease-in-out"
                    style={{ width: `${percentage}%`, backgroundColor: '#93D333' }}
                />
            </div>
        )
    }
)
Progress.displayName = "Progress"

export { Progress }
