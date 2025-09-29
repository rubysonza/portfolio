import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getAllProjects() {
  const projectsDirectory = path.join(process.cwd(), 'content/projects');
  const filenames = fs.readdirSync(projectsDirectory);

  const projects = filenames.map((filename) => {
    const slug = filename.replace('.mdx', '');

    const filePath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
    };
  });

  return projects;
}