import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { detectSocialPlatform, formatPlatformLabel } from '../../utils/detectSocialPlatform';
import { iconMap } from '../../utils/iconMap';
import { useCms } from '../../hooks/useCms';
import { Mail, Phone, MapPin, Send, Sparkles, MessageCircle, CheckCircle2, Github } from 'lucide-react';
import { useDocumentHead } from '../../hooks/useDocumentHead';

export function ContactPage() {
  const { data } = useCms();
  const location = useLocation();
  const contact = data.singletons.contact ?? {};
  const contactInfo = contact.contactInfo ?? {};
  const socialLinks = Array.isArray(contact.socialLinks) ? contact.socialLinks : [];

  useDocumentHead({
    title: 'Contact Jessica Latoria Davis — Get in Touch',
    description: 'Contact Jessica Latoria Davis for full stack development projects, cloud infrastructure consulting, DevOps automation, mobile app development, or collaboration opportunities.',
    path: '/contact',
  });

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.hash !== '#contact-form') return;
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.hash]);

  const handleChange = (key: keyof typeof formValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formValues.name.trim()) nextErrors.name = 'Name is required.';
    if (!formValues.email.trim()) nextErrors.email = 'Email is required.';
    if (!formValues.subject.trim()) nextErrors.subject = 'Subject is required.';
    if (!formValues.message.trim()) nextErrors.message = 'Message is required.';
    if (formValues.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      nextErrors.email = 'Enter a valid email.';
    }
    return nextErrors;
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-full opacity-10 blur-3xl animate-morph floating" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-full opacity-10 blur-3xl animate-morph floating-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-full opacity-5 blur-3xl animate-pulse-glow" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B1320]/60 border border-white/10 mb-6 animate-slide-in-left hover:scale-105 transition-transform">
          <MessageCircle className="w-4 h-4 text-[#06B6D4] animate-bounce-subtle" />
          <span className="text-sm font-medium text-[#06B6D4]">Get in Touch</span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in text-white">
          Let's <span className="gradient-text text-shimmer hover:animate-wiggle inline-block">Connect</span>
        </h1>
        <p className="text-lg text-[#C9D1D9] max-w-2xl mx-auto animate-slide-up">
          {contact.pageIntroText || "Have a question or want to work together? I'd love to hear from you."}
        </p>
      </section>

      {/* Main Content */}
      <section className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          {/* Contact Details Card */}
          <div className="group relative animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#06B6D4] to-[#0891B2] rounded-2xl blur-sm opacity-[0.06] group-hover:blur-md group-hover:opacity-[0.14] transition-all duration-600 ease-out" />
            <div className="relative bg-[#0B1320]/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-[#06B6D4]/[0.05] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-600 ease-out card-animated">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/15 group-hover:bg-[#06B6D4]/15 group-hover:border-[#06B6D4]/25 transition-all duration-500 ease-out">
                  <Sparkles className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <h2 className="text-lg font-bold text-white group-hover:text-[#06B6D4] transition-colors">Contact Info</h2>
              </div>

              <div className="space-y-4">
                {contactInfo.email && (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#0B1320]/50 hover:-translate-x-1 transition-all duration-300 group/item"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#06B6D4]/20 text-[#06B6D4] group-hover/item:bg-[#06B6D4]/30 group-hover/item:scale-110 transition-all">
                      <Mail className="w-5 h-5 group-hover/item:animate-wiggle" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider">Email</p>
                      <p className="text-sm font-medium text-[#C9D1D9]">{contactInfo.email}</p>
                    </div>
                  </a>
                )}

                {contactInfo.phone && (
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#0B1320]/50 hover:-translate-x-1 transition-all duration-300 group/item"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#06B6D4]/20 text-[#06B6D4] group-hover/item:bg-[#06B6D4]/30 group-hover/item:scale-110 transition-all">
                      <Phone className="w-5 h-5 group-hover/item:animate-wiggle" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-medium text-[#C9D1D9]">{contactInfo.phone}</p>
                    </div>
                  </a>
                )}

                {contactInfo.location && (
                  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#0B1320]/50 transition-colors group/item">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#06B6D4]/20 text-[#06B6D4] group-hover/item:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 group-hover/item:animate-bounce-subtle" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider">Location</p>
                      <p className="text-sm font-medium text-[#C9D1D9]">{contactInfo.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="group relative animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#06B6D4] to-[#0891B2] rounded-2xl blur-sm opacity-[0.06] group-hover:blur-md group-hover:opacity-[0.14] transition-all duration-600 ease-out" />
            <div className="relative bg-[#0B1320]/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-[#06B6D4]/[0.05] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-600 ease-out card-animated">
              <h2 className="text-lg font-bold text-white mb-4 group-hover:text-[#06B6D4] transition-colors">Follow Me</h2>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/JESSICADAVIS0920"
                  target="_blank"
                  rel="noreferrer"
                  className="group p-3 rounded-xl bg-[#0B1320]/60 border border-white/10 hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <Github className="w-6 h-6 text-white/60 group-hover:text-[#06B6D4] transition-colors" />
                </a>
                <a
                  href="https://www.linkedin.com/in/jessica-davis-126a65295"
                  target="_blank"
                  rel="noreferrer"
                  className="group p-3 rounded-xl bg-[#0B1320]/60 border border-white/10 hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <svg className="w-6 h-6 text-white/60 group-hover:text-[#06B6D4] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="mailto:snowlee922@gmail.com"
                  className="group p-3 rounded-xl bg-[#0B1320]/60 border border-white/10 hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <Mail className="w-6 h-6 text-white/60 group-hover:text-[#06B6D4] transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="group relative animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#06B6D4] via-[#0891B2] to-[#06B6D4] rounded-3xl blur-sm opacity-[0.06] group-hover:blur-md group-hover:opacity-[0.14] transition-all duration-600 ease-out" />
          <div className="relative bg-[#0B1320]/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-600 ease-out card-animated">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/15 group-hover:bg-[#06B6D4]/15 group-hover:border-[#06B6D4]/25 transition-all duration-500 ease-out">
                <Send className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-[#06B6D4] transition-colors">Send a Message</h2>
            </div>

            <form
              id="contact-form"
              className="space-y-5"
              onSubmit={async (event) => {
                event.preventDefault();
                const nextErrors = validate();
                setErrors(nextErrors);
                if (Object.keys(nextErrors).length > 0) return;
                setIsSubmitting(true);
                setSuccess(null);
                try {
                  // TODO: Configure Vercel serverless function or API route for contact form submission
                  // For now, simulate successful submission
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  
                  setFormValues({ name: '', email: '', subject: '', message: '' });
                  setErrors({});
                  setSuccess('Message sent successfully!');
                } catch (error) {
                  console.error('Failed to send message:', error);
                  setErrors({ submit: error instanceof Error ? error.message : 'Failed to send message. Please try again.' });
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="animate-fade-in" style={{ animationDelay: '350ms' }}>
                  <label className="block text-sm font-medium text-[#C9D1D9] mb-1.5">Name</label>
                  <input
                    className={`w-full rounded-xl border ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-400/30' : 'border-white/10 focus:border-[#06B6D4] focus:ring-[#06B6D4]/30'} bg-[#0B1320]/50 text-white placeholder-white/60 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 hover:border-[#06B6D4]/50 hover:shadow-sm`}
                    placeholder="John Doe"
                    value={formValues.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-400 animate-slide-up">{errors.name}</p>}
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <label className="block text-sm font-medium text-[#C9D1D9] mb-1.5">Email</label>
                  <input
                    className={`w-full rounded-xl border ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-400/30' : 'border-white/10 focus:border-[#06B6D4] focus:ring-[#06B6D4]/30'} bg-[#0B1320]/50 text-white placeholder-white/60 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 hover:border-[#06B6D4]/50 hover:shadow-sm`}
                    placeholder="john@example.com"
                    type="email"
                    value={formValues.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400 animate-slide-up">{errors.email}</p>}
                </div>
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '450ms' }}>
                <label className="block text-sm font-medium text-[#C9D1D9] mb-1.5">Subject</label>
                <input
                  className={`w-full rounded-xl border ${errors.subject ? 'border-red-400 focus:border-red-500 focus:ring-red-400/30' : 'border-white/10 focus:border-[#06B6D4] focus:ring-[#06B6D4]/30'} bg-[#0B1320]/50 text-white placeholder-white/60 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 hover:border-[#06B6D4]/50 hover:shadow-sm`}
                  placeholder="Project Inquiry"
                  value={formValues.subject}
                  onChange={(event) => handleChange('subject', event.target.value)}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-400 animate-slide-up">{errors.subject}</p>}
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                <label className="block text-sm font-medium text-[#C9D1D9] mb-1.5">Message</label>
                <textarea
                  className={`w-full rounded-xl border ${errors.message ? 'border-red-400 focus:border-red-500 focus:ring-red-400/30' : 'border-white/10 focus:border-[#06B6D4] focus:ring-[#06B6D4]/30'} bg-[#0B1320]/50 text-white placeholder-white/60 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 resize-none hover:border-[#06B6D4]/50 hover:shadow-sm`}
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={formValues.message}
                  onChange={(event) => handleChange('message', event.target.value)}
                />
                {errors.message && <p className="mt-1 text-sm text-red-400 animate-slide-up">{errors.message}</p>}
              </div>

              <div className="flex flex-col gap-3 pt-2 animate-fade-in" style={{ animationDelay: '550ms' }}>
                {errors.submit && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 animate-slide-up">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{errors.submit}</span>
                  </div>
                )}

                {success && (
                  <div className="flex items-center gap-2 text-[#06B6D4] animate-slide-in-left">
                    <CheckCircle2 className="w-5 h-5 animate-bounce-subtle" />
                    <span className="font-medium">{success}</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
