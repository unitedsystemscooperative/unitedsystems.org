import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const dataDirectory = path.join(process.cwd(), 'src', 'data');

export const getMarkdownString = (filePath: string) => {
  const mdRegex = /\.md$/;
  const fullPath = path.join(
    dataDirectory,
    filePath.match(mdRegex) ? filePath : `${filePath}.md`
  );
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  const content = matterResult.content;

  return content;
};
