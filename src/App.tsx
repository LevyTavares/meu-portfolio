import './App.css'
import { SkillCard } from './components/SkillCard/SkillCard'
import { ProjectCard } from './components/ProjectCard/ProjectCard'

function App() {
  return (
    <>
      {/* CABEÇALHO */}
      <header style={{ borderBottom: '1px solid var(--border-color)', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: 'var(--text-main)' }}>Meu<span style={{ color: 'var(--primary-color)' }}>Portfólio</span></h2>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#habilidades" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 'bold' }}>Habilidades</a>
            <a href="#projetos" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 'bold' }}>Projetos</a>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="container">
        
        {/* Seção Hero (Apresentação) */}
        <section style={{ textAlign: 'center', padding: '6rem 0' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Olá, eu sou o <br/><span style={{ color: 'var(--primary-color)' }}>Levy Tavares</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Desenvolvedor Frontend focado em criar interfaces rápidas, acessíveis e responsivas utilizando React, TypeScript e o ecossistema moderno da web.
          </p>
        </section>

        {/* Seção de Habilidades */}
        <section id="habilidades">
          <h2 className="section-title">Minhas Habilidades</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <SkillCard name="React" level="Intermediário" />
            <SkillCard name="TypeScript" level="Iniciante" />
            <SkillCard name="CSS / HTML" level="Avançado" />
            <SkillCard name="Linux & Git" level="Intermediário" />
          </div>
        </section>

        {/* Seção de Projetos */}
        <section id="projetos">
          <h2 className="section-title">Meus Projetos</h2>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            
            {/* Projeto 1 */}
            <ProjectCard 
              title="HollowTrip" 
              description="Uma aplicação desenvolvida com foco em interface, rotas e uma ótima experiência para o usuário."
              tags={['React', 'TypeScript', 'CSS']}
              link="https://github.com/LevyTavares/HollowTrip"
            />

            {/* Projeto 2 */}
            <ProjectCard 
              title="Testify App" 
              description="Um projeto focado em resolver problemas práticos e aplicar conceitos essenciais de desenvolvimento frontend."
              tags={['React', 'JavaScript', 'HTML']}
              link="https://github.com/LevyTavares/testify_app"
            />

            {/* Projeto 3 */}
            <ProjectCard 
              title="Feliz Aniversário" 
              description="Uma página web interativa e criativa desenvolvida especialmente para celebrar uma data especial."
              tags={['HTML', 'CSS', 'JavaScript']}
              link="https://github.com/LevyTavares/feliz-anivers-rio"
            />

          </div>
        </section>

      </main>

      {/* RODAPÉ E CONTATO */}
      <footer style={{ backgroundColor: 'var(--card-bg)', padding: '3rem 0', marginTop: '4rem', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>Vamos trabalhar juntos?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Estou sempre aberto a novas oportunidades e desafios.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <a href="https://github.com/LevyTavares" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>GitHub</a>
            <a href="https://linkedin.com/in/seu-usuario" target="_blank" rel="noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>LinkedIn</a>
            <a href="mailto:isaiaslevi2@gmail.com" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>E-mail</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App