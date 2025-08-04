import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type DatePickerProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label?: string
  minDate?: string
  maxDate?: Date
  onChange?: (date: string) => void
}

export function DatePicker<T extends FieldValues>({
  control,
  name,
  label = 'Escolha uma data',
}: DatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange: fieldOnChange } }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'hover:bg-gray-100k border-muted-foreground h-8 w-full rounded-md border text-left font-normal',
                !value && 'text-muted-foreground'
              )}
            >
              {value ? format(value, 'dd/MM/yyyy') : <span>{label}</span>}
              <CalendarIcon className="ml-auto h-4 w-4 text-black" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto border-black p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={fieldOnChange}
              disabled={(date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
              initialFocus
              className="border-black"
            />
          </PopoverContent>
        </Popover>
      )}
    />
  )
}
