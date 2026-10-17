import { cn } from "@/lib/utils"

/**
 * Standard layout frame (see the `frame` utility in globals.css): fluid up to
 * 1720px with 48 / 32 / 20px minimum gutters. Narrower reading measures are
 * set per element, not by squeezing the frame.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("frame", className)} {...props} />
}
