import { describe, expect, it } from 'vitest'
import { Document } from '../document.value-object'

describe('Value Object Document Unit Test', () => {
  it('should be return true if document is valid', () => {
    const document = new Document('930.078.240-10')
    expect(document.value).toEqual('93007824010')
  })

  it('should be return true if document not have formated', () => {
    const document = new Document('93007824010')
    expect(document.value).toEqual('93007824010')
  })

  it('should be able of the return document with formatting', () => {
    const document = new Document('930.078.240-10')
    expect(document.format()).toEqual('930.078.240-10')
  })

  it('should be able of the return false if document isnt valid', () => {
    expect(new Document('1234567').isValid()).toBeFalsy()
  })
})
