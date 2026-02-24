export function generateCodingStyleRules(): string {
  return `# Coding Style

## Naming Conventions

- Use PascalCase for classes.
- Use camelCase for variables, functions, and methods.
- Use underscores_case for file and directory names.
- Use UPPERCASE for environment variables and constants.
- Start each function with a verb.
- Use verbs for boolean variables: isLoading, hasError, canDelete.
- Use complete words instead of abbreviations.

## Function Guidelines

- Write short functions with a single purpose (less than 20 instructions).
- Name functions with a verb and something else.
- Avoid nesting blocks with early checks and returns.
- Use higher-order functions (map, filter, reduce) to avoid nesting.
- Use default parameter values instead of null checks.
- Reduce function parameters using RO-RO (Receive an Object, Return an Object).
- Use a single level of abstraction per function.
`;
}
