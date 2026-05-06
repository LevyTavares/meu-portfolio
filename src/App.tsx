import { useState, useRef, useEffect } from 'react';
import './App.css';
import profileImage from '/profile.svg';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';
import { SiReact, SiTypescript } from 'react-icons/si';

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
          <span className="mute-icon">{isMuted ? '🔇' : '🔊'}</span>
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

            {/* SEÇÃO PROJETOS */}
            <section className="projects-section reveal">
              <h2>Projetos em Desenvolvimento</h2>
              <div className="projects-list">
                <a href="https://github.com/LevyTavares/hollowtrip" target="_blank" rel="noopener noreferrer" className="project-item">
                  <div className="project-header">
                    <h3>HollowTrip</h3>
                    <span className="tech-tag">React • UX/UI</span>
                  </div>
                  <p>Experiência imersiva focada em transições suaves e gerenciamento de estados complexos.</p>
                  <span className="project-link">Ver Projeto →</span>
                </a>
                <a href="https://github.com/LevyTavares/testify-ui" target="_blank" rel="noopener noreferrer" className="project-item">
                  <div className="project-header">
                    <h3>Testify UI</h3>
                    <span className="tech-tag">TypeScript • Dashboard</span>
                  </div>
                  <p>Dashboard de monitoramento com componentes reutilizáveis e arquitetura escalável.</p>
                  <span className="project-link">Ver Projeto →</span>
                </a>
                <a href="https://github.com/LevyTavares/vazio-framework" target="_blank" rel="noopener noreferrer" className="project-item">
                  <div className="project-header">
                    <h3>Vazio Framework</h3>
                    <span className="tech-tag">React • Biblioteca</span>
                  </div>
                  <p>Biblioteca pessoal de componentes React inspirada na estética de Hallownest.</p>
                  <span className="project-link">Ver Projeto →</span>
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
            {/* Card Skills */}
            <div className="sidebar-card reveal">
              <h3>Tecnologias</h3>
              <div className="skills-icons">
                <div className="skill-icon" title="React">
                  <SiReact />
                  <span>React</span>
                </div>
                <div className="skill-icon" title="TypeScript">
                  <SiTypescript />
                  <span>TypeScript</span>
                </div>
              </div>
              <div className="skills-tags">
                <span className="skill-tag">CSS Modules</span>
                <span className="skill-tag">Vite</span>
              </div>
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
                <a href="https://github.com/LevyTavares" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/isa%C3%ADas-levi-tavares-da-silva-38414b195/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="mailto:isaiaslevi2@gmail.com">Email</a>
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