import { Framework } from '../../types.js';
import { getBaseRules } from '../shared/base_rules.js';
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

function getFrameworkRules(framework: Framework): string {
  if (framework === 'general') {
    return '';
  }
  const getRules = FRAMEWORK_RULE_GETTERS[framework];
  return `\n${getRules()}`;
}

function getCodingStyleSection(): string {
  return `
## Coding Style

### Naming Conventions

- Use PascalCase for classes.
- Use camelCase for variables, functions, and methods.
- Use underscores_case for file and directory names.
- Use UPPERCASE for environment variables and constants.
- Start each function with a verb.
- Use verbs for boolean variables: isLoading, hasError, canDelete.
- Use complete words instead of abbreviations.

### Function Guidelines

- Write short functions with a single purpose (less than 20 instructions).
- Name functions with a verb and something else.
- Avoid nesting blocks with early checks and returns.
- Use higher-order functions (map, filter, reduce) to avoid nesting.
- Use default parameter values instead of null checks.
- Reduce function parameters using RO-RO (Receive an Object, Return an Object).
- Use a single level of abstraction per function.`;
}

export function generateGeminiMd(framework: Framework): string {
  const baseRules = getBaseRules();
  const codingStyle = getCodingStyleSection();
  const frameworkRules = getFrameworkRules(framework);
  return `# Project Rules

${baseRules}
${codingStyle}
${frameworkRules}`;
}
