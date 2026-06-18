import React from 'react';
import { Link } from 'react-router-dom';
import { FiTarget, FiEye, FiHeart, FiArrowRight } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';

const VALUES = [
  {
    icon: FiTarget,
    title: 'Innovation First',
    description: 'We encourage bold ideas and creative solutions to complex problems.',
  },
  {
    icon: FiEye,
    title: 'Industry Alignment',
    description: 'Our curriculum evolves with technology trends and employer demands.',
  },
  {
    icon: FiHeart,
    title: 'Inclusive Excellence',
    description: 'We believe talent is everywhere - our job is to unlock it for everyone.',
  },
];

const TEAM = [
  { name: 'Dr. Amara Okafor', role: 'Director of Innovation', initials: 'AO' },
  { name: 'James Chen', role: 'Head of Engineering', initials: 'JC' },
  { name: 'Sarah Mensah', role: 'Entrepreneurship Lead', initials: 'SM' },
  { name: 'David Okonkwo', role: 'AI Research Director', initials: 'DO' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Us"
        title="Producing Tomorrow's Technology Leaders"
        subtitle="ApexMinds Academy exists to develop innovators, developers, and digital leaders who will shape the future of technology across Africa and beyond."
      />

      <section className="py-16 md:py-24 bg-[#f6f2ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeader
                kicker="Our Mission"
                title="Transform Education Through Technology"
                subtitle="We are not a traditional school. We are a launchpad for builders, creators, and leaders who use technology to solve real problems."
                align="left"
                tone="light"
              />
              <p className="text-slate-600 leading-relaxed mb-6">
                Founded on the belief that the best learning happens through doing, ApexMinds
                Academy combines rigorous technical training with entrepreneurship, leadership
                development, and hands-on project work. Our students do not just learn to code -
                they learn to think, build, and lead.
              </p>
              <p className="text-slate-600 leading-relaxed">
                From our state-of-the-art Innovation Lab to our network of industry partners,
                every aspect of ApexMinds is designed to prepare students for careers at leading
                tech companies - or to start their own ventures.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[1.8rem] bg-gradient-to-br from-[#0f766e]/20 to-[#f4a62a]/15 border border-slate-200 flex items-center justify-center shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
                <div className="text-center p-8">
                  <div className="font-display text-6xl font-bold bg-gradient-to-r from-[#0f766e] to-[#14b8a6] bg-clip-text text-transparent">
                    2020
                  </div>
                  <p className="mt-2 text-slate-600">Year Founded</p>
                  <div className="mt-8 grid grid-cols-2 gap-4 text-left">
                    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                      <div className="text-2xl font-display font-bold text-slate-900">8</div>
                      <div className="text-xs text-slate-500 uppercase">Programs</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                      <div className="text-2xl font-display font-bold text-slate-900">40+</div>
                      <div className="text-xs text-slate-500 uppercase">Faculty</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#0f766e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Our Values"
            title="What Drives Us Forward"
            subtitle="These principles guide everything we do - from curriculum design to student support."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="p-8 rounded-[1.8rem] border border-white/10 bg-white/10 backdrop-blur-sm text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#f4a62a] flex items-center justify-center text-[#13253f] mb-6 shadow-lg shadow-black/10">
                  <value.icon size={28} />
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Leadership"
            title="Meet Our Team"
            subtitle="Industry veterans and educators united by a passion for developing the next generation."
            tone="light"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-[1.8rem] bg-white border border-slate-200 hover:border-[#0f766e]/30 transition-colors text-center shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#0f766e] to-[#14b8a6] flex items-center justify-center font-display font-bold text-white text-lg mb-4 shadow-lg shadow-teal-600/20">
                  {member.initials}
                </div>
                <h3 className="font-display font-semibold text-slate-900">{member.name}</h3>
                <p className="text-sm text-[#0f766e] mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#13253f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Join Our Mission</h2>
          <p className="text-slate-200/80 max-w-xl mx-auto mb-8">
            Whether you are a student, partner, or supporter - there is a place for you at
            ApexMinds.
          </p>
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-semibold bg-[#f4a62a] text-white shadow-lg shadow-[#f4a62a]/25 hover:-translate-y-0.5 transition-all"
          >
            Apply Today <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
