import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { projects } from '@/data/projectsPageData';

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join(process.cwd(), 'src', 'content/projects'));
    return files.map(filename => ({
        slug: filename.replace('.mdx', ''),
    }));
}

function getProjectData(slug) {
    // 2. Find the specific project from your imported data
    const project = projects.find((p) => p.slug === slug);

    // Get the MDX content
    const filePath = path.join(process.cwd(), 'src', 'content/projects', `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content, data: frontmatter } = matter(fileContent);

    // 3. Return both the project metadata and the MDX content
    return { project, content, frontmatter };
}

export default async function ProjectPage({ params }) {
    const { slug } = params;
    const { project, content, frontmatter } = getProjectData(slug);

    return (
        <main className="pt-[6rem] md:pt-[8rem]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <header className="text-center mb-12 md:mb-16">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4">{project.title}</h1>
                    <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2">
                        {project.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 text-sm font-medium font-redditMono border-2 border-purple text-purple">
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div className="mx-5 mb-12 md:mb-16">
                    <img
                        src={project.image}
                        alt={`${project.title} project screenshot`}
                        width={1200}
                        height={800}
                        className="rounded-lg border-3 shadow-2xl w-full h-auto"
                    />
                </div>

                <article className="
                    mx-5 md:mx-12 pb-24
                    prose-h4:mt-12
                    prose-p:leading-9 prose-p:indent-7
                ">
                    <MDXRemote source={content} />
                </article>

            </div>
        </main>
    );
}