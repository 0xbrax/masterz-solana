import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const loadFileJSON = (path) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, path);
    const data = JSON.parse(readFileSync(filePath, 'utf8'));

    return data;
};