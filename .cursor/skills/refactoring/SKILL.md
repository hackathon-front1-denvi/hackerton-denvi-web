---
name: refactoring
description: Refactoring
disable-model-invocation: true
---

# Refactoring

Use this command when refactoring existing code. Follow systematic steps to ensure code quality and maintainability.

**Usage**: `/refactoring [component/file description]`

## Refactoring Workflow

### 1. Analysis Phase

#### 1.1 Identify Refactoring Scope

- [ ] Analyze current code structure
- [ ] Identify code smells and issues
- [ ] Check for duplicated code
- [ ] Identify performance bottlenecks
- [ ] Review type safety issues

#### 1.2 Understand Dependencies

- [ ] Map component dependencies
- [ ] Identify API dependencies
- [ ] Check store dependencies
- [ ] Review hook dependencies
- [ ] Document breaking changes

### 2. Planning Phase

#### 2.1 Create Refactoring Plan

- [ ] List refactoring steps
- [ ] Identify test points
- [ ] Plan migration strategy
- [ ] Set success criteria
- [ ] Estimate impact

#### 2.2 Backup & Safety

- [ ] Ensure tests exist or create them
- [ ] Create feature branch
- [ ] Document current behavior
- [ ] Identify rollback points

### 3. Refactoring Types

#### 3.1 Component Refactoring

**Extract Component**

```typescript
// Before: Large component
export default function LargeComponent() {
  // ... 200+ lines
}

// After: Extracted components
export default function LargeComponent() {
  return (
    <>
      <HeaderSection />
      <ContentSection />
      <FooterSection />
    </>
  )
}
```

**Split Client/Server Components**

```typescript
// Before: Mixed concerns
export default function Component() {
  'use client'
  // Server and client logic mixed
}

// After: Separated
// Server Component
export default function Component() {
  return <ClientComponent />
}

// Client Component
'use client'
export default function ClientComponent() {
  // Client-only logic
}
```

**Extract Custom Hooks**

```typescript
// Before: Logic in component
export default function Component() {
  const [state, setState] = useState()
  useEffect(() => {
    // Complex logic
  }, [])
}

// After: Extracted hook
export default function Component() {
  const { state, actions } = useCustomLogic()
}

function useCustomLogic() {
  const [state, setState] = useState()
  useEffect(() => {
    // Complex logic
  }, [])
  return { state, actions }
}
```

#### 3.2 API Refactoring

**Consolidate API Calls**

```typescript
// Before: Multiple calls
const data1 = await getXxx1()
const data2 = await getXxx2()

// After: Combined or parallel
const [data1, data2] = await Promise.all([getXxx1(), getXxx2()])
```

**Extract API Logic**

```typescript
// Before: API logic in component
export default function Component() {
  const fetchData = async () => {
    const res = await axios.get('/endpoint')
    // Processing logic
  }
}

// After: Extracted to API function
// src/api/domain/index.ts
export const getXxx = async () => {
  const { data } = await axios.get('/endpoint')
  return processData(data)
}
```

#### 3.3 State Refactoring

**Move to Appropriate Store**

```typescript
// Before: Wrong state location
// Component state for global data
const [globalData, setGlobalData] = useState()

// After: Zustand store
export const useGlobalStore = create((set) => ({
  globalData: null,
  setGlobalData: (data) => set({ globalData: data })
}))
```

**Consolidate Related State**

```typescript
// Before: Scattered state
const [field1, setField1] = useState()
const [field2, setField2] = useState()

// After: Grouped state
const [formState, setFormState] = useState({
  field1: '',
  field2: ''
})
```

#### 3.4 Type Refactoring

**Improve Type Safety**

```typescript
// Before: Loose types
function process(data: any) {
  return data.value
}

// After: Strict types
interface ProcessData {
  value: string
}
function process(data: ProcessData): string {
  return data.value
}
```

**Extract Common Types**

```typescript
// Before: Duplicated types
interface Component1Props {
  id: string
  name: string
}
interface Component2Props {
  id: string
  name: string
}

// After: Shared types
// src/types/common.ts
export interface BaseEntity {
  id: string
  name: string
}
```

### 4. Implementation Phase

#### 4.1 Step-by-Step Refactoring

- [ ] Start with smallest changes
- [ ] Refactor one module at a time
- [ ] Keep tests passing
- [ ] Commit frequently
- [ ] Test after each step

#### 4.2 Maintain Functionality

- [ ] Ensure same behavior
- [ ] Keep API contracts
- [ ] Maintain type safety
- [ ] Preserve error handling
- [ ] Keep performance same or better

### 5. Testing Phase

#### 5.1 Update Tests

- [ ] Update unit tests
- [ ] Update integration tests
- [ ] Test refactored components
- [ ] Test API changes
- [ ] Test state changes

#### 5.2 Manual Testing

- [ ] Test all affected features
- [ ] Test error scenarios
- [ ] Test edge cases
- [ ] Test on mobile
- [ ] Test performance

### 6. Code Quality

#### 6.1 Apply Standards

- [ ] Follow naming conventions
- [ ] Apply code formatting
- [ ] Remove unused code
- [ ] Add missing types
- [ ] Improve comments

#### 6.2 Run Quality Checks

```bash
yarn lint
yarn type-check
yarn format
yarn test
```

### 7. Documentation

#### 7.1 Update Documentation

- [ ] Update code comments
- [ ] Update README if needed
- [ ] Document breaking changes
- [ ] Update API docs

### 8. Review Checklist

- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Code is formatted
- [ ] Functionality preserved
- [ ] Performance maintained or improved
- [ ] Types are improved
- [ ] Code is more maintainable
- [ ] Dependencies are correct
- [ ] No breaking changes (or documented)

## Common Refactoring Patterns

### Extract Constants

```typescript
// Before: Magic numbers/strings
if (status === 'active') {
}

// After: Constants
const STATUS = {
  ACTIVE: 'active'
} as const
if (status === STATUS.ACTIVE) {
}
```

### Extract Utility Functions

```typescript
// Before: Inline logic
const result = data.map((item) => item.value.toUpperCase())

// After: Utility function
// src/utils/index.ts
export const extractAndUppercase = (data: Data[]) => {
  return data.map((item) => item.value.toUpperCase())
}
```

### Simplify Conditional Logic

```typescript
// Before: Complex conditionals
if (a && b && c) {
  if (d || e) {
    // logic
  }
}

// After: Early returns or extracted functions
if (!a || !b || !c) return
if (!d && !e) return
// logic
```

## Refactoring Best Practices

1. **Small Steps**: Refactor in small, incremental changes
2. **Test Coverage**: Ensure tests exist before refactoring
3. **One Thing**: Refactor one concern at a time
4. **Preserve Behavior**: Maintain existing functionality
5. **Document Changes**: Document why and what changed
6. **Review Impact**: Consider impact on other modules
7. **Performance**: Monitor performance impact
8. **Type Safety**: Improve types, don't weaken them

## Anti-Patterns to Avoid

- ❌ Refactoring without tests
- ❌ Changing multiple things at once
- ❌ Breaking API contracts
- ❌ Removing error handling
- ❌ Making code less readable
- ❌ Introducing performance regressions
- ❌ Using `any` to avoid type issues
