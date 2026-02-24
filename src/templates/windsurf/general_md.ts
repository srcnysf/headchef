import { Framework } from '../../types.js';
import { getBaseRules } from '../shared/base_rules.js';
import { getFlutterRules } from '../shared/flutter_rules.js';
import { getNextjsRules } from '../shared/nextjs_rules.js';
import { getReactRules } from '../shared/react_rules.js';
import { getPythonRules } from '../shared/python_rules.js';

const FRAMEWORK_NAMES: Record<Exclude<Framework, 'general'>, string> = {
  flutter: 'Flutter',
  nextjs: 'Next.js',
  react: 'React',
  python: 'Python',
} as const;

const FRAMEWORK_RULE_GETTERS: Record<Exclude<Framework, 'general'>, () => string> = {
  flutter: getFlutterRules,
  nextjs: getNextjsRules,
  react: getReactRules,
  python: getPythonRules,
} as const;

export function generateWindsurfGeneralMd(): string {
  const baseRules = getBaseRules();
  return `# Coding Standards

${baseRules}
`;
}

export function generateWindsurfFrameworkMd(framework: Framework): string | null {
  if (framework === 'general') {
    return null;
  }
  const name = FRAMEWORK_NAMES[framework];
  const getRules = FRAMEWORK_RULE_GETTERS[framework];
  const rules = getRules();
  return `# ${name} Conventions

${rules}
`;
}
