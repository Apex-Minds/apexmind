import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiGlobe,
  FiLayers,
  FiPhone,
  FiUsers,
} from 'react-icons/fi';
import SectionHeader from '../components/SectionHeader';
import PortalButtons from '../components/PortalButtons';
import { ACHIEVEMENTS, PROGRAMS } from '../data/content';

const HERO_FEATURES = [
  {
    number: '01',
    title: 'Scholarship Facility',
    description: 'Supportive funding options that open the door for more learners.',
    icon: FiBookOpen,
    image:
      'https://i.pinimg.com/1200x/5b/70/eb/5b70eb090baabaf0cd500c9681d29c74.jpg',
  },
  {
    number: '02',
    title: 'Skilled Lecturers',
    description: 'Mentors who pair real industry practice with classroom guidance.',
    icon: FiUsers,
    image:
      'https://i.pinimg.com/736x/ba/b9/59/bab959019f4d910ad60d2d47c9f949fd.jpg',
  },
  {
    number: '03',
    title: 'Book Library Facility',
    description: 'A focused learning environment with the resources students need.',
    icon: FiLayers,
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
  },
  {
    number: '04',
    title: 'Affordable Price',
    description: 'High-value education designed to stay within reach.',
    icon: FiAward,
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
  },
];

const ABOUT_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    alt: 'Students collaborating in class',
    className: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80',
    alt: 'Small group discussion',
    className: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80',
    alt: 'Teacher supporting students',
    className: 'col-span-1 row-span-1',
  },
];

const ABOUT_POINTS = [
  {
    title: 'Education Services',
    description: 'A complete learning pathway from first lesson to career readiness.',
  },
  {
    title: 'International Hub',
    description: 'A community built to connect local talent with global opportunities.',
  },
];

const GALLERY_PREVIEW = [
  {
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    title: 'Classroom Sessions',
  },
  {
    src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
    title: 'Hands-On Labs',
  },
  {
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    title: 'Student Projects',
  },
];

const PROGRAM_IMAGES = {
  'software-development':
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
  'artificial-intelligence':
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80',
  robotics:
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80',
  cybersecurity:
    'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=900&q=80',
};

