export function getNextjsRules(): string {
  return `# Next.js Rules

## Core Principles

- Use TypeScript for all code with strict mode enabled.
- Prefer functional and declarative programming patterns.
- Use the RO-RO (Receive an Object, Return an Object) pattern for functions.
- Avoid classes; prefer pure functions and composable modules.

## React Server Components

- Default to React Server Components; minimize use of 'use client'.
- Move client interactivity to leaf components.
- Use server actions for data mutations.
- Fetch data on the server whenever possible.

## UI and Styling

- Use Shadcn UI and Radix primitives for accessible components.
- Style with Tailwind CSS using a mobile-first approach.
- Use CSS variables for theming and design tokens.
- Implement responsive design with Tailwind breakpoints.

## Validation and Server Actions

- Use Zod for runtime schema validation on both client and server.
- Use next-safe-action for type-safe server actions.
- Validate all form inputs before submission.
- Return structured error objects from server actions.

## Error Handling

- Use error boundaries (error.tsx) for unexpected errors.
- Implement guard clauses and early returns.
- Model expected errors as return values, not exceptions.
- Provide user-friendly error messages with actionable guidance.

## Firebase Integration

- Use Firestore for document-based data storage.
- Use Firebase Auth with Next.js middleware for session management.
- Use Firebase Storage for file uploads.
- Run heavy computations in Firebase Functions, not in API routes.

## App Router Conventions

- Use the App Router directory structure (app/ directory).
- Implement loading.tsx for streaming and suspense boundaries.
- Use layout.tsx for shared layouts across routes.
- Define metadata in page.tsx or layout.tsx for SEO.

## Performance and Web Vitals

- Optimize for Core Web Vitals: LCP, CLS, and FID.
- Use next/image for automatic image optimization.
- Implement code splitting with dynamic imports.
- Minimize client-side JavaScript bundle size.

## File Naming Conventions

- Use lowercase-dash-case for directories (e.g., user-profile/).
- Configuration files: \`*.config.ts\`
- Test files: \`*.test.ts\` or \`*.test.tsx\`
- Type definition files: \`*.types.ts\`
- Server actions: \`actions.ts\` inside route directories.

## Project Structure

\`\`\`
app/
  (routes)/     # Route groups
  api/          # API routes
  layout.tsx    # Root layout
  page.tsx      # Home page
components/
  ui/           # Shadcn UI components
  shared/       # Shared components
lib/
  actions/      # Server actions
  utils/        # Utility functions
  validators/   # Zod schemas
\`\`\`

## Testing

- Write unit tests with Vitest or Jest.
- Use Testing Library for component tests.
- Test server actions independently.
- Write end-to-end tests with Playwright for critical flows.
`;
}
