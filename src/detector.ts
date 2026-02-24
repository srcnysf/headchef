import fs from 'fs-extra';
import path from 'path';

export async function detectExistingFiles(targetDir: string, filePaths: readonly string[]): Promise<string[]> {
  const existing: string[] = [];
  for (const filePath of filePaths) {
    const fullPath = path.join(targetDir, filePath);
    if (await fs.pathExists(fullPath)) {
      existing.push(filePath);
    }
  }
  return existing;
}
