export class Document {
  private readonly value: string

  constructor(cpf: string) {
    const cleaned = this.clean(cpf)

    if (!this.isValid(cleaned)) throw new Error('Document is not valid.')

    this.value = cleaned
  }

  private clean(cpf: string): string {
    return cpf.replace(/\D/g, '')
  }

  private calcCheckDigit = (base: string, factor: number): number => {
    let total = 0
    for (const digit of base) {
      total += parseInt(digit, 10) * factor--
    }
    const remainder = total % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  private isValid(cpf: string): boolean {
    if (!cpf || cpf.length !== 11) return false

    if (/^(\d)\1{10}$/.test(cpf)) return false

    const firstNineDigits = cpf.substring(0, 9)
    const firstCheckDigit = this.calcCheckDigit(firstNineDigits, 10)
    const secondCheckDigit = this.calcCheckDigit(
      firstNineDigits + firstCheckDigit,
      11
    )

    return (
      cpf ===
      firstNineDigits + firstCheckDigit.toString() + secondCheckDigit.toString()
    )
  }

  public getValue(): string {
    return this.value
  }

  public format(): string {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
}
