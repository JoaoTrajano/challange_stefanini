import { describe, expect, it } from 'vitest'

import { left, right } from '../../either'

describe('Either unit test', () => {
  const doSomeThings = (value: boolean) => {
    if (value) {
      return right('success')
    }

    return left('failure')
  }
  it('should return success if is rigth', async () => {
    const result = doSomeThings(true)

    expect(result.isRight()).toBe(true)
    expect(result.isLeft()).toBe(false)
    expect(result.value).toEqual('success')
    expect(typeof result.value).toEqual('string')
  })

  it('should return failure if is left', async () => {
    const result = doSomeThings(false)

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toEqual('failure')
    expect(typeof result.value).toEqual('string')
  })
})
