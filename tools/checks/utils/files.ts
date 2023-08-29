import * as fs from 'fs';
import globPkg from 'glob';
const { glob } = globPkg;
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Locale } from './utils.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const repositoryRoot = path.join(__dirname, '/../../../');

export enum FileExtension {
  JSON = '.json',
  MARKDOWN = '.md',
  YAML = '.yaml',
}

/**
 * Returns a filter function that checks if a given file name ends with one of
 * the given extensions.
 *
 * @param extensions - Array of file extensions to filter by.
 * @returns A filter function that returns true if the file name ends with any
 * of the given extensions.
 */
export const filterByExtensions = (extensions: FileExtension[]) => {
  return (fileName: string) =>
    extensions.some((extension) => fileName.endsWith(extension));
};

export const getAllContentFileNamesWithExtension = ({
  locale,
  fileExtension,
}: {
  locale: Locale;
  fileExtension: FileExtension;
}): string[] => {
  const contentPath = path.join(
    repositoryRoot,
    'content/',
    locale,
    `/**/*${fileExtension}`
  );
  const fileNames = glob.sync(contentPath);
  return fileNames;
};

export const getFilePathFromRepoRoot = (
  fileName: string,
  rootPath: string
): string => {
  if (fileName.includes(rootPath)) {
    return fileName.split(rootPath)[1];
  }
  return fileName;
};

/**
 * Wrapper around `fs.readFileSync`
 * @param filePath
 * @returns string utf-8 encoded
 */
export const readFileSync = (filePath: string) => {
  return fs.readFileSync(filePath, 'utf-8');
};

/**
 * Utility function to ensure directory existence
 * If it doesn't exist, create it and its parents recursively
 * @param dirPath
 */
const ensureDirExistsSync = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

export const getOutputDirectory = (): string => {
  return path.join(repositoryRoot, 'tools/output');
};

/**
 * Writes a deduplicated and sorted list of strings and numbers to a file.
 *
 * @param outputFileName - Name of the output file.
 * @param list - Array of strings to write out
 * @param encoding - Character encoding for the file write operation. Default is 'utf-8'.
 *
 * The function ensures the target directory exists before attempting to write the file.
 * If the list is empty, it doesn't write.
 */
export const writeListToFile = (
  outputFileName: string,
  list: (string | number)[],
  encoding: BufferEncoding = 'utf-8'
) => {
  const outputDir = getOutputDirectory();
  ensureDirExistsSync(outputDir);

  const outputFile = path.join(outputDir, outputFileName);
  if (list.length > 0) {
    fs.writeFileSync(outputFile, list.join('\n'), encoding);
  }
};
