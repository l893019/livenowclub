# SubscribeTab Component

Smart floating subscribe button that appears after user engagement.

## Features

- Appears after 30s OR 50% scroll (whichever first)
- Slides in from right edge (desktop) or bottom-right (mobile)
- 7-day dismissal memory with localStorage
- Wraps existing EmailCapture component
- Responsive design with mobile optimizations

## Usage

```tsx
import SubscribeTab from '@/components/SubscribeTab';

// In layout
<SubscribeTab />
```

## Behavior

**Triggers:**
- Time: Shows after 30 seconds on page
- Scroll: Shows after scrolling 50% down page

**Dismissal:**
- Close button (✕): Hides for 7 days
- Backdrop/ESC: Closes panel but keeps tab visible
- After subscribe: Clears dismissal, shows "Subscribed" state

**localStorage Keys:**
- `subscribe-tab-dismissed-until`: Timestamp for 7-day dismissal

## Styling

Customize via `SubscribeTab.module.css`:
- `.tab`: Main button styles
- `.panel`: Slide-in panel styles
- `.backdrop`: Overlay backdrop
