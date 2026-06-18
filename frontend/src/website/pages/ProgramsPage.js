import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import { PROGRAMS } from '../data/content';

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        kicker="Programs"
        title="Eight Tracks. Infinite Possibilities."
        subtitle="Choose your path in software development, AI, robotics, cybersecurity, data science, entrepreneurship, leadership, and digital skills."
      />

      <section className="py-16 md:py-24 bg-[#f6f2ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Programs"
            title="Explore the Tracks"
            subtitle="Each program is designed to build practical, job-ready skills."
            tone="light"
          />
          <div className="grid md:grid-cols-2 gap-8">
            {PROGRAMS.map((program) => (
              <article
                key={program.id}
                id={program.id}
                className="group relative p-8 rounded-[1.8rem] bg-white border border-slate-200 hover:border-[#0f766e]/30 transition-all duration-300 scroll-mt-28 shadow-[0_14px_40px_rgba(15,23,42,0.07)]"
              >
                <div
                  className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${program.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`}
                />
                <div className="relative">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl">{program.icon}</span>
                    <div>
                      <h2 className="font-display font-bold text-2xl text-slate-900">
                        {program.title}
                      </h2>
                      <p className="text-[#0f766e] text-sm font-medium mt-1">
                        {program.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">{program.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {program.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-slate-50 text-slate-700 border border-slate-200"
                      >
                        <FiCheck className="text-[#0f766e] w-3 h-3" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#13253f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Get Started"
            title="Not Sure Which Track Is Right for You?"
            subtitle="Our admissions team will help you find the perfect program based on your interests and goals."
          />
          <div className="text-center">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-semibold bg-[#f4a62a] text-white shadow-lg shadow-[#f4a62a]/25 hover:-translate-y-0.5 transition-all"
            >
              Talk to Admissions <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
