export function getPythonRules(): string {
  return `# Python Rules

## Style and Conventions

- Follow PEP 8 style guidelines for all Python code.
- Use type hints everywhere: function parameters, return values, and variables.
- Use descriptive variable and function names following snake_case convention.
- Maximum line length of 88 characters (Black formatter default).
- Use docstrings for all public modules, classes, and functions.

## Data Models

- Use dataclasses for simple data containers.
- Use Pydantic for data models that require validation.
- Keep models immutable where possible (frozen dataclasses or Pydantic with frozen=True).
- Define clear field types and default values.
- Use Enum classes for fixed sets of values.

## Testing

- Use pytest as the test framework.
- Use fixtures for reusable test setup and teardown.
- Use parametrize for testing multiple input-output combinations.
- Follow the Arrange-Act-Assert pattern for test structure.
- Name test files with test_ prefix and test functions with test_ prefix.
- Aim for high coverage on business logic and edge cases.

## FastAPI Patterns

- Use dependency injection with Depends for shared resources.
- Define request and response schemas with Pydantic models.
- Use async/await for I/O-bound operations.
- Organize routes with APIRouter for modularity.
- Return appropriate HTTP status codes.
- Use middleware for cross-cutting concerns (logging, auth, CORS).

## Environment and Dependencies

- Use virtual environments (venv or poetry) for dependency isolation.
- Pin dependencies in requirements.txt or pyproject.toml.
- Separate development dependencies from production dependencies.
- Use .env files with python-dotenv for environment variables.
- Never commit secrets or credentials to version control.

## Logging

- Use the built-in logging module with structured log messages.
- Configure log levels appropriately (DEBUG, INFO, WARNING, ERROR, CRITICAL).
- Include context in log messages (request ID, user ID, operation).
- Avoid using print statements for logging in production code.
- Use JSON-formatted logs for production environments.

## Error Handling

- Define custom exception classes for domain-specific errors.
- Use try-except blocks only for expected failure scenarios.
- Raise exceptions with descriptive messages.
- Implement global exception handlers in FastAPI for consistent error responses.
- Log exceptions with full traceback at the ERROR level.

## Project Structure

\`\`\`
project/
  src/
    api/            # Route handlers and endpoints
    models/         # Pydantic and dataclass models
    services/       # Business logic
    repositories/   # Data access layer
    core/           # Configuration, dependencies, middleware
  tests/
    unit/           # Unit tests
    integration/    # Integration tests
    conftest.py     # Shared fixtures
  pyproject.toml    # Project metadata and dependencies
\`\`\`

## Performance

- Use async functions for I/O-bound tasks.
- Use connection pooling for database access.
- Cache expensive computations with functools.lru_cache or Redis.
- Profile with cProfile or py-spy before optimizing.
- Use generators for processing large datasets.
`;
}
