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
  return `\n## Framework Guidelines\n\n${getRules()}`;
}

export function generateAgentsMd(framework: Framework): string {
  const baseRules = getBaseRules();
  const frameworkSection = getFrameworkRules(framework);
  return `# AGENTS.md

## Build & Test Commands
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm test\` - Run tests
- \`npm run lint\` - Run linter

${baseRules}
${frameworkSection}`;
}
