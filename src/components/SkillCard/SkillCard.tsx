import styles from './SkillCard.module.css';

// Aqui o TypeScript brilha: definimos exatamente o que esse componente espera receber!
interface SkillCardProps {
  name: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
}

export function SkillCard({ name, level }: SkillCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{name}</h3>
      <span className={styles.badge}>{level}</span>
    </div>
  );
}