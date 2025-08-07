import { memo } from 'react'

type MessageErrorInputProps = {
  message?: string
}

export function FormMessageComponent({ message }: MessageErrorInputProps) {
  if (!message) return null

  return <p className="text-[0.8rem] font-bold text-red-500">{message}</p>
}

export const FormMessage = memo(
  FormMessageComponent
) as typeof FormMessageComponent
