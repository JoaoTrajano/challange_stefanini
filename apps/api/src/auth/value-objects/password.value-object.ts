export type PasswordCrypter = {
  encrypt: (value: string) => string
  compare: (value: string, hash: string) => boolean
  decrypt?: (value: string) => string
}

export class Password {
  private _value: string

  constructor(value: string) {
    this._value = value
  }

  get value(): string {
    return this._value
  }

  set value(newValue: string) {
    this._value = newValue
  }

  static passwordsAreTheSame(
    password: string,
    confirmPassword: string
  ): boolean {
    return password !== confirmPassword
  }

  public encryptPassword(crypter: PasswordCrypter) {
    this._value = crypter.encrypt(this._value) as string
    return
  }

  public encryptNewPassword(
    crypter: PasswordCrypter,
    password: Password
  ): void {
    this._value = crypter.encrypt(password.value) as string
    return
  }

  public comparePasswordWithHash(
    crypter: PasswordCrypter,
    password: Password
  ): boolean {
    return crypter.compare(password.value, this.value) as boolean
  }

  toString(): string {
    return this._value
  }
}
