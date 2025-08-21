import * as React from "react"

import { cn } from "@/lib/cn"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoExpand?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoExpand, onChange, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    
    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoExpand && textareaRef.current) {
        // Reset height to auto to get the correct scrollHeight
        textareaRef.current.style.height = 'auto';
        // Set the height to the scrollHeight
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
      
      // Call the original onChange handler if provided
      if (onChange) {
        onChange(e);
      }
    };
    
    return (
      <textarea
        className={cn(
          "flex min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={textareaRef}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea } 