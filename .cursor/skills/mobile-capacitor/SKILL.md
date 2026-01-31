---
name: mobile-capacitor
description: Capacitor 모바일 앱 개발 패턴 및 모바일 특화 기능. 모바일 개발, Capacitor 플러그인 사용, 네이티브 기능 구현 시 사용합니다.
---

# Mobile and Capacitor Patterns

Capacitor 모바일 앱 개발 패턴 및 모바일 특화 기능 가이드입니다.

## When to Use

- 모바일 앱 개발 작업 시
- Capacitor 플러그인 사용 시
- 네이티브 기능 구현 시
- 플랫폼별 분기 처리 시
- Safe area 처리 시
- 모바일 최적화 작업 시

## Capacitor Basics

### Platform Check

```typescript
const isNative = window.Capacitor?.isNativePlatform() ?? false
const platform = window.Capacitor?.getPlatform() ?? 'web'
```

### Platform Branching

```typescript
if (platform === 'android') {
  // Android-specific code
} else if (platform === 'ios') {
  // iOS-specific code
} else {
  // Web code
}
```

## Safe Area Handling

### Tailwind Safe Area

- `pb-safe`: Bottom safe area
- `pt-safe`: Top safe area
- `pb-safe-offset-XX`: Bottom offset

### CSS Variables

```typescript
// Set Safe Area insets
document.documentElement.style.setProperty('--safe-area-inset-top', '0px')
document.documentElement.style.setProperty('--safe-area-inset-bottom', '0px')
```

## Mobile-Specific Features

### Get App Info

```typescript
import { App } from '@capacitor/app'

const appInfo = await App.getInfo()
// { id, name, version, build }
```

### Device Information

```typescript
import { Device } from '@capacitor/device'

const deviceInfo = await Device.getInfo()
const deviceId = await Device.getId()
```

### Open Browser

```typescript
import { Browser } from '@capacitor/browser'

await Browser.open({
  url: 'https://example.com'
})
```

### App URL Handling

```typescript
import { App } from '@capacitor/app'

await App.addListener('appUrlOpen', async ({ url }) => {
  // Handle custom URL scheme
  const parsedUrl = new URL(url)
  // Handle routing
})
```

## Mobile UI Considerations

### Max Width

- Mobile max width: `max-w-[430px]`
- Center alignment: `mx-auto`

### Touch Events

- Set `touch-action: pan-x pan-y`
- Set `-webkit-tap-highlight-color: transparent`

### Scroll

- Use `no-scrollbar` class
- Consider safe area for scroll area

### Keyboard Handling

```typescript
import { Keyboard } from '@capacitor/keyboard'

Keyboard.addListener('keyboardWillShow', () => {
  // Handle keyboard show
})

Keyboard.addListener('keyboardWillHide', () => {
  // Handle keyboard hide
})
```

## Environment Variables

### App Environment

- `NEXT_PUBLIC_APP_ENV`: `local`, `prod`, etc.
- `NEXT_PUBLIC_BUILD_VERSION`: Build version

### Environment Branching

```typescript
if (process.env.NEXT_PUBLIC_APP_ENV === 'local') {
  // Development environment code
}

if (process.env.NEXT_PUBLIC_APP_ENV !== 'prod') {
  // Development/staging environment code
}
```

## Mobile Optimization

### Image Optimization

- Use `LazyImage` component
- Thumbnail + original image loading
- Consider safe area for image size

### Performance Optimization

- Utilize React Query caching
- Code splitting
- Lazy image loading

### Network Handling

- Offline state handling
- Network error retry
- Loading state display

## Related Rules

- `libraries`: Capacitor plugins and mobile libraries
- `file-structure`: Mobile-specific file organization
- `component-patterns`: Mobile UI component patterns
