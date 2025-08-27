import styles from './Projects.module.css';

const projects = [
    {
        number: "1/2",
        title: "Portfolio",
        description: "A comprehensive skincare guide featuring the full routine steps, products catered to your needs, and an actives glossary.",
        imageUrl: ""
    },
    {
        number: "2/2",
        title: "Auralyst",
        description: "A comprehensive skincare guide featuring the full routine steps, products catered to your needs, and an actives glossary.",
        imageUrl: ""
    }
];

export default function Projects() {
    return (
      <section className={styles.projectsContainer}>
        <h2 className={styles.title}>PROJECTS</h2>
        <div className={styles.scrollContainer}>
            {projects.map((project, index) => (
                <div key={index} className={styles.slide}>
                <div className={styles.imageContainer}>
                    {project.imageUrl ? (
                    <img src={project.imageUrl} alt={`${project.title} project screenshot`} className={styles.projectImage} />
                    ) : (
                    <div className={styles.imagePlaceholder}></div>
                    )}
                </div>
                <div className={styles.projectInfo}>
                    <span className={styles.projectNumber}>{project.number}</span>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                </div>
                </div>
            ))}
        </div>
      </section>
    );
  }