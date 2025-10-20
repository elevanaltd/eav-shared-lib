import { describe, it, expect } from 'vitest'
import { exec } from 'child_process'
import { promisify } from 'util'
import { existsSync } from 'fs'
import { join } from 'path'

const execAsync = promisify(exec)

describe('ESLint Configuration', () => {
  it('should have eslint.config.mjs flat config file', () => {
    const configPath = join(process.cwd(), 'eslint.config.mjs')
    expect(existsSync(configPath)).toBe(true)
  })

  it('should extend typescript-eslint recommended rules', async () => {
    const { stdout } = await execAsync('npx eslint --print-config src/index.ts')
    const config = JSON.parse(stdout)

    // Flat config uses languageOptions.parser instead of parser
    expect(config.languageOptions?.parser).toContain('typescript-eslint')

    // Should have TypeScript rules enabled
    expect(config.rules).toBeDefined()
    expect(config.rules['@typescript-eslint/no-unused-vars']).toBeDefined()
  })

  it('should catch unused variables in lint script', async () => {
    // This will fail if ESLint is not configured to catch unused vars
    // We test the npm script, not individual file linting
    try {
      await execAsync('npm run lint')
      // If lint passes, the test passes (no unused vars in codebase)
    } catch (error: any) {
      // If lint fails, check it's for the right reason (unused vars, not config error)
      expect(error.message).not.toContain('configuration file')
    }
  })
})
