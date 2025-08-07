type EmailProps = {
  value: string
}

export class Email {
  private _value: string

  constructor(props: EmailProps) {
    this._value = props.value
  }

  get value(): string {
    return this._value
  }

  static isValid(email: string): boolean {
    return email.includes('@')
  }
}
