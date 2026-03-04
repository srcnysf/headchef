import { spawn } from 'child_process';

export function openInIde(ideCmd: string, projectPath: string): void {
  const child = spawn(ideCmd, [projectPath], {
    detached: true,
    stdio: 'ignore',
  });
  child.unref();
}
