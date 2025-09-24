import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join(process.cwd(), 'content/projects'));

    const paths = files.map(filename => ({
        slug: filename.replace('mdx', ''),
    }));

    return paths;
}

function getProjectData(slug) {
    const filePath = path.join(process.cwd(), 'content/projects', `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const { data, content } = matter(fileContent);

    return { frontmatter: data, content };
}

export default async function ProjectPage({ params }) {
    const { slug } = params;
    const { frontmatter, content } = getProjectData(slug);

    return (
        <article className="prose lg:prose-xl mx-auto p-8">
            <h1>{frontmatter.title}</h1>
            <hr />

            <MDXRemote source={content} />
        </article>
    )
}