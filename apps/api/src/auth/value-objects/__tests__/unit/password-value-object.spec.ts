import { describe, expect, vi, beforeEach, it } from 'vitest'
import { Password, PasswordCrypter } from '../../password.value-object'

describe('Password', () => {
  let mockCrypter: PasswordCrypter

  beforeEach(() => {
    mockCrypter = {
      encrypt: vi.fn((val: string) => `encrypted-${val}`),
      compare: vi.fn((val: string, hash: string) => val === hash),
    }
  })

  it('should return the password value', () => {
    const password = new Password('123456')
    expect(password.value).toBe('123456')
  })

  it('should update the password value', () => {
    const password = new Password('123456')
    password.value = 'newPassword'
    expect(password.value).toBe('newPassword')
  })

  it('should detect that passwords are not the same', () => {
    const result = Password.passwordsAreTheSame('password1', 'password2')
    expect(result).toBe(true)
  })

  it('should detect that passwords are the same', () => {
    const result = Password.passwordsAreTheSame('samepass', 'samepass')
    expect(result).toBe(false)
  })

  it('should encrypt the current password using encryptPassword', () => {
    const password = new Password('123456')
    password.encryptPassword(mockCrypter)

    expect(mockCrypter.encrypt).toHaveBeenCalledWith('123456')
    expect(password.value).toBe('encrypted-123456')
  })

  it('should encrypt a new password using encryptNewPassword', () => {
    const password = new Password('original')
    const newPassword = new Password('newSecret')

    password.encryptNewPassword(mockCrypter, newPassword)

    expect(mockCrypter.encrypt).toHaveBeenCalledWith('newSecret')
    expect(password.value).toBe('encrypted-newSecret')
  })

  it('should compare password with hash correctly (true)', () => {
    const password = new Password('hash123')
    const plain = new Password('hash123')

    const result = password.comparePasswordWithHash(mockCrypter, plain)

    expect(mockCrypter.compare).toHaveBeenCalledWith('hash123', 'hash123')
    expect(result).toBe(true)
  })

  it('should compare password with hash correctly (false)', () => {
    const password = new Password('hash123')
    const plain = new Password('different')

    const result = password.comparePasswordWithHash(mockCrypter, plain)

    expect(mockCrypter.compare).toHaveBeenCalledWith('different', 'hash123')
    expect(result).toBe(false)
  })

  it('should convert to string correctly', () => {
    const password = new Password('secret123')
    expect(password.toString()).toBe('secret123')
  })
})
