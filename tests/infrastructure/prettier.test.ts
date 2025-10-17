import { describe, it, expect } from 'vitest'
import { exec } from 'child_process'
import { promisify } from 'util'
import { existsSync } from 'fs'
import { join } from 'path'
import { readFile, writeFile } from 'fs/promises'

const execAsync = promisify(exec)

describe('Prettier Configuration', () => {
  it('should have .prettierrc config file', () => {
    const configPath = join(process.cwd(), '.prettierrc')
    expect(existsSync(configPath)).toBe(true)
  })

  it('should format code consistently', async () => {
    // Create unformatted test file
    const testFile = join(process.cwd(), 'src', '__prettier-test__.ts')
    const unformatted = 'const x={a:1,b:2};export{x}'
    await writeFile(testFile, unformatted)

    try {
      // Run prettier
      await execAsync(`npx prettier --write ${testFile}`)
      const formatted = await readFile(testFile, 'utf-8')

      // Should add spaces and proper formatting
      expect(formatted).toContain('const x = ')
      expect(formatted).toContain('a: 1')
      expect(formatted).toContain('b: 2')
    } finally {
      // Cleanup
      await execAsync(`rm -f ${testFile}`)
    }
  })

  it('should use single quotes configuration', async () => {
    const testFile = join(process.cwd(), 'src', '__prettier-test2__.ts')
    await writeFile(testFile, 'const str = "double quotes"')

    try {
      await execAsync(`npx prettier --write ${testFile}`)
      const formatted = await readFile(testFile, 'utf-8')

      // Should convert to single quotes
      expect(formatted).toContain("'")
      expect(formatted).not.toContain('"double quotes"')
    } finally {
      await execAsync(`rm -f ${testFile}`)
    }
  })
})
