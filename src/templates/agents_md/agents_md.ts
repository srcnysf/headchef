import { Framework } from '../../types.js';
import { getFlutterRules } from '../shared/flutter_rules.js';
import { getNextjsRules } from '../shared/nextjs_rules.js';
import { getReactRules } from '../shared/react_rules.js';
import { getPythonRules } from '../shared/python_rules.js';

const FRAMEWORK_RULE_GETTERS: Record<Exclude<Framework, 'general'>, () => string> = {
  flutter: getFlutterRules,
  nextjs: getNextjsRules,
  react: getReactRules,
  python: getPythonRules,
} as const;

function getCondensedBaseRules(): string {
  return `### Naming Conventions
- Use PascalCase for classes.
- Use camelCase for variables, functions, and methods.
- Use underscores_case for file and directory names.
- Use UPPERCASE for environment variables.
- Start each function with a verb.
- Use verbs for boolean variables: isLoading, hasError, canDelete.

### Function Guidelines
- Write short functions with a single purpose (less than 20 instructions).
- Avoid nesting blocks with early checks and returns.
- Use higher-order functions (map, filter, reduce) to avoid nesting.
- Use default parameter values instead of null checks.
- Reduce function parameters using RO-RO pattern.

### Type Safety
- Always declare the type of each variable and function.
- Avoid using any; create necessary types.
- Prefer immutability: use readonly and as const.

### SOLID Principles
- **S**: Single Responsibility - one reason to change per class/function.
- **O**: Open/Closed - open for extension, closed for modification.
- **L**: Liskov Substitution - subclasses must be substitutable.
- **I**: Interface Segregation - prefer specific interfaces over general ones.
- **D**: Dependency Inversion - depend on abstractions, not concretions.

### Testing
- Follow Arrange-Act-Assert convention.
- Name test variables clearly: inputX, mockX, actualX, expectedX.
- Write unit tests for each public function.
- Use test doubles to simulate dependencies.

### Error Handling
- Use exceptions for unexpected errors.
- Catch exceptions only to fix problems or add context.
- Use global handlers for unhandled exceptions.

### Security
- Never hardcode secrets or API keys.
- Use environment variables for configuration.
- Validate all user input.
- Use HTTPS for all network requests.`;
}

function getCondensedFrameworkRules(framework: Framework): string {
  if (framework === 'general') {
    return '';
  }
  const getRules = FRAMEWORK_RULE_GETTERS[framework];
  return `
## Framework Guidelines

${getRules()}`;
}

export function generateAgentsMd(framework: Framework): string {
  const condensedBase = getCondensedBaseRules();
  const frameworkSection = getCondensedFrameworkRules(framework);
  return `# AGENTS.md

## Build & Test Commands
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm test\` - Run tests
- \`npm run lint\` - Run linter

## Code Style & Conventions

${condensedBase}
${frameworkSection}
## Don'ts
- Do NOT install new packages without asking
- Do NOT modify database migrations directly
- Do NOT commit secrets, API keys, or .env files
- Do NOT skip tests when making changes
`;
}
