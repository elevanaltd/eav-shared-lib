# UI Module

Shared UI components for EAV apps.

## Components

### Header

Provides consistent header layout across all EAV apps with fixed positioning, 3-column grid layout, and responsive design.

**Features:**
- Fixed header with consistent z-index (1000)
- 3-column grid: Title (left), Save Status (center), User Controls (right)
- Responsive design (hides save status on mobile, collapses email on tablet)
- Framework-agnostic (apps pass user data as props)

**Usage:**

```tsx
import { Header } from '@elevanaltd/shared-lib/ui'

function App() {
  const { user } = useAuth() // Your app's auth hook
  const [lastSaved, setLastSaved] = useState<Date>()

  return (
    <>
      <Header
        title="Script Editor"
        userEmail={user?.email}
        lastSaved={lastSaved}
        onSettings={() => setShowSettings(true)}
      />
      {/* Your app content with 64px top padding */}
    </>
  )
}
```

**Props:**

```typescript
interface HeaderProps {
  /** App-specific title (e.g., "Script Editor", "Scene Planning") */
  title: string

  /** Current user's email (optional, passed by app from auth state) */
  userEmail?: string

  /** Last save timestamp - UI formats as "5s ago", "3m ago", etc. */
  lastSaved?: Date

  /** Callback when settings button clicked (app handles modal/drawer) */
  onSettings: () => void
}
```

**Time Formatting:**
- < 60s: "5s ago"
- < 60m: "3m ago"
- < 24h: "2h ago"
- >= 24h: Full date (e.g., "10/24/2025")

**Responsive Behavior:**
- **Desktop (> 768px):** Full layout with title, save status, email, and settings
- **Tablet (480-768px):** Hides user email, shows condensed save status
- **Mobile (< 480px):** Hides save status completely, shows only title and settings

**CSS Import:**
The Header component automatically imports its CSS. Your app should add top padding to account for the fixed header:

```css
.app-container {
  padding-top: 64px; /* Height of fixed header */
}
```

**Test Coverage:** 9/9 tests passing, 100% coverage

---

## Installation

```bash
npm install @elevanaltd/shared-lib
```

## Importing

```typescript
// Direct import (recommended for tree-shaking)
import { Header } from '@elevanaltd/shared-lib/ui'

// Main barrel export
import { Header } from '@elevanaltd/shared-lib'
```

## Development

See main README for build and test instructions.
