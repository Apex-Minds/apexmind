import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiAward, FiZap } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import { INNOVATION_PROJECTS, STARTUP_STATS } from '../data/innovation';

export default function InnovationLabPage() {
  return (
    <>
      <PageHero
        kicker="Innovation Lab"
        title="Where Ideas Become Reality"
        subtitle="Our Innovation Lab is the heartbeat of ApexMinds - where student projects evolve into startups, patents, and technological breakthroughs."
      />

      <section className="py-16 bg-[#0f766e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STARTUP_STATS.map((stat) => (
              <div key={stat.label} className="text-center rounded-[1.6rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                <div className="font-display text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm uppercase tracking-[0.18em] text-white/75">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#f6f2ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Student Projects"
            title="Built by Students, Impacting the World"
            subtitle="Explore groundbreaking projects and startups emerging from our Innovation Lab."
            tone="light"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INNOVATION_PROJECTS.map((project) => (
              <article
                key={project.id}
                className="group p-6 rounded-[1.8rem] bg-white border border-slate-200 hover:border-[#0f766e]/30 transition-all duration-300 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#0f766e]">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-[#f4a62a]/15 text-[#d48f1a]">
                    <FiAward size={12} />
                    {project.status}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-xl text-slate-900 mb-2 group-hover:text-[#0f766e] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3">by {project.team}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-md bg-slate-50 text-slate-600 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                kicker="Lab Facilities"
                title="World-Class Resources"
                subtitle="Everything you need to prototype, test, and launch your next big idea."
                align="left"
                tone="light"
              />
              <ul className="space-y-4">
                {[
                  '3D printing and rapid prototyping lab',
                  'Robotics workshop with industrial equipment',
                  'AI compute cluster for model training',
                  'Cybersecurity sandbox environment',
                  'Co-working spaces for startup teams',
                  'Mentorship from industry experts',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <FiZap className="w-5 h-5 text-[#f4a62a] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-video rounded-[1.8rem] bg-gradient-to-br from-[#0f766e]/15 to-[#f4a62a]/10 border border-slate-200 flex items-center justify-center shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
              <div className="text-center p-8">
                <span className="text-6xl">🔬</span>
                <p className="mt-4 font-display text-xl text-slate-900">Innovation Lab</p>
                <p className="text-sm text-slate-600 mt-2">Open 24/7 for enrolled students</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#13253f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Have an Idea? Build It Here.
          </h2>
          <p className="text-slate-200/80 max-w-xl mx-auto mb-8">
            Enroll at ApexMinds and get access to our Innovation Lab, mentorship, and funding
            opportunities.
          </p>
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-semibold bg-[#f4a62a] text-white shadow-lg shadow-[#f4a62a]/25 hover:-translate-y-0.5 transition-all"
          >
            Join ApexMinds <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
