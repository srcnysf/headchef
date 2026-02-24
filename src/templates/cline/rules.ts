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

export function generateClinerules(framework: Framework): string {
  const baseRules = getBaseRules();
  const frameworkRules = getFrameworkRules(framework);
  return `${baseRules}
${frameworkRules}`;
}

export function generateRooGeneralRules(): string {
  const baseRules = getBaseRules();
  return `${baseRules}
`;
}

export function generateRooFrameworkRules(framework: Framework): string | null {
  if (framework === 'general') {
    return null;
  }
  const getRules = FRAMEWORK_RULE_GETTERS[framework];
  const rules = getRules();
  return `${rules}
`;
}
