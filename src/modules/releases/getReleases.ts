import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { ReleaseInfo } from './releaseInfo';

const postsDirectory = path.join(process.cwd(), 'src', 'data', 'releases');

export function getReleases(): Omit<ReleaseInfo, 'content'>[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory).filter((x) => x.endsWith('.md'));
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const data = { title: '', date: '' };
    data.title = matterResult.data['title'];
    data.date = matterResult.data['date'];

    // Combine the data with the id
    return {
      id,
      ...data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllReleaseIDs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getReleaseData(id: string): ReleaseInfo {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const content = matterResult.content;
  const data = { title: '', date: '' };
  data.title = matterResult.data['title'];
  data.date = matterResult.data['date'];

  // Combine the data with the id
  return {
    id,
    content,
    ...data,
  };
}
