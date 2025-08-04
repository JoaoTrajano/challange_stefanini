export class Email {
  private readonly value: string

  constructor(email: string) {
    const normalized = this.normalize(email)

    if (!this.isValid(normalized)) throw new Error('E-mail is not valid')

    this.value = normalized
  }

  private normalize(email: string): string {
    return email.trim().toLowerCase()
  }

  private isValid(email: string): boolean {
    return email.includes('@')
  }

  public getValue(): string {
    return this.value
  }
}
