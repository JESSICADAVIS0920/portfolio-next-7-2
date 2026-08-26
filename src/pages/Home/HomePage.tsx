import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Download, ExternalLink, Github, Quote, ChevronRight, Sparkles, Zap, Code2, Rocket, Mail, MessageCircle } from 'lucide-react';
import { useCms } from '../../hooks/useCms';
import { useDocumentHead } from '../../hooks/useDocumentHead';
import { ResumeViewerModal } from '../../components/common/ResumeViewerModal';
import { CertificateModal } from '../../components/common/CertificateModal';

const TechToolIcon = ({ tool }: { tool: { name: string; logoUrl: string } }) => {
  const [imgError, setImgError] = useState(false);
  const showImage = tool.logoUrl && !imgError;

  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-xl bg-[#0B1320]/50 border border-white/10 flex items-center justify-center">
        {!showImage && <Code2 className="w-5 h-5 text-white/60" />}
      </div>
      {showImage && (
        <img
          className="absolute inset-0 w-10 h-10 rounded-xl object-contain p-1 bg-[#0B1320] border border-white/10 group-hover/item:border-[#06B6D4]/50 transition-colors"
          src={tool.logoUrl}
          alt={tool.name}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}
      {!showImage && (
        <div className="absolute inset-0 rounded-xl bg-[#0B1320]/50 border border-white/10 flex items-center justify-center">
          <Code2 className="w-5 h-5 text-white/60" />
        </div>
      )}
    </div>
  );
};

export function HomePage() {
  const { data } = useCms();
  const location = useLocation();
  const published = <T extends { status?: string; orderIndex?: number }>(items: T[]) =>
    items
      .filter((item) => item.status === 'published')
      .slice()
      .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
  const hero = data.singletons.hero ?? {};
  const services = published(data.collections.services ?? []);
  const projects = published(data.collections.projects ?? []);
  const featuredProjects = projects.filter((project) => project.featured);
  const blogs = published(data.collections.blogs ?? []);
  const testimonials = published(data.collections.testimonials ?? []);
  const about = data.singletons.about ?? {};
  const education = published(data.collections.education ?? []);
  const resumes = data.collections.resumes ?? [];
  const resumeSettings = data.singletons.resumeSettings ?? {};
  const activeResume =
    resumes.find((item) => item.id === resumeSettings.activeResumeId && item.status === 'active') ??
    resumes.find((item) => item.status === 'active');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<{ imageUrl: string; title: string } | null>(null);
  const techStackCategories = published(data.collections.techStackCategories ?? []);

  // Intersection Observer for scroll animations
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [
    services.length,
    projects.length,
    blogs.length,
    testimonials.length
  ]);

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };

  const sectionClass = (id: string) =>
    `transition-all duration-1000 ${visibleSections.has(id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`;

  // Handle hash navigation - scroll to section after component mounts
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      // Wait for sections to be rendered, then scroll
      const scrollWithDelay = (delay: number) => {
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            const headerOffset = 140;
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, delay);
      };
      // Try multiple delays to ensure DOM is ready
      scrollWithDelay(100);
      scrollWithDelay(300);
      scrollWithDelay(500);
    }
  }, [location.hash]);

  // SEO
  const fullName = hero.fullName ?? about.fullName ?? 'Cheng Ai Jin';
  const headline = hero.subheadline ?? 'Full-stack engineer focused on scalable web platforms.';
  useDocumentHead({
    title: `${fullName} — Full-Stack Developer & Portfolio`,
    description: `${fullName} — ${headline} Explore projects, services, blog, and publications.`,
    path: '/',
  });

  return (
    <div className="space-y-32">
      {/* ═══════════════════════════════════════════════════════════════════════════
          HERO SECTION - Premium Cinematic Landing
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        ref={setSectionRef('hero')}
        className={`relative min-h-[85vh] flex items-center ${sectionClass('hero')}`}
      >
        {/* Radial Glow Behind Hero */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_60%)]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.1),transparent_60%)]" />

          {/* Floating Orbs with slow animation */}
          <div className="absolute top-20 left-[10%] w-4 h-4 rounded-full bg-[#06B6D4]/40 animate-float-slow" />
          <div className="absolute top-40 right-[15%] w-6 h-6 rounded-full bg-[#0891B2]/30 animate-float-medium" />
          <div className="absolute bottom-32 left-[20%] w-3 h-3 rounded-full bg-[#06B6D4]/50 animate-float-fast" />
          <div className="absolute top-1/3 right-[25%] w-5 h-5 rounded-full bg-[#22D3EE]/25 animate-float-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 right-[10%] w-4 h-4 rounded-full bg-[#06B6D4]/35 animate-float-medium" style={{ animationDelay: '1s' }} />
          <div className="absolute top-[60%] left-[5%] w-3 h-3 rounded-full bg-[#0891B2]/40 animate-float-fast" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          {/* Content */}
          <div className="space-y-8 lg:pr-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] animate-slide-up text-white">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-[#06B6D4] via-[#22D3EE] to-[#0891B2] bg-[length:200%_auto] bg-clip-text text-transparent inline pb-2 animate-gradient-x whitespace-nowrap">
                {hero.fullName ?? about.fullName ?? 'Full Name'}
              </span>
            </h1>

            <p className="text-xl text-[#C9D1D9] max-w-xl leading-relaxed animate-slide-up delay-200 hover:text-white transition-colors">
              {hero.subheadline ?? 'Full-stack engineer focused on scalable web platforms.'}
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up delay-300">
              <Link
                to={hero.ctaPrimaryHref ?? '/portfolio'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#06B6D4] text-[#0B1320] font-semibold shadow-lg shadow-[#06B6D4]/20 hover:shadow-xl hover:shadow-[#06B6D4]/30 hover:-translate-y-1 transition-all duration-300 group"
              >
                {hero.ctaPrimaryLabel ?? 'View Portfolio'}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 pt-8 border-t border-white/10 animate-slide-up delay-500">
              <a
                href="https://github.com/JESSICADAVIS0920"
                target="_blank"
                rel="noreferrer"
                className="group p-3 rounded-xl bg-[#0b132000] border border-white/10 hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/10 transition-all duration-300 hover:-translate-y-1"
              >
                <Github className="w-6 h-6 text-white/60 group-hover:text-[#06B6D4] transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/jessica-davis-a60b7042b/"
                target="_blank"
                rel="noreferrer"
                className="group p-3 rounded-xl bg-[#0b132000] border border-white/10 hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/10 transition-all duration-300 hover:-translate-y-1"
              >
                <svg className="w-6 h-6 text-white/60 group-hover:text-[#06B6D4] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:snowlee922@gmail.com"
                className="group p-3 rounded-xl bg-[#0b132000] border border-white/10 hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/10 transition-all duration-300 hover:-translate-y-1"
              >
                <Mail className="w-6 h-6 text-white/60 group-hover:text-[#06B6D4] transition-colors" />
              </a>
            </div>
          </div>

          {/* Profile Image / Visual */}
          <div className="relative hidden lg:flex justify-center items-center lg:pl-8">
            {/* Background glow with entrance animation */}
            <div className="absolute w-80 h-80 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-full opacity-20 blur-3xl animate-hero-glow-entrance" />

            <div className="relative animate-hero-entrance">
              {hero.heroImageUrl ? (
                <div className="relative group">
                  {/* Spinning gradient border - outer ring */}
                  <div className="absolute -inset-3 rounded-3xl overflow-hidden">
                    <div
                      className="absolute inset-0 animate-spin-border"
                      style={{ background: 'conic-gradient(from 0deg, #06B6D4, #0891B2, #22D3EE, #06B6D4, #0891B2, #06B6D4)' }}
                    />
                  </div>
                  {/* Inner mask to create border effect */}
                  <div className="absolute -inset-1 bg-[#0B1320] rounded-3xl" />

                  {/* Secondary spinning glow (reverse direction) */}
                  <div className="absolute -inset-4 rounded-3xl overflow-hidden opacity-40 group-hover:opacity-70 transition-opacity">
                    <div className="absolute inset-0 blur-xl animate-reverse-spin"
                      style={{ background: 'conic-gradient(from 180deg, #06B6D4, transparent, #0891B2, transparent, #06B6D4)' }} />
                  </div>

                  {/* Gradient glow pulse */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-[#06B6D4] to-[#0891B2] rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse" />

                  <img
                    className="relative w-80 h-80 rounded-3xl object-cover border-4 border-white/10 shadow-2xl shadow-[#06B6D4]/20 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-[#06B6D4]/50"
                    src={hero.heroImageUrl}
                    alt="Profile"
                  />
                </div>
              ) : (
                <div className="relative group">
                  {/* Spinning gradient border for placeholder */}
                  <div className="absolute -inset-3 rounded-3xl overflow-hidden">
                    <div
                      className="absolute inset-0 animate-spin-border"
                      style={{ background: 'conic-gradient(from 0deg, #06B6D4, #0891B2, #22D3EE, #06B6D4, #0891B2, #06B6D4)' }}
                    />
                  </div>
                  <div className="absolute -inset-1 bg-[#0B1320] rounded-3xl" />

                  <div className="relative w-80 h-80 rounded-3xl bg-gradient-to-br from-[#1a1f35] to-[#0B1320] border-4 border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/10 to-transparent" />
                    <span className="text-7xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#0891B2] bg-clip-text text-transparent">
                      {(hero.fullName ?? about.fullName ?? 'U').split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                </div>
              )}

              {/* Floating Elements with Sparkle Animations */}
              <div className="absolute -top-6 -right-6 p-4 bg-[#0B1320]/80 backdrop-blur-sm border border-[#06B6D4]/30 rounded-2xl shadow-xl shadow-[#06B6D4]/20 animate-sparkle-entrance-1 animate-sparkle-1 hover:scale-110 hover:border-[#06B6D4]/60 transition-all cursor-pointer">
                <Zap className="w-8 h-8 text-[#06B6D4] drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
              </div>
              <div className="absolute -bottom-6 -left-6 p-4 bg-[#0B1320]/80 backdrop-blur-sm border border-[#06B6D4]/30 rounded-2xl shadow-xl shadow-[#06B6D4]/20 animate-sparkle-entrance-2 animate-sparkle-2 hover:scale-110 hover:border-[#06B6D4]/60 transition-all cursor-pointer">
                <Rocket className="w-8 h-8 text-[#06B6D4] drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
              </div>
              <div className="absolute top-1/2 -right-12 p-3 bg-[#0B1320]/80 backdrop-blur-sm border border-[#0891B2]/30 rounded-xl shadow-lg shadow-[#0891B2]/20 animate-sparkle-entrance-3 animate-sparkle-3 hover:scale-110 transition-all cursor-pointer">
                <Sparkles className="w-6 h-6 text-[#0891B2] drop-shadow-[0_0_8px_rgba(8,145,178,0.5)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          ABOUT SECTION - Ink Purple Theme
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section
        id="about-section"
        ref={setSectionRef('about-section')}
        className={sectionClass('about-section')}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            About <span className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto animate-fade-in">Passionate about creating impactful digital experiences</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start max-w-6xl mx-auto">
          <div className="relative group">
            {about.profileImageUrl ? (
              <>
                {/* Animated gradient border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#06B6D4] via-[#22D3EE] to-[#0891B2] rounded-3xl opacity-60 blur-sm group-hover:opacity-100 transition-opacity animate-gradient-border" />
                <div className="absolute -inset-4 bg-gradient-to-r from-[#06B6D4] to-[#0891B2] rounded-3xl blur opacity-25 group-hover:opacity-40 transition-all duration-500" />
                <img
                  className="relative w-full aspect-square rounded-3xl object-cover shadow-2xl shadow-[#06B6D4]/20 border-2 border-white/10 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-[#06B6D4]/50"
                  src={about.profileImageUrl}
                  alt="Profile"
                />
              </>
            ) : (
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#06B6D4] via-[#22D3EE] to-[#0891B2] rounded-3xl opacity-40 blur-sm animate-gradient-border" />
                <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-br from-[#1a1f35] to-[#0B1320] border-2 border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/10 to-transparent" />
                  <span className="text-8xl font-bold bg-gradient-to-r from-[#06B6D4] to-[#0891B2] bg-clip-text text-transparent">
                    {(about.fullName ?? hero.fullName ?? 'U').split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <p className="text-lg text-[#C9D1D9] leading-relaxed hover:text-white transition-colors duration-300">
              {about.bio && about.bio.length > 200
                ? `${about.bio.slice(0, 200).trim()}...`
                : about.bio}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {about.currentRole && (
                <div className="p-4 rounded-2xl bg-[#0b132000] border border-white/10 hover:border-[#06B6D4]/50 transition-all">
                  <div className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-1">Current Role</div>
                  <div className="font-medium text-white">{about.currentRole}</div>
                </div>
              )}
              {about.researchInterest && (
                <div className="p-4 rounded-2xl bg-[#0b132000] border border-white/10 hover:border-[#06B6D4]/50 transition-all">
                  <div className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-1">Research Interest</div>
                  <div className="font-medium text-white">{about.researchInterest}</div>
                </div>
              )}
            </div>

            {education.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#0b132000] border border-white/10 hover:border-[#06B6D4]/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#0891B2] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-white">Education</div>
                </div>
                <div className="text-[#C9D1D9]">
                  {education[0].degree}{education[0].field ? ` in ${education[0].field}` : ''}
                </div>
                <div className="text-sm text-white/60">
                  {education[0].institution} • {education[0].endDate ? new Date(education[0].endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
                </div>
                {education[0].grade && (
                  <div className="text-sm text-white/60 mt-1">
                    <span className="text-[#06B6D4]">Grade:</span> {education[0].grade}
                  </div>
                )}
              </div>
            )}

            {/* See More Link */}
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 mt-4 rounded-xl bg-[#06B6D4] text-[#0B1320] font-semibold shadow-lg shadow-[#06B6D4]/30 hover:shadow-xl hover:shadow-[#06B6D4]/50 hover:-translate-y-1 transition-all duration-300 group"
            >
              <span>Learn More About Me</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          TECH STACK SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      {techStackCategories.length > 0 && (
        <section
          id="skills"
          ref={setSectionRef('skills')}
          className={sectionClass('skills')}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Tech Stack & <span className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] bg-clip-text text-transparent">Tools</span>
            </h2>
            <p className="text-[#C9D1D9] max-w-2xl mx-auto">Technologies I work with to bring ideas to life</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {techStackCategories.map((category, catIndex) => (
              <div
                key={category.id}
                className="group p-6 rounded-3xl bg-[#0b132000] border border-white/10 hover:border-[#06B6D4]/30 transition-all"
                style={{ animationDelay: `${catIndex * 100}ms` }}
              >
                <h3 className="text-lg font-semibold text-white mb-6 pb-4 border-b border-white/10">
                  {category.categoryName}
                </h3>
                <div className="space-y-4">
                  {(category.tools ?? []).map((tool: { id: string; name: string; logoUrl: string; proficiencyLevel: number }) => (
                    <div key={tool.id} className="flex items-center gap-4 group/item">
                      <TechToolIcon tool={tool} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-[#C9D1D9]">{tool.name}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-[#0B1320]/50 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#06B6D4] to-[#0891B2] transition-all duration-1000 ease-out progress-bar"
                            style={{ width: `${tool.proficiencyLevel}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════
          MY PORTFOLIO SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      {projects.length > 0 && (
        <section
          id="projects-section"
          ref={setSectionRef('projects-section')}
          className={sectionClass('projects-section')}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              My <span className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] bg-clip-text text-transparent">Portfolio</span>
            </h2>
            <p className="text-[#C9D1D9] max-w-2xl mx-auto">Explore my projects and work</p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
            {projects.slice(0, 3).map((project) => (
              <article
                key={project.id}
                className="group rounded-3xl bg-[#0b132000] border border-white/10 hover:border-[#06B6D4]/30 transition-all"
              >
                {project.coverImageUrl && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={project.coverImageUrl}
                      alt={project.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-[#0B1320] text-sm font-medium hover:bg-white transition-colors"
                        >
                          <Github className="w-4 h-4" /> Code
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#06B6D4] text-white text-sm font-medium hover:bg-[#0891B2] transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#06B6D4] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#C9D1D9] line-clamp-2">{project.summary}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#06B6D4] text-[#0B1320] font-semibold rounded-xl shadow-lg shadow-[#06B6D4]/20 hover:shadow-xl hover:shadow-[#06B6D4]/30 hover:-translate-y-1 transition-all duration-300"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════
          BLOG SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      {blogs.length > 0 && (
        <section
          id="blog-section"
          ref={setSectionRef('blog-section')}
          className={sectionClass('blog-section')}
        >
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-white">
                Latest <span className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] bg-clip-text text-transparent">Blog Posts</span>
              </h2>
              <p className="text-[#C9D1D9]">Thoughts, tutorials, and insights</p>
            </div>
            <Link to="/blog" className="hidden sm:flex items-center gap-2 text-[#06B6D4] font-medium hover:gap-3 transition-all">
              Read More <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogs.slice(0, 3).map((post) => (
              <article
                key={post.id}
                className="group p-6 rounded-3xl bg-[#0B1320]/80 backdrop-blur-sm border border-white/[0.06] shadow-lg shadow-[#06B6D4]/[0.05] hover:shadow-xl hover:shadow-[#06B6D4]/[0.12] hover:border-white/[0.12] transition-all duration-600 ease-out hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#06B6D4]/10 border border-[#06B6D4]/15 flex items-center justify-center mb-5 group-hover:bg-[#06B6D4]/15 group-hover:border-[#06B6D4]/25 transition-all duration-500 ease-out">
                  <Quote className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#06B6D4] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#C9D1D9] text-sm line-clamp-3">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 mt-4 text-[#06B6D4] text-sm font-medium group-hover:gap-2 transition-all">
                  Read more <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}




      <CertificateModal
        isOpen={!!selectedCertificate}
        imageUrl={selectedCertificate?.imageUrl}
        title={selectedCertificate?.title}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}
