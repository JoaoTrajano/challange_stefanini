import { format } from 'date-fns'

export function formatDateBR(date: string | Date | null | undefined): string {
  console.log(date)
  if (!date) {
    return '-'
  }

  try {
    if (date instanceof Date) {
      return format(date, 'dd/MM/yyyy')
    }
    return format(new Date(date), 'dd/MM/yyyy')
  } catch (error) {
    return '-'
  }
}

export function formatDateTimeBR(
  date: string | Date | null | undefined
): string {
  if (!date) {
    return '-'
  }

  try {
    if (date instanceof Date) {
      return format(date, 'dd/MM/yyyy - HH:mm:ss')
    }
    return format(new Date(date), 'dd/MM/yyyy - HH:mm:ss')
  } catch (error) {
    return '-'
  }
}

export function formatPdvCode(code: string | null | undefined): string {
  if (!code) {
    return '-'
  }

  try {
    const paddedCode = code.padStart(8, '0')
    return `${paddedCode.substring(0, 4)}-${paddedCode.substring(4, 8)}`
  } catch (error) {
    return code
  }
}

export function formatSellerCode(code: string | null | undefined): string {
  if (!code) {
    return '-'
  }

  try {
    return code.padStart(8, '0')
  } catch (error) {
    return code
  }
}