export default function HomePage() {
  const featuredPrograms = PROGRAMS.slice(0, 4);

  return (
    <div className="overflow-hidden">
      <section className="relative overflow-hidden bg-[#13253f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,166,42,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_35%)]" />
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#f4a62a]" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#f4a62a]/15 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-36 md:pb-24">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 xl:gap-16 items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#ffd88b]">
                Welcome to ApexMinds Academy
              </span>

              <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
                Start Your Beautiful
                <span className="block text-[#ffd56a]">And Bright Future</span>
              </h1>

              <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-slate-200/80">
                A technology-focused school built for students who want real skills, practical
                learning, and a clear path into software, AI, robotics, entrepreneurship, and
                leadership.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-2 rounded-full bg-[#f4a62a] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#f4a62a]/25 transition-all hover:-translate-y-0.5"
                >
                  Apply Now
                  <FiArrowRight />
                </Link>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white transition-all hover:bg-white/10"
                >
                  Learn More
                </Link>
              </div>

              <div className="mt-8">
                <PortalButtons variant="compact" />
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ACHIEVEMENTS.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm"
                  >
                    <div className="font-display text-2xl font-bold text-white">{item.value}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-300/70">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-8 hidden md:flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4a62a] text-[#13253f]">
                  <FiClock />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    30 Years
                  </div>
                  <div className="text-sm font-medium text-white">Of Quality Service</div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-2xl shadow-black/30 backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-[1.6rem]">
                  <img
                    src="https://i.pinimg.com/1200x/5b/70/eb/5b70eb090baabaf0cd500c9681d29c74.jpg"
                    alt="Students in a collaborative classroom"
                    className="h-[520px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1726]/85 via-[#0e1726]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="max-w-md rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                      <p className="text-xs uppercase tracking-[0.25em] text-[#ffd88b]">
                        Study Mode
                      </p>
                      <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold">
                        Learn in a space designed for curiosity and confidence.
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-slate-200/80">
                        Interactive lessons, team projects, and mentor support that help students
                        move from learning concepts to building real products.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-3 bottom-8 hidden md:block rounded-[1.4rem] border border-white/10 bg-[#f4a62a] p-4 text-[#13253f] shadow-xl shadow-[#f4a62a]/25">
                <div className="text-xs font-semibold uppercase tracking-[0.2em]">Top Rated</div>
                <div className="mt-1 font-display text-3xl font-bold">99%</div>
                <div className="text-sm font-medium">Parent Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {HERO_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.number}
                  className="group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.08)]"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#13253f]/85 via-[#13253f]/25 to-transparent" />
                    <div className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f4a62a] text-[#13253f] shadow-lg shadow-[#f4a62a]/25">
                      <Icon />
                    </div>
                    <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-sm font-semibold text-white backdrop-blur-md">
                      {feature.number}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#f6f2ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 xl:gap-16 items-center">
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="row-span-2 overflow-hidden rounded-[1.8rem] shadow-lg">
                  <img
                    src={ABOUT_IMAGES[0].src}
                    alt={ABOUT_IMAGES[0].alt}
                    className="h-full min-h-[400px] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-[1.8rem] shadow-lg">
                  <img
                    src={ABOUT_IMAGES[1].src}
                    alt={ABOUT_IMAGES[1].alt}
                    className="h-full min-h-[190px] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-[1.8rem] shadow-lg">
                  <img
                    src={ABOUT_IMAGES[2].src}
                    alt={ABOUT_IMAGES[2].alt}
                    className="h-full min-h-[190px] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="col-span-2 rounded-[1.8rem] bg-[#f4a62a] p-6 text-[#13253f] shadow-lg">
                  <div className="text-xs font-semibold uppercase tracking-[0.25em]">30 Years</div>
                  <div className="mt-3 font-display text-4xl font-bold">Quality</div>
                  <p className="mt-2 text-sm font-medium leading-relaxed">
                    Service, mentorship, and a learning culture that puts students first.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <SectionHeader
                kicker="About Us"
                title="Our Education System Inspires You More"
                subtitle="We blend practical technology training with strong student support, so learners can grow with confidence and build the future they imagine."
                align="left"
                tone="light"
              />

              <p className="max-w-2xl text-slate-600 leading-relaxed">
                Instead of memorizing for the sake of tests, our students work through projects,
                guided labs, and collaborative challenges. The result is a more active learning
                experience that feels closer to the real world.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {ABOUT_POINTS.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f766e]/10 text-[#0f766e]">
                        <FiCheckCircle />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-slate-900">
                          {point.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all hover:-translate-y-0.5"
                >
                  Discover More
                  <FiArrowRight />
                </Link>
                <a
                  href="tel:+2348000000000"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700"
                >
                  <FiPhone className="text-[#f4a62a]" />
                  Call Admissions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f766e] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {ACHIEVEMENTS.map((item) => (
              <div key={item.label} className="rounded-[1.6rem] border border-white/10 bg-white/10 p-6 text-center backdrop-blur-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4a62a] text-[#13253f] shadow-lg shadow-black/10">
                  <FiGlobe />
                </div>
                <div className="mt-5 font-display text-4xl font-bold">{item.value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.18em] text-white/75">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Our Courses"
            title="Let's Check Our Courses"
            subtitle="Each track is built around practical outcomes, not just classroom theory."
            tone="light"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {featuredPrograms.map((program) => (
              <article
                key={program.id}
                className="group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.07)]"
              >
                <div className="relative h-64">
                  <img
                    src={PROGRAM_IMAGES[program.id]}
                    alt={program.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-60`} />
                  <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                    Featured
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {program.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                      {program.tagline}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-relaxed text-slate-600">{program.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {program.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
                      >
                        <FiCheckCircle className="text-[#0f766e]" />
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#0f766e]">{program.tagline}</span>
                    <Link
                      to="/programs"
                      className="inline-flex items-center gap-2 rounded-full bg-[#f4a62a] px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                    >
                      Learn More
                      <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#f6f2ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Campus Life"
            title="A Place to Learn, Build, and Belong"
            subtitle="The campus experience should feel inspiring from the first visit. We designed these spaces to echo that energy."
            align="left"
            tone="light"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {GALLERY_PREVIEW.map((item, index) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-[1.8rem] bg-white shadow-[0_12px_35px_rgba(15,23,42,0.08)]"
              >
                <div className="relative h-72">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13253f]/85 via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-[#13253f] font-display text-xl font-bold">
                    0{index + 1}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="font-display text-2xl font-bold text-white">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#13253f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-12 lg:p-16 text-center shadow-2xl shadow-black/20">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#ffd88b]">
              Ready to start
            </span>
            <h2 className="mt-6 font-display text-3xl md:text-4xl lg:text-5xl font-bold">
              Ready to Build the Future?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-slate-200/80">
              Join ApexMinds Academy and turn interest into skill, skill into confidence, and
              confidence into opportunity.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 rounded-full bg-[#f4a62a] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#f4a62a]/25 transition-all hover:-translate-y-0.5"
              >
                Start Your Application
                <FiArrowRight />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white transition-all hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
