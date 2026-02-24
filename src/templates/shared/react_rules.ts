export function getReactRules(): string {
  return `# React Rules

## Component Patterns

- Use functional components with TypeScript for all components.
- Define props with explicit TypeScript interfaces.
- Prefer component composition over prop drilling.
- Keep components small and focused on a single responsibility.
- Extract reusable logic into custom hooks.

## Hooks

- Use useState for local component state.
- Use useEffect for side effects; always specify dependency arrays.
- Use useCallback to memoize event handlers passed to child components.
- Use useMemo for expensive computations that depend on specific inputs.
- Follow the Rules of Hooks: only call hooks at the top level.
- Create custom hooks (useX) to encapsulate reusable stateful logic.

## State Management

- Use React Context for lightweight global state.
- Use Zustand or Redux Toolkit for complex application state.
- Colocate state as close to where it is used as possible.
- Avoid redundant state; derive values from existing state when possible.

## Error Handling

- Use Error Boundaries to catch unexpected rendering errors.
- Display user-friendly fallback UI when errors occur.
- Log errors to an external monitoring service.
- Handle async errors in useEffect with proper cleanup.

## Testing

- Test components with React Testing Library.
- Write tests that interact with the DOM the way users do.
- Avoid testing implementation details; focus on behavior.
- Use jest.mock or vi.mock for isolating external dependencies.
- Follow the Arrange-Act-Assert pattern for test structure.

## Accessibility

- Use semantic HTML elements (nav, main, article, button).
- Provide ARIA labels for interactive elements without visible text.
- Ensure keyboard navigation works for all interactive elements.
- Test with screen readers and accessibility audit tools.
- Maintain proper heading hierarchy.

## Performance

- Use React.memo for components that render often with the same props.
- Avoid anonymous functions in JSX when they cause unnecessary re-renders.
- Implement code splitting with React.lazy and Suspense.
- Use virtualization for long lists (react-window or react-virtualized).
- Profile with React DevTools before optimizing.

## File Naming Conventions

- Components: PascalCase (e.g., UserProfile.tsx).
- Hooks: camelCase prefixed with use (e.g., useAuth.ts).
- Utilities: camelCase (e.g., formatDate.ts).
- Test files: \`*.test.tsx\` or \`*.test.ts\`.
- Style files: \`*.module.css\` or colocated with components.

## Project Structure

\`\`\`
src/
  components/     # Reusable UI components
  hooks/          # Custom hooks
  pages/          # Page-level components or route views
  context/        # React Context providers
  services/       # API and external service integrations
  utils/          # Utility functions
  types/          # Shared TypeScript types
\`\`\`
`;
}
