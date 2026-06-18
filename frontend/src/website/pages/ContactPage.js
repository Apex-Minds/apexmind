import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import PortalButtons from '../components/PortalButtons';
import { submitContact } from '../utils/publicApi';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await submitContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Let's Connect"
        subtitle="Have questions about admissions, programs, or partnerships? We would love to hear from you."
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-apex-cyan/10 flex items-center justify-center text-apex-cyan shrink-0">
                      <FiMapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Address</h3>
                      <p className="text-slate-600 text-sm mt-1">
                        University of Mines and Technology, Tarkwa, Ghana
                        <br />
                        Western Region, Ghana
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-apex-cyan/10 flex items-center justify-center text-apex-cyan shrink-0">
                      <FiPhone size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Phone</h3>
                      <p className="text-slate-600 text-sm mt-1">+233 542432199</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-apex-cyan/10 flex items-center justify-center text-apex-cyan shrink-0">
                      <FiMail size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Email</h3>
                      <p className="text-slate-600 text-sm mt-1">apexmind48@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-apex-card border border-white/5">
                <h3 className="font-display font-semibold text-white mb-2">Portal Access</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Already enrolled? Access your dashboard directly.
                </p>
                <PortalButtons variant="compact" className="flex-col !items-stretch" />
              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl bg-apex-card border border-white/5"
              >
                <h2 className="font-display text-2xl font-bold text-white mb-6">
                  Send a Message
                </h2>

                {success && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-400 text-sm">
                    <FiCheckCircle size={20} />
                    Thank you! We will get back to you within 24-48 hours.
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-apex-dark border border-white/10 text-white placeholder-slate-500 focus:border-apex-cyan focus:ring-1 focus:ring-apex-cyan outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-apex-dark border border-white/10 text-white placeholder-slate-500 focus:border-apex-cyan focus:ring-1 focus:ring-apex-cyan outline-none transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-apex-dark border border-white/10 text-white placeholder-slate-500 focus:border-apex-cyan focus:ring-1 focus:ring-apex-cyan outline-none transition-colors"
                      placeholder="+234 ..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-apex-dark border border-white/10 text-white focus:border-apex-cyan focus:ring-1 focus:ring-apex-cyan outline-none transition-colors"
                    >
                      <option>General Inquiry</option>
                      <option>Admissions</option>
                      <option>Programs</option>
                      <option>Partnerships</option>
                      <option>Media & Press</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-apex-dark border border-white/10 text-white placeholder-slate-500 focus:border-apex-cyan focus:ring-1 focus:ring-apex-cyan outline-none transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-display font-semibold bg-gradient-to-r from-apex-cyan to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <FiSend size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
