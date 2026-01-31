---
name: code-review
description: Code Review
disable-model-invocation: true
---

# Code Review

Use this command to review code changes and ensure quality standards.

**Usage**: `/code-review [file or component name]`

## Review Checklist

### 1. Code Quality

#### 1.1 Type Safety

- [ ] No `any` types (or properly commented)
- [ ] All functions have return types
- [ ] Props are properly typed
- [ ] API responses are typed
- [ ] Type guards used where needed

#### 1.2 Code Style

- [ ] Follows naming conventions
- [ ] Proper import order
- [ ] Uses path aliases (`@/`)
- [ ] Code is formatted (Prettier)
- [ ] No ESLint warnings

#### 1.3 Best Practices

- [ ] No console.logs (production code)
- [ ] No hardcoded strings (use constants)
- [ ] Proper error handling
- [ ] Loading states handled
- [ ] Memory leaks prevented

### 2. Component Review

#### 2.1 Component Structure

- [ ] Correct component type (Server/Client)
- [ ] `'use client'` directive if needed
- [ ] Props interface defined
- [ ] Proper component naming
- [ ] Component is reusable

#### 2.2 Styling

- [ ] Uses Tailwind CSS
- [ ] Uses `twMerge` for dynamic classes
- [ ] Custom font sizes follow pattern
- [ ] Safe area handled (mobile)
- [ ] Responsive design

#### 2.3 Performance

- [ ] No unnecessary re-renders
- [ ] Proper memoization if needed
- [ ] Lazy loading for images
- [ ] Code splitting considered

### 3. API Review

#### 3.1 API Structure

- [ ] Types defined correctly
- [ ] BFF route follows pattern
- [ ] Error handling implemented
- [ ] Logging included
- [ ] Authentication handled

#### 3.2 React Query

- [ ] Query keys are correct
- [ ] Cache invalidation handled
- [ ] Error handling configured
- [ ] Loading states managed
- [ ] Optimistic updates (if needed)

### 4. State Management

#### 4.1 Zustand Store

- [ ] Store structure follows pattern
- [ ] State and functions separated
- [ ] Initial state defined
- [ ] Proper store naming
- [ ] Persist middleware (if needed)

#### 4.2 State Location

- [ ] Server state → React Query
- [ ] Client state → Zustand
- [ ] URL state → Next.js Router
- [ ] Form state → React Hook Form (if complex)

### 5. Testing

#### 5.1 Test Coverage

- [ ] Component tests written
- [ ] Hook tests written
- [ ] API function tests written
- [ ] Edge cases covered
- [ ] Error scenarios tested

#### 5.2 Test Quality

- [ ] Tests are meaningful
- [ ] Tests are maintainable
- [ ] Tests follow patterns
- [ ] Mocks are appropriate

### 6. Mobile Compatibility

#### 6.1 Mobile Considerations

- [ ] Safe area handled
- [ ] Platform detection (if needed)
- [ ] Touch interactions work
- [ ] Keyboard handling (if needed)
- [ ] Performance on mobile

### 7. Documentation

#### 7.1 Code Documentation

- [ ] JSDoc comments (complex functions)
- [ ] Component props documented
- [ ] API endpoints documented
- [ ] Complex logic explained

### 8. Security

#### 8.1 Security Checks

- [ ] No sensitive data exposed
- [ ] Authentication required (if needed)
- [ ] Input validation
- [ ] XSS prevention
- [ ] CSRF protection (if needed)

## Common Issues to Check

### Type Safety Issues

- ❌ Using `any` type
- ❌ Missing return types
- ❌ Untyped props
- ❌ Untyped API responses

### Component Issues

- ❌ Missing `'use client'` directive
- ❌ Server/client component confusion
- ❌ Props not typed
- ❌ Unnecessary re-renders

### API Issues

- ❌ Missing error handling
- ❌ No type definitions
- ❌ Missing logging
- ❌ Incorrect BFF pattern

### State Management Issues

- ❌ Wrong state location
- ❌ Missing cache invalidation
- ❌ No loading states
- ❌ Memory leaks

### Performance Issues

- ❌ Unnecessary re-renders
- ❌ Missing memoization
- ❌ Large bundle size
- ❌ No code splitting

## Review Comments Template

### Positive Feedback

```markdown
✅ Good: [What was done well]
```

### Suggestions

```markdown
💡 Suggestion: [What could be improved]
```

### Issues

```markdown
⚠️ Issue: [What needs to be fixed]
```

### Questions

```markdown
❓ Question: [What needs clarification]
```

## Review Process

1. **Initial Review**: Check code quality and standards
2. **Functional Review**: Verify functionality works
3. **Edge Cases**: Test edge cases and error scenarios
4. **Performance**: Check performance implications
5. **Security**: Review security considerations
6. **Documentation**: Verify documentation is adequate
7. **Final Approval**: Approve or request changes
