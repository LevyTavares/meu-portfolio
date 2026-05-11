import { useState, useRef, useEffect } from 'react';
import './App.css';
import profileImage from '/profile-fnuf.svg';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaGraduationCap, FaVolumeUp, FaVolumeMute, FaGitAlt, FaHtml5, FaCss3Alt, FaCheckCircle } from 'react-icons/fa';
import { SiReact, SiTypescript, SiJavascript, SiSass, SiCssmodules } from 'react-icons/si';
import { HiOutlineUsers, HiOutlineChatAlt2, HiOutlineClipboardList, HiOutlineUserGroup, HiOutlineLightningBolt } from 'react-icons/hi';

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Inicialização das partículas com função inicializadora (a forma correta)
  const [particles] = useState(() => {
    return [...Array(25)].map(() => ({
      left: Math.random() * 100,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 8,
    }));
  });

  // Listener para a barra de progresso de leitura
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver para scroll reveal
  useEffect(() => {
    if (!hasEntered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe todos os elementos com classe 'reveal'
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => revealElements.forEach(el => observer.unobserve(el));
  }, [hasEntered]);

  const handleEnter = () => {
    setHasEntered(true);
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(e => console.log("Áudio bloqueado", e));
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(e => console.log("Áudio bloqueado", e));
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className={`app-wrapper ${hasEntered ? 'scrolling-active' : ''}`}>
      {/* Barra de Progresso de Leitura */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      
      {/* Botão de Mute */}
      {hasEntered && (
        <button className="mute-button" onClick={toggleMute} aria-label="Mutar/Desmutar música">
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      )}
      
      <audio ref={audioRef} loop>
        <source src="/theme.mp3" type="audio/mpeg" />
      </audio>

      {!hasEntered && (
        <div className="enter-screen" onClick={handleEnter}>
          <div className="enter-text">Sincronizar Interface</div>
        </div>
      )}

      {/* Camada de Partículas */}
      <div className="particles-layer">
        {particles.map((p, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{ 
              left: `${p.left}%`, 
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`
            }} 
          />
        ))}
      </div>

      <div className="vignette" />

      <div className="content-layout">
        {/* HERO SECTION - Layout Horizontal estilo LinkedIn */}
        <header className="hero-section-linkedin reveal" id="hero-profile">
          <div className="hero-left">
            <div className="profile-image-container">
              <img src={profileImage} alt="FNUF - Isaías Levi" className="profile-hero-image" />
            </div>
          </div>
          <div className="hero-right">
            <h1>Isaías Levi</h1>
            <p className="hero-subtitle">Estudante de Sistemas de Informação</p>
            <p className="hero-focus">Focado em Frontend Development (React • TypeScript)</p>
            <p className="hero-quote">"Focando a alma na criação de interfaces puras."</p>
            <div className="hero-socials">
              <a href="https://github.com/LevyTavares" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/isa%C3%ADas-levi-tavares-da-silva-38414b195/" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="mailto:isaiaslevi2@gmail.com" className="social-icon" title="Email">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </header>

        {/* LAYOUT 2 COLUNAS */}
        <div className="main-layout">
          {/* COLUNA PRINCIPAL (70%) */}
          <main className="main-column">
            {/* SEÇÃO SOBRE */}
            <section className="about-section reveal">
              <h2>Sobre Mim</h2>
              <p>
                Sou um estudante apaixonado por Frontend Development. Especialista em transformar 
                designs complexos em código React performático, limpo e responsivo. 
                Meu foco é dominar cada pixel da interface para criar experiências imersivas
                que combinem estética visual com funcionalidade técnica impecável.
              </p>
            </section>

            {/* SEÇÃO TECNOLOGIAS EXPANDIDA */}
            <section className="tech-skills-section reveal">
              <h2>Tecnologias & Ferramentas</h2>
              <div className="tech-grid">
                <div className="tech-card">
                  <div className="tech-icon">
                    <SiReact />
                  </div>
                  <div className="tech-info">
                    <h4>React</h4>
                    <p>Library moderna para UI componentizada</p>
                  </div>
                </div>

                <div className="tech-card">
                  <div className="tech-icon">
                    <SiTypescript />
                  </div>
                  <div className="tech-info">
                    <h4>TypeScript</h4>
                    <p>Type-safe JavaScript em larga escala</p>
                  </div>
                </div>

                <div className="tech-card">
                  <div className="tech-icon">
                    <SiJavascript />
                  </div>
                  <div className="tech-info">
                    <h4>JavaScript ES6+</h4>
                    <p>Linguagem core com sintaxe moderna</p>
                  </div>
                </div>

                <div className="tech-card">
                  <div className="tech-icon">
                    <FaHtml5 />
                  </div>
                  <div className="tech-info">
                    <h4>HTML5</h4>
                    <p>Estrutura semântica e acessível</p>
                  </div>
                </div>

                <div className="tech-card">
                  <div className="tech-icon">
                    <FaCss3Alt />
                  </div>
                  <div className="tech-info">
                    <h4>CSS3</h4>
                    <p>Estilização avançada e responsive</p>
                  </div>
                </div>

                <div className="tech-card">
                  <div className="tech-icon">
                    <SiSass />
                  </div>
                  <div className="tech-info">
                    <h4>SASS/SCSS</h4>
                    <p>CSS preprocessado com superpotências</p>
                  </div>
                </div>

                <div className="tech-card">
                  <div className="tech-icon">
                    <FaGitAlt />
                  </div>
                  <div className="tech-info">
                    <h4>Git/GitHub</h4>
                    <p>Controle de versão e colaboração</p>
                  </div>
                </div>

                <div className="tech-card">
                  <div className="tech-icon">
                    <FaGithub />
                  </div>
                  <div className="tech-info">
                    <h4>DevTools</h4>
                    <p>Vite, npm, ESLint, TypeScript</p>
                  </div>
                </div>

                <div className="tech-card">
                  <div className="tech-icon">
                    <SiCssmodules />
                  </div>
                  <div className="tech-info">
                    <h4>CSS Modules</h4>
                    <p>Estilização modular e segura para componentes</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO HABILIDADES INTERPESSOAIS */}
            <section className="soft-skills-section reveal">
              <h2>Habilidades Interpessoais</h2>
              <div className="skills-grid">
                <div className="skill-item">
                  <div className="skill-icon">
                    <HiOutlineUsers />
                  </div>
                  <h4>Empatia</h4>
                  <p>Compreender necessidades do usuário e equipe</p>
                </div>

                <div className="skill-item">
                  <div className="skill-icon">
                    <HiOutlineChatAlt2 />
                  </div>
                  <h4>Comunicação</h4>
                  <p>Expressar ideias de forma clara e objetiva</p>
                </div>

                <div className="skill-item">
                  <div className="skill-icon">
                    <HiOutlineClipboardList />
                  </div>
                  <h4>Organização</h4>
                  <p>Planejamento exemplar e gestão de tarefas</p>
                </div>

                <div className="skill-item">
                  <div className="skill-icon">
                    <HiOutlineUserGroup />
                  </div>
                  <h4>Trabalho em Equipe</h4>
                  <p>Colaboração efetiva com diferentes grupos</p>
                </div>

                <div className="skill-item">
                  <div className="skill-icon">
                    <HiOutlineLightningBolt />
                  </div>
                  <h4>Proatividade</h4>
                  <p>Iniciativa na solução de problemas</p>
                </div>
              </div>
            </section>
            <section className="projects-section reveal">
              <h2>Projetos em Desenvolvimento</h2>
              <div className="projects-list">
                <a href="https://github.com/LevyTavares/hollowtrip" target="_blank" rel="noopener noreferrer" className="project-item">
                  <div className="project-header">
                    <h3>HollowTrip</h3>
                    <span className="tech-tag">React Native • Expo</span>
                  </div>
                  <p>App interativo em React Native que explora três locais icônicos do Hollow Knight. Combina UI dark temática, animações suaves, trilha sonora imersiva e navegação responsiva entre atrações com componentes reutilizáveis.</p>
                  <span className="project-link">Ver Projeto →</span>
                </a>
                <a href="https://github.com/LevyTavares/testify_app" target="_blank" rel="noopener noreferrer" className="project-item">
                  <div className="project-header">
                    <h3>Testify App</h3>
                    <span className="tech-tag">React Native • TypeScript</span>
                  </div>
                  <p>Aplicativo mobile/web com Expo Router para gerenciamento de templates de correção. Inclui captura de imagens via câmera, geração de relatórios, persistência local via SQLite e integração com backend FastAPI para compartilhamento de gabaritos.</p>
                  <span className="project-link">Ver Projeto →</span>
                </a>
                <a href="https://github.com/LevyTavares" target="_blank" rel="noopener noreferrer" className="project-item">
                  <div className="project-header">
                    <h3>Projetos em Progresso</h3>
                    <span className="tech-tag">Full Stack • Inovação</span>
                  </div>
                  <p>Explorando novas tecnologias e arquiteturas. Desenvolvendo componentes reutilizáveis, APIs robustas e experiências frontend inovadoras. Focado em performance, escalabilidade e design system consistente com estética Hollow Knight.</p>
                  <span className="project-link">Ver Mais →</span>
                </a>
              </div>
            </section>

            {/* SEÇÃO CTA */}
            <section className="cta-section reveal">
              <div className="cta-content">
                <h2>Vamos Criar Algo Incrível Juntos?</h2>
                <p>Tenho interesse em posições Frontend, projetos interessantes ou colaborações.</p>
                <div className="cta-links">
                  <a href="mailto:isaiaslevi2@gmail.com" className="cta-button cta-email">
                    <FaEnvelope /> Email
                  </a>
                  <a href="https://github.com/LevyTavares" target="_blank" rel="noopener noreferrer" className="cta-button cta-github">
                    <FaGithub /> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/isa%C3%ADas-levi-tavares-da-silva-38414b195/" target="_blank" rel="noopener noreferrer" className="cta-button cta-linkedin">
                    <FaLinkedin /> LinkedIn
                  </a>
                </div>
              </div>
            </section>
          </main>

          {/* SIDEBAR DIREITA (30%) */}
          <aside className="sidebar">
            {/* Card Marca FNUF */}
            <div className="sidebar-card fnuf-brand reveal">
              <div className="fnuf-logo">FNUF</div>
              <p className="fnuf-tagline">Frontend Developer • UI/UX Enthusiast</p>
            </div>

            {/* Card Disponibilidade */}
            <div className="sidebar-card availability-card reveal">
              <div className="availability-header">
                <FaCheckCircle className="availability-icon" />
              </div>
              <h3>Disponível</h3>
              <div className="availability-badge">
                Aberto para Oportunidades
              </div>
              <p className="availability-desc">Consultoria, Projetos Freelance ou Posição CLT em Frontend</p>
            </div>

            {/* Card Educação */}
            <div className="sidebar-card reveal">
              <h3><FaGraduationCap /> Educação</h3>
              <div className="card-content">
                <p className="institution">UNINASSAU</p>
                <p className="course">Sistemas de Informação</p>
              </div>
            </div>

            {/* Card Localização */}
            <div className="sidebar-card reveal">
              <h3><FaMapMarkerAlt /> Localização</h3>
              <div className="card-content">
                <p>Barbalha, Ceará</p>
              </div>
            </div>

            {/* Card Links Rápidos */}
            <div className="sidebar-card reveal">
              <h3>Links</h3>
              <div className="quick-links">
                <a href="https://github.com/LevyTavares" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <FaGithub /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/isa%C3%ADas-levi-tavares-da-silva-38414b195/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <FaLinkedin /> LinkedIn
                </a>
                <a href="mailto:isaiaslevi2@gmail.com" title="Email">
                  <FaEnvelope /> Email
                </a>
              </div>
            </div>
          </aside>
        </div>
        
        <footer>
          <p>DESENVOLVIDO POR FNUF | SI • UNINASSAU • 2026</p>
        </footer>
      </div>
    </div>
  );
}

export default App;