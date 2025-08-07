import { format } from 'date-fns'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChevronDownIcon } from 'lucide-react'
import { Label } from './ui/label'

type DatePickerProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label?: string
  minDate?: string
  maxDate?: Date
  onChange?: (date: string) => void
  required?: boolean
}

export function DatePicker<T extends FieldValues>({
  control,
  name,
  label = 'Escolha uma data',
  required = false,
}: DatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange: fieldOnChange } }) => (
        <div className="flex flex-col gap-3">
          <Label htmlFor="date">
            {label} {required && <span className="ml-1 text-red-600">*</span>}
          </Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal"
              >
                {value ? format(value, 'dd/MM/yyyy') : 'Selecione uma data'}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={value}
                onSelect={fieldOnChange}
                className="border-black"
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  )
}
