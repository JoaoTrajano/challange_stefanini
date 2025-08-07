export class Document {
  private readonly _value: string

  constructor(cpf: string) {
    const cleaned = this.clean(cpf)

    this._value = cleaned
  }

  get value(): string {
    return this._value
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

  public isValid(): boolean {
    if (!this._value || this._value.length !== 11) return false

    if (/^(\d)\1{10}$/.test(this._value)) return false

    const firstNineDigits = this._value.substring(0, 9)
    const firstCheckDigit = this.calcCheckDigit(firstNineDigits, 10)
    const secondCheckDigit = this.calcCheckDigit(
      firstNineDigits + firstCheckDigit,
      11
    )

    return (
      this._value ===
      firstNineDigits + firstCheckDigit.toString() + secondCheckDigit.toString()
    )
  }

  public format(): string {
    return this._value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
}
