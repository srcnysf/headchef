export function getFlutterRules(): string {
  return `# Flutter Rules

## Architecture

- Use Dart as the primary language with strict type safety.
- Follow clean architecture with clear separation of concerns.
- Use the repository pattern to abstract data access logic.
- Use the ViewModel pattern to manage UI state and business logic.
- Organize code into layers: presentation, domain, and data.

## State Management

- Use BLoC, Cubit, or Stacked for state management.
- Keep state classes immutable using Freezed.
- Separate UI state from business logic.
- Avoid managing state directly in Widget build methods.

## Data Models

- Use Freezed for data models and UI states.
- Define union types for representing different states (loading, success, error).
- Implement fromJson and toJson with json_serializable or Freezed.
- Keep models immutable with final fields.

## Dependency Injection

- Use GetIt as the service locator for dependency injection.
- Register dependencies at app startup.
- Use interfaces (abstract classes) for service contracts.
- Avoid tight coupling between layers.

## Widget Guidelines

- Optimize Widget tree depth; avoid deeply nested Widget trees.
- Use const constructors wherever possible to reduce rebuilds.
- Extract reusable Widgets into separate files.
- Prefer StatelessWidget when no mutable state is needed.
- Dispose controllers, streams, and animation controllers properly.

## Firebase Integration

- Run AI operations on Firebase Functions, not on the client.
- Use Firestore as the primary data store.
- Track credits and usage quotas in Firestore documents.
- Use Firebase Auth for authentication flows.
- Handle offline scenarios with Firestore caching.

## File Naming Conventions

- Views: \`*_view.dart\`
- ViewModels: \`*_view_model.dart\`
- Models: \`*_model.dart\`
- Services: \`*_service.dart\`
- Repositories: \`*_repository.dart\`
- Widgets: \`*_widget.dart\`
- Utils: \`*_util.dart\`

## Project Structure

\`\`\`
lib/
  app/          # App configuration, routing, themes
  common/       # Shared utilities, constants, extensions
  core/         # Domain logic, models, services, repositories
  ui/           # Views, ViewModels, Widgets organized by feature
\`\`\`

## Testing

- Write unit tests for ViewModels and services.
- Write Widget tests for UI components.
- Use integration tests for critical user flows.
- Mock dependencies with Mockito or Mocktail.

## Performance

- Use const constructors to minimize unnecessary rebuilds.
- Avoid calling setState in build methods.
- Profile with Flutter DevTools before optimizing.
- Optimize images for different screen densities.
- Use ListView.builder for long lists.
`;
}
