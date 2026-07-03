import { useCms } from '../../hooks/useCms';
import { Sparkles, FolderGit2, ExternalLink, Github, Inbox } from 'lucide-react';
import { useDocumentHead } from '../../hooks/useDocumentHead';

export function PortfolioPage() {
  const { data } = useCms();

  useDocumentHead({
    title: 'Portfolio — Projects | Jessica Latoria Davis',
    description: 'Browse the portfolio of Jessica Latoria Davis — featured projects and case studies in full stack development, cloud infrastructure, and mobile applications.',
    path: '/portfolio',
  });

  const projects = (data.collections.projects ?? [])
    .filter((item) => item.status === 'published')
    .slice()
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-full opacity-10 blur-3xl animate-morph floating" />
          <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-full opacity-10 blur-3xl animate-morph floating-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-full opacity-5 blur-3xl animate-pulse-glow" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b132000]/60 border border-white/10 mb-6 animate-slide-in-left hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 text-[#06B6D4] animate-spin-slow" />
          <span className="text-sm font-medium text-[#06B6D4]">My Portfolio</span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in text-white">
          My <span className="gradient-text text-shimmer hover:animate-wiggle inline-block">Portfolio</span>
        </h1>
        <p className="text-lg text-[#C9D1D9] max-w-2xl mx-auto animate-slide-up">
          A curated collection of my projects throughout my career.
        </p>
      </section>


      {/* Projects Section */}
      {projects.length > 0 && (
        <section>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {projects.map((project, index) => (
            <article key={project.id} className="group relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#06B6D4] to-[#0891B2] rounded-3xl blur-sm opacity-[0.06] group-hover:blur-md group-hover:opacity-[0.14] transition-all duration-600 ease-out" />

              <div className="relative h-full bg-[#0b132000]/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg shadow-[#06B6D4]/[0.05] border border-white/[0.06] hover:shadow-xl hover:shadow-[#06B6D4]/[0.12] hover:-translate-y-1 hover:border-white/[0.12] transition-all duration-600 ease-out card-animated">
                {project.coverImageUrl ? (
                  <div className="relative h-52 overflow-hidden img-hover-shine">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-[#0b132000] text-sm font-medium hover:bg-white transition-colors"
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
                ) : (
                  <div className="h-52 bg-gradient-to-br from-[#0b132000]/50 to-[#0b132000]/60 flex items-center justify-center animate-bg-pan">
                    <FolderGit2 className="w-16 h-16 text-[#06B6D4] animate-bounce-subtle" />
                  </div>
                )}

                <div className="p-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b132000]/50 text-[#06B6D4] text-xs font-semibold mb-3 group-hover:bg-[#06B6D4]/20 transition-colors">
                    <Sparkles className="w-3 h-3 group-hover:animate-spin-slow" />
                    Project {String(index + 1).padStart(2, '0')}
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#06B6D4] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-[#C9D1D9] mb-4 line-clamp-2">{project.summary}</p>

                </div>
              </div>
            </article>
          ))}
          </div>
        </section>
      )}

      {/* Projects Empty State */}
      {projects.length === 0 && (
        <section className="animate-fade-in">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-[#06B6D4]/10 flex items-center justify-center mb-6">
              <Inbox className="w-10 h-10 text-[#06B6D4]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
            <p className="text-[#C9D1D9] max-w-md">
              Projects will appear here once they are added and published.
            </p>
          </div>
        </section>
      )}


    </div>
  );
}
