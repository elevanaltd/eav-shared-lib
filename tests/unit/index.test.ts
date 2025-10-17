import { describe, it, expect } from 'vitest'
import { existsSync } from 'fs'
import { join } from 'path'

describe('Package Infrastructure', () => {
  it('should have src/index.ts entry point', () => {
    const indexPath = join(process.cwd(), 'src', 'index.ts')
    expect(existsSync(indexPath)).toBe(true)
  })
})
