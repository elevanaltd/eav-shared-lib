import { describe, it, expect } from 'vitest'
import * as uiModule from './index.js'
import type { HeaderProps } from './index.js'

describe('UI Module Barrel Exports', () => {
  it('should export Header component', () => {
    expect(uiModule.Header).toBeDefined()
    expect(typeof uiModule.Header).toBe('function')
  })

  it('should export HeaderProps type', () => {
    // Type exports are validated at compile time by TypeScript
    // This test verifies the type is accessible through the barrel export
    const mockProps: HeaderProps = {
      title: 'Test App',
      lastSaved: new Date(),
      onSettings: () => {},
    }
    expect(mockProps).toBeDefined()
    expect(mockProps.title).toBe('Test App')
  })
})
