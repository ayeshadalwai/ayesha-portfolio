import { useEffect, useMemo, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { profile, brand, socials } from './data/profile'
import { projects, type Project, type ProjectCategory } from './data/projects'
import { experience } from './data/experience'

const nav = [
  ['01', 'HOME', 'home'], ['02', 'ABOUT', 'about'], ['03', 'WORK', 'work'],
  ['04', 'EXPERIENCE', 'experience'], ['05', 'CONTACT', 'contact'],
] as const
const filters: ('ALL' | ProjectCategory)[] = ['ALL', 'TECH', 'PRODUCT + DESIGN', 'COMMUNITY', 'RESEARCH']

function Arrow() { return <span aria-hidden="true" className="arrow">↗</span> }
function SectionTitle({ number, label, title, children }: { number: string; label: string; title: string; children?: ReactNode }) {
  return <div className="section-title"><span>{number} / {label}</span><h2>{title}</h2>{children}</div>
}
function ProjectArt({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false)
  return <div className={`project-art art-${project.id}`}>
    {project.image && !failed && <img src={project.image} alt="" loading="lazy" onError={() => setFailed(true)} />}
    <span className="art-word">{project.title.split(' ')[0]}</span><i /><b />
  </div>
}
function ProjectCard({ project }: { project: Project }) {
  const destination = project.caseStudyUrl || project.liveUrl || project.githubUrl
  const Card = <article className="project-card"><ProjectArt project={project} /><div className="project-info"><div><p className="project-category">{project.category} {project.status ? <em>/ {project.status}</em> : ''}</p><h3>{project.title}</h3><p>{project.shortDescription}</p></div><div className="project-bottom"><div className="tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><Arrow /></div></div></article>
  return destination ? <a className="project-link" href={destination} target="_blank" rel="noreferrer" aria-label={`View ${project.title}`}>{Card}</a> : Card
}
function Hero() {
  const [videoFailed, setVideoFailed] = useState(false)
  return <section id="home" className="hero">
    <div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> {profile.location} / {profile.role}</p><p className="hello">Hi, I’m</p><h1>Ayesha<span className="blush">.</span><span className="cursor">|</span></h1><p className="hero-role">Software Engineer</p><p className="intro">{profile.intro}</p><div className="hero-actions"><a className="button primary" href="#work">View my work <Arrow /></a><a className="button secondary" href={`mailto:${profile.email}`}>Get in touch</a></div></div>
    <div className="hero-scene" aria-label="Botanical hero media" role="img">{videoFailed ? <img className="hero-media" src="/media/hero-poster.webp" alt="" onError={(event) => { event.currentTarget.style.display = 'none' }} /> : <video className="hero-media" autoPlay muted loop playsInline poster="/media/hero-poster.webp" onError={() => setVideoFailed(true)}><source src="/media/hero.mp4" type="video/mp4" /></video>}<div className="scene-caption">A quiet place for<br />ambitious ideas.</div></div>
  </section>
}
function App() {
  const [active, setActive] = useState('home'); const [filter, setFilter] = useState<'ALL' | ProjectCategory>('ALL'); const [menuOpen, setMenuOpen] = useState(false); const [pointer, setPointer] = useState({ x: 55, y: 18 })
  useEffect(() => { const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-40% 0px -55% 0px' }); nav.forEach(([, , id]) => { const element = document.getElementById(id); if (element) observer.observe(element) }); return () => observer.disconnect() }, [])
  useEffect(() => { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } }), { threshold: 0.12 }); document.querySelectorAll('.reveal').forEach(section => observer.observe(section)); return () => observer.disconnect() }, [])
  const visibleProjects = useMemo(() => filter === 'ALL' ? projects : projects.filter(p => p.category === filter || p.secondaryCategories?.includes(filter)), [filter])
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => { if (event.pointerType === 'touch') return; setPointer({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 }) }
  return <div className="site-shell" onPointerMove={onPointerMove} style={{ '--torch-x': `${pointer.x}%`, '--torch-y': `${pointer.y}%` } as CSSProperties}>
    <aside className="side-nav"><a href="#home" className="brand-mark" aria-label="Ayesha, home">{brand.mark}</a><nav aria-label="Section navigation">{nav.map(([number, label, id]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}><small>{number}</small>{label}</a>)}</nav><p className="nav-foot">{profile.availability}<br /><span>●</span> 2026</p></aside>
    <header className="mobile-head"><a href="#home" className="brand-mark">{brand.mark}</a><button onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">Index <span>/{menuOpen ? '×' : '+'}</span></button>{menuOpen && <nav>{nav.map(([, label, id]) => <a href={`#${id}`} onClick={() => setMenuOpen(false)} key={id}>{label}</a>)}</nav>}</header>
    <main><Hero />
      <section id="about" className="section about reveal"><SectionTitle number="02" label="ABOUT" title="Engineering with a human point of view." /><div className="about-body"><p className="large-copy">{profile.about}</p><div className="fact-grid"><InfoBlock label="Focus" items={profile.focus} /><InfoBlock label="Currently" items={profile.currently} /></div></div></section>
      <section id="work" className="section work reveal"><SectionTitle number="03" label="SELECTED WORK" title="A growing collection of things I’ve helped make." ><p className="section-note">A curated view of recent work across engineering, product, and community.</p></SectionTitle><div className="featured-grid">{projects.filter(p => p.featured).map(project => <ProjectCard key={project.id} project={project} />)}</div><div className="all-work"><div className="all-work-top"><div><p className="eyebrow">Archive / all work</p><h3>Explore by practice</h3></div><div className="filters" aria-label="Filter projects">{filters.map(item => <button className={filter === item ? 'chosen' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div><div className="archive-list">{visibleProjects.map((project, index) => <ArchiveRow key={project.id} project={project} number={index + 1} />)}</div></div></section>
      <section id="experience" className="section split-section reveal"><div><SectionTitle number="04" label="EXPERIENCE" title="Building the next chapter." /><p className="section-note">Experience will be added here as it becomes ready to share.</p></div><div className="quiet-panel">{experience.length ? experience.map(item => <article key={`${item.role}-${item.organization}`}><p>{item.date}</p><h3>{item.role}</h3><p>{item.organization}</p></article>) : <><span className="line-art">↳</span><p>Available for a role where strong engineering, thoughtful collaboration, and curiosity are valued.</p><a href={`mailto:${profile.email}`}>Start a conversation <Arrow /></a></>}</div></section>
      <section id="contact" className="contact reveal"><p className="eyebrow">05 / CONTACT</p><h2>Let’s make something<br /><em>considered.</em></h2><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <Arrow /></a><div className="socials">{socials.map(s => <a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label} <span>↗</span></a>)}</div></section>
    </main><footer><span>{brand.mark} © 2026</span><span>Built with care / <a href="#home">back to top ↑</a></span></footer>
  </div>
}
function InfoBlock({ label, items }: { label: string; items: string[] }) { return <div className="info-block"><p>{label} /</p>{items.map(item => <span key={item}>{item}</span>)}</div> }
function ArchiveRow({ project, number }: { project: Project; number: number }) { const destination = project.caseStudyUrl || project.liveUrl || project.githubUrl; const row = <><span className="archive-number">{String(number).padStart(2, '0')}</span><div><h3>{project.title}</h3><p>{project.shortDescription}</p></div><span className="archive-meta">{project.category} / {project.year || 'In progress'}</span><Arrow /></>; return destination ? <a className="archive-row" href={destination} target="_blank" rel="noreferrer">{row}</a> : <div className="archive-row">{row}</div> }
export default App
