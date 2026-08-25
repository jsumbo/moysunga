"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheck,
  CircleAlert,
  Info,
  LoaderCircle,
  TriangleAlert,
} from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheck className="size-4" strokeWidth={1.75} />,
        info: <Info className="size-4" strokeWidth={1.75} />,
        warning: <TriangleAlert className="size-4" strokeWidth={1.75} />,
        error: <CircleAlert className="size-4" strokeWidth={1.75} />,
        loading: <LoaderCircle className="size-4 animate-spin" strokeWidth={1.75} />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "cn-toast rounded-none border border-line bg-cream font-sans text-ink shadow-none",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
