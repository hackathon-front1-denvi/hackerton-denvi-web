---
name: update-rules
description: Update Rules
disable-model-invocation: true
---

# Update Rules

Use this command after resolving errors or issues to update project rules and prevent future occurrences.

**Usage**: `/update-rules [error description and solution]`

## Workflow

### 1. Error Resolution

#### 1.1 Identify Error

- [ ] Document the error
- [ ] Understand root cause
- [ ] Identify affected areas
- [ ] Check if similar issues exist

#### 1.2 Resolve Error

- [ ] Fix the immediate issue
- [ ] Test the fix
- [ ] Verify no regressions
- [ ] Document the solution

### 2. Rule Analysis

#### 2.1 Analyze Why Error Occurred

- [ ] Was it a missing rule?
- [ ] Was it an unclear rule?
- [ ] Was it a pattern violation?
- [ ] Was it a type safety issue?

#### 2.2 Determine Rule Update Needed

- [ ] Add new rule?
- [ ] Update existing rule?
- [ ] Add example?
- [ ] Add warning?

### 3. Update Rules

#### 3.1 Identify Target Rule File

- Check `.cursor/rules/` directory
- Determine which rule file to update
- Or create new rule if needed

#### 3.2 Add Rule Content

**Pattern: Error Prevention Rule**

```markdown
## Error Prevention

### Common Error: [Error Description]

**Problem:**
[What went wrong]

**Solution:**
[How to fix]

**Prevention:**

- Always [do this]
- Never [do this]
- Check [this] before [that]

**Example:**
\`\`\`typescript
// ❌ Wrong
[bad code example]

// ✅ Correct
[good code example]
\`\`\`
```

### 4. Document Update

#### 4.1 Add to Appropriate Section

- Add to "Common Errors" section
- Add to "Best Practices" section
- Add to "Anti-Patterns" section
- Add to specific pattern section

#### 4.2 Include Examples

- Add "Wrong" example
- Add "Correct" example
- Add real-world scenario

### 5. Verification

#### 5.1 Test Rule Clarity

- [ ] Rule is clear and actionable
- [ ] Examples are helpful
- [ ] Rule prevents the error
- [ ] Rule doesn't conflict with others

## Rule Update Templates

### Template 1: Error Prevention Rule

```markdown
### Error: [Error Name]

**Symptoms:**

- [What happens]
- [Error message if any]

**Root Cause:**
[Why it happens]

**Solution:**
[How to fix]

**Prevention Checklist:**

- [ ] Always [action]
- [ ] Never [action]
- [ ] Verify [condition] before [action]

**Code Example:**
\`\`\`typescript
// ❌ Causes error
[bad code]

// ✅ Prevents error
[good code]
\`\`\`
```

### Template 2: Pattern Enhancement

```markdown
### Enhanced Pattern: [Pattern Name]

**Context:**
[When this pattern is used]

**Previous Issue:**
[What went wrong before]

**Updated Pattern:**
[New/updated pattern]

**Implementation Steps:**

1. [Step 1]
2. [Step 2]
3. [Step 3]

**Example:**
\`\`\`typescript
[complete example]
\`\`\`
```

## Common Rule Categories

### 1. Import Rules

- Path alias usage
- Import order
- Type imports

### 2. Component Rules

- Client vs Server components
- Props typing
- Ref forwarding

### 3. API Rules

- Error handling
- Type safety
- Request/response patterns

### 4. State Management Rules

- Store patterns
- React Query usage
- State location decisions

### 5. Type Safety Rules

- Avoiding `any`
- Proper typing
- Type guards

## Rule Update Checklist

- [ ] Error is resolved
- [ ] Root cause identified
- [ ] Rule update planned
- [ ] Rule content written
- [ ] Examples included
- [ ] Related rules checked
- [ ] Documentation updated
- [ ] Rule is clear and actionable
- [ ] No conflicts with other rules

## Example: Adding Error Prevention Rule

**Scenario:** Component was missing `'use client'` directive, causing hydration error.

**Rule Addition:**

```markdown
### Error: Missing 'use client' Directive

**Symptoms:**

- Hydration mismatch errors
- "useState is not defined" errors
- Component not interactive

**Root Cause:**
Using client-side hooks (useState, useEffect, etc.) in server component.

**Solution:**
Add `'use client'` directive at top of component file.

**Prevention Checklist:**

- [ ] Check if component uses hooks
- [ ] Check if component uses browser APIs
- [ ] Check if component has event handlers
- [ ] Add `'use client'` if any above is true

**Code Example:**
\`\`\`typescript
// ❌ Missing directive
export default function Component() {
const [state, setState] = useState() // Error!
}

// ✅ Correct
'use client'

export default function Component() {
const [state, setState] = useState() // Works!
}
\`\`\`
```

## Best Practices

1. **Be Specific**: Include exact error messages and scenarios
2. **Provide Examples**: Show both wrong and correct code
3. **Link Related Rules**: Cross-reference related patterns
4. **Update Promptly**: Add rules soon after fixing errors
5. **Review Regularly**: Periodically review and update rules
6. **Test Rules**: Verify rules prevent the error
7. **Keep Organized**: Maintain rule structure and hierarchy
