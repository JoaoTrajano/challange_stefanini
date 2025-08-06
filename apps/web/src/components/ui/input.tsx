import { cn } from '@/lib/utils'
import * as React from 'react'
import { memo } from 'react'
import { Label } from './label'

interface InputProps extends React.ComponentProps<'input'> {
  label?: string
  required?: boolean
}

function InputComponent({
  className,
  type = 'text',
  label,
  required,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <Label htmlFor={props.name}>
          {label}
          {required && <span className="ml-1 text-red-600">*</span>}
        </Label>
      )}
      <input
        type={type}
        required={required}
        aria-required={required}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className
        )}
        {...props}
      />
    </div>
  )
}

export const Input = memo(InputComponent)
