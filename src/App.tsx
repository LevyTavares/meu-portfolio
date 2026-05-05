import './App.css'
import { SkillCard } from './components/SkillCard/SkillCard'
import { ProjectCard } from './components/ProjectCard/ProjectCard'
import logoNavbar from './images/logo-navbar.png'
import logoHero from './images/logo-hero.png'

function App() {
  return (
    <>
      {/* CABEÇALHO */}
      <header className="header">
        <div className="container header-content">
          <img src={logoNavbar} alt="fnuf" className="logo-navbar" />
          <nav className="nav">
            <a href="#sobre" className="nav-link">Sobre</a>
            <a href="#habilidades" className="nav-link">Habilidades</a>
            <a href="#projetos" className="nav-link">Projetos</a>
            <a href="#contato" className="nav-link">Contato</a>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="container">
        
        {/* Seção Hero (Apresentação) */}
        <section className="hero">
          <img src={logoHero} alt="fnuf Hero" className="hero-logo" />
          <h1 className="hero-title">Olá, eu sou <br/><span className="hero-highlight">fnuf</span></h1>
          <p className="hero-subtitle">
            Desenvolvedor Frontend focado em criar interfaces rápidas, acessíveis e responsivas utilizando React, TypeScript e o ecossistema moderno da web.
          </p>
        </section>

        {/* Seção Sobre Mim */}
        <section id="sobre" className="about-section">
          <h2 className="section-title">Sobre Mim</h2>
          <div className="about-content">
            <div className="about-image">
              <div className="profile-placeholder">
                <span className="profile-icon">👨‍💻</span>
              </div>
            </div>
            <div className="about-text">
              <p>
                Sou um desenvolvedor frontend apaixonado por criar experiências digitais incríveis. 
                Com expertise em React, TypeScript e CSS moderno, trabalho para transformar ideias 
                em interfaces elegantes e funcionais.
              </p>
              <p>
                Minha jornada no desenvolvimento web começou com o fascínio por interfaces bem desenhadas 
                e código limpo. Hoje, dedico-me a aperfeiçoar cada pixel, cada interação e cada detalhe 
                que faz a diferença.
              </p>
              <p>
                Sempre buscando aprender, testar novas tecnologias e colaborar em projetos desafiadores.
              </p>
            </div>
          </div>
        </section>

        {/* Seção de Habilidades */}
        <section id="habilidades" className="skills-section">
          <h2 className="section-title">Minhas Habilidades</h2>
          <div className="skills-grid">
            <SkillCard name="React" level="Intermediário" />
            <SkillCard name="TypeScript" level="Iniciante" />
            <SkillCard name="CSS / HTML" level="Avançado" />
            <SkillCard name="Linux & Git" level="Intermediário" />
          </div>
        </section>

        {/* Seção de Projetos */}
        <section id="projetos" className="projects-section">
          <h2 className="section-title">Meus Projetos</h2>
          <div className="projects-grid">
            
            {/* Projeto 1 */}
            <ProjectCard 
              title="HollowTrip" 
              description="Uma aplicação desenvolvida com foco em interface, rotas e uma ótima experiência para o usuário."
              tags={['React', 'TypeScript', 'CSS']}
              link="https://github.com/LevyTavares/HollowTrip"
              imageUrl="https://via.placeholder.com/300x180?text=HollowTrip"
            />

            {/* Projeto 2 */}
            <ProjectCard 
              title="Testify App" 
              description="Um projeto focado em resolver problemas práticos e aplicar conceitos essenciais de desenvolvimento frontend."
              tags={['React', 'JavaScript', 'HTML']}
              link="https://github.com/LevyTavares/testify_app"
              imageUrl="https://via.placeholder.com/300x180?text=Testify"
            />

            {/* Projeto 3 */}
            <ProjectCard 
              title="Feliz Aniversário" 
              description="Uma página web interativa e criativa desenvolvida especialmente para celebrar uma data especial."
              tags={['HTML', 'CSS', 'JavaScript']}
              link="https://github.com/LevyTavares/feliz-anivers-rio"
              imageUrl="https://via.placeholder.com/300x180?text=Birthday"
              isLarge={true}
            />

          </div>
        </section>

      </main>

      {/* RODAPÉ E CONTATO */}
      <footer id="contato" className="footer">
        <div className="container footer-content">
          <h2 className="footer-title">Vamos trabalhar juntos?</h2>
          <p className="footer-description">Estou sempre aberto a novas oportunidades e desafios.</p>
          <div className="footer-links">
            <a href="https://github.com/LevyTavares" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
            <a href="https://linkedin.com/in/seu-usuario" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
            <a href="mailto:isaiaslevi2@gmail.com" className="footer-link">E-mail</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App