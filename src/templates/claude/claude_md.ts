import { Framework } from '../../types.js';
import { getBaseRules } from '../shared/base_rules.js';
import { getFlutterRules } from '../shared/flutter_rules.js';
import { getNextjsRules } from '../shared/nextjs_rules.js';
import { getReactRules } from '../shared/react_rules.js';
import { getPythonRules } from '../shared/python_rules.js';

const FRAMEWORK_TECH_STACKS: Record<Framework, string> = {
  general: 'See below',
  flutter: 'Flutter, Dart, Firebase',
  nextjs: 'Next.js, TypeScript, React',
  react: 'React, TypeScript',
  python: 'Python, FastAPI',
} as const;

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

export function generateClaudeMd(framework: Framework): string {
  const techStack = FRAMEWORK_TECH_STACKS[framework];
  const baseRules = getBaseRules();
  const frameworkRules = getFrameworkRules(framework);
  return `# Project

## Tech Stack
${techStack}

## Conventions
${baseRules}
${frameworkRules}
## Commands
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm test\` - Run tests
- \`npm run lint\` - Run linter

## Architecture
This project follows clean architecture principles with clear separation of concerns. Code is organized into layers that enforce dependency rules, ensuring the domain logic remains independent of external frameworks and infrastructure.
`;
}
