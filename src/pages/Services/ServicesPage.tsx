import { Sparkles, Zap, ArrowRight, Inbox } from 'lucide-react';
import { useCms } from '../../hooks/useCms';
import { useDocumentHead } from '../../hooks/useDocumentHead';

export function ServicesPage() {
  const { data } = useCms();
  const services = (data.collections.services ?? [])
    .filter((item) => item.status === 'published')
    .slice()
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  useDocumentHead({
    title: 'Web Development Services — Jessica Latoria Davis',
    description: 'Professional web development services by Jessica Latoria Davis — full-stack development, mobile apps, cloud infrastructure, DevOps, API development, and custom software solutions.',
    path: '/services',
  });

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-full opacity-10 blur-3xl animate-morph floating" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-full opacity-10 blur-3xl animate-morph floating-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-full opacity-5 blur-3xl animate-pulse-glow" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b132000]/60 border border-white/10 mb-6 animate-slide-in-left hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 text-[#06B6D4] animate-spin-slow" />
          <span className="text-sm font-medium text-[#06B6D4]">What I Offer</span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in text-white">
          My <span className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] bg-clip-text text-transparent text-shimmer hover:animate-wiggle inline-block">Services</span>
        </h1>
        <p className="text-lg text-[#C9D1D9] max-w-2xl mx-auto animate-slide-up">
          Professional services tailored to bring your ideas to life with cutting-edge solutions and expert craftsmanship.
        </p>
      </section>

      {/* Services Grid */}
      {services.length > 0 && (
        <section className="overflow-visible">
          <div className="grid gap-8 md:grid-cols-2" style={{ position: 'relative' }}>
            {services.map((service, index) => (
              <article
                key={service.id}
                className="relative animate-fade-in h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full bg-[#0b132000]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/[0.06] flex flex-col overflow-visible">
                  {/* Icon */}
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#06B6D4]/10 border border-[#06B6D4]/15 mb-6">
                    <Zap className="w-7 h-7 text-[#06B6D4]" />
                  </div>

                  {/* Content */}
                  <h2 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h2>
                  <p className="text-[#C9D1D9] leading-relaxed mb-6 flex-1">
                    {service.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Services Empty State */}
      {services.length === 0 && (
        <section className="animate-fade-in">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-[#06B6D4]/10 flex items-center justify-center mb-6">
              <Inbox className="w-10 h-10 text-[#06B6D4]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Services Yet</h3>
            <p className="text-[#C9D1D9] max-w-md">
              Services will appear here once they are added and published through the admin panel.
            </p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {services.length > 0 && (
        <section className="relative animate-fade-in overflow-hidden">
          {/* Dark glass background with subtle border */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b132000] via-[#0b132000]/95 to-[#0b132000] rounded-3xl" />
          <div className="absolute inset-0 border border-white/10 rounded-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] rounded-3xl opacity-50" />

          {/* Subtle purple glow accents */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#0891B2]/10 rounded-full blur-3xl" />

          <div className="relative px-8 py-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 animate-slide-up">
              Ready to Start Your Project?
            </h2>
            <p className="text-[#C9D1D9] text-lg max-w-2xl mx-auto animate-fade-in">
              Let's work together to create something amazing. Get in touch and let's discuss your ideas.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
