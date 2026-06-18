import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiFileText, FiUsers } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import { ADMISSION_STEPS } from '../data/content';

const REQUIREMENTS = [
  'Completed secondary education or equivalent',
  'Passion for technology and innovation',
  'Basic computer literacy',
  'Completed application form and aptitude assessment',
  'Successful interview with admissions team',
];

const DATES = [
  { term: 'Fall 2026', deadline: 'August 15, 2026', start: 'September 1, 2026' },
  { term: 'Spring 2027', deadline: 'December 15, 2026', start: 'January 15, 2027' },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        kicker="Admissions"
        title="Begin Your Journey at ApexMinds"
        subtitle="Our selective admissions process identifies motivated learners ready to commit to intensive, hands-on technology education."
      />

      <section className="py-16 md:py-24 bg-[#f6f2ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Process"
            title="How to Apply"
            subtitle="Four simple steps from application to enrollment."
            tone="light"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADMISSION_STEPS.map((step) => (
              <div
                key={step.step}
                className="relative p-6 rounded-[1.8rem] bg-white border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
              >
                <span className="font-display text-4xl font-bold text-[#f4a62a]/30">
                  {step.step}
                </span>
                <h3 className="font-display font-semibold text-lg text-slate-900 mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#13253f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeader
                kicker="Requirements"
                title="What We Look For"
                subtitle="We welcome applicants from all backgrounds who demonstrate curiosity, drive, and a commitment to learning."
                align="left"
              />
              <ul className="space-y-3">
                {REQUIREMENTS.map((req) => (
                  <li key={req} className="flex items-start gap-3 text-slate-200/80">
                    <FiFileText className="w-5 h-5 text-[#f4a62a] shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeader
                kicker="Deadlines"
                title="Important Dates"
                subtitle="Plan your application around these key milestones."
                align="left"
              />
              <div className="space-y-4">
                {DATES.map((date) => (
                  <div
                    key={date.term}
                    className="p-6 rounded-[1.8rem] border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <h3 className="font-display font-semibold text-white flex items-center gap-2">
                      <FiCalendar className="text-[#f4a62a]" />
                      {date.term}
                    </h3>
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400 block">Application Deadline</span>
                        <span className="text-slate-200">{date.deadline}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Classes Begin</span>
                        <span className="text-slate-200">{date.start}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#f6f2ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 md:p-16 text-center shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
            <FiUsers className="w-12 h-12 text-[#0f766e] mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
              Ready to Apply?
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto mb-8">
              Start your application today or schedule a campus visit to experience ApexMinds
              firsthand.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-semibold bg-[#f4a62a] text-white shadow-lg shadow-[#f4a62a]/25 hover:-translate-y-0.5 transition-all"
              >
                Start Application <FiArrowRight />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-semibold border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all"
              >
                Schedule a Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
