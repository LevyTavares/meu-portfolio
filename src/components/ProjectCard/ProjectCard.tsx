import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  imageUrl?: string;
}

export function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.stoneTablet}>
        <div className={styles.stoneGlow}></div>
        <h3 className={styles.stoneTitle}>{title}</h3>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.button}>
          Ver no GitHub ➔
        </a>
      </div>
    </div>
  );
}