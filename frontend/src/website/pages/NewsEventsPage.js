import React, { useState, useEffect } from 'react';
import { FiCalendar, FiMapPin, FiClock, FiRefreshCw } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import { fetchNewsEvents } from '../utils/publicApi';

const FALLBACK_NEWS = [
  {
    _id: '1',
    title: 'ApexMinds Wins National Innovation Award',
    excerpt:
      'Our student startup MediScan AI received the 2025 National Innovation Award for healthcare technology.',
    type: 'news',
    createdAt: '2026-05-20T00:00:00.000Z',
    featured: true,
  },
  {
    _id: '2',
    title: 'Annual Tech Hackathon 2026',
    excerpt:
      'Join 200+ developers for 48 hours of coding, mentorship, and prizes worth over $50,000.',
    type: 'event',
    eventDate: '2026-07-15T09:00:00.000Z',
    location: 'ApexMinds Innovation Lab',
    createdAt: '2026-05-01T00:00:00.000Z',
    featured: true,
  },
  {
    _id: '3',
    title: 'New AI Research Partnership Announced',
    excerpt:
      'ApexMinds partners with leading tech firms to expand our AI and machine learning curriculum.',
    type: 'news',
    createdAt: '2026-04-10T00:00:00.000Z',
  },
  {
    _id: '4',
    title: 'Open Day & Campus Tour',
    excerpt:
      'Prospective students and parents are invited to explore our facilities and meet faculty.',
    type: 'event',
    eventDate: '2026-06-28T10:00:00.000Z',
    location: 'Main Campus',
    createdAt: '2026-04-01T00:00:00.000Z',
  },
  {
    _id: '5',
    title: 'Robotics Team Qualifies for World Championship',
    excerpt:
      'Team AgriBot X advances to the international robotics competition in Singapore.',
    type: 'news',
    createdAt: '2026-03-15T00:00:00.000Z',
  },
  {
    _id: '6',
    title: 'Cybersecurity Bootcamp Intake',
    excerpt:
      'Applications now open for our intensive 12-week cybersecurity professional certificate.',
    type: 'event',
    eventDate: '2026-08-01T08:00:00.000Z',
    location: 'Cyber Range Lab',
    createdAt: '2026-03-01T00:00:00.000Z',
  },
];

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function NewsCard({ item }) {
  const isEvent = item.type === 'event';
  const displayDate = isEvent ? item.eventDate : item.createdAt;

  return (
    <article className="group p-6 rounded-[1.8rem] bg-white border border-slate-200 hover:border-[#0f766e]/30 transition-all duration-300 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${
            isEvent
              ? 'bg-[#0f766e]/10 text-[#0f766e] border border-[#0f766e]/20'
              : 'bg-[#f4a62a]/10 text-[#d48f1a] border border-[#f4a62a]/20'
          }`}
        >
          {isEvent ? 'Event' : 'News'}
        </span>
        {item.featured && (
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#f4a62a]/15 text-[#d48f1a] border border-[#f4a62a]/25">
            Featured
          </span>
        )}
      </div>
      <h3 className="font-display font-semibold text-xl text-slate-900 mb-3 group-hover:text-[#0f766e] transition-colors">
        {item.title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.excerpt}</p>
      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <FiCalendar className="text-[#f4a62a]" />
          {formatDate(displayDate)}
        </span>
        {isEvent && item.location && (
          <span className="flex items-center gap-1">
            <FiMapPin className="text-[#f4a62a]" />
            {item.location}
          </span>
        )}
      </div>
      {item.content && (
        <p className="mt-4 text-sm text-slate-500 leading-relaxed border-t border-slate-200 pt-4">
          {item.content}
        </p>
      )}
    </article>
  );
}

export default function NewsEventsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [fromApi, setFromApi] = useState(true);

  const loadNews = async () => {
    setLoading(true);
    try {
      const data = await fetchNewsEvents();
      setItems(data.length > 0 ? data : FALLBACK_NEWS);
      setFromApi(data.length > 0);
    } catch {
      setItems(FALLBACK_NEWS);
      setFromApi(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const filtered =
    filter === 'all' ? items : items.filter((item) => item.type === filter);

  return (
    <>
      <PageHero
        kicker="News & Events"
        title="Stay Connected with ApexMinds"
        subtitle="Latest announcements, campus events, achievements, and opportunities from our technology community."
      />

      <section className="py-16 md:py-24 bg-[#f6f2ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div className="flex gap-2">
              {['all', 'news', 'event'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                    filter === f
                      ? 'bg-[#0f766e] text-white shadow-lg shadow-teal-600/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'news' ? 'News' : 'Events'}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={loadNews}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-[#0f766e] transition-colors disabled:opacity-50"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {!fromApi && !loading && (
            <div className="mb-8 p-4 rounded-xl bg-[#f4a62a]/10 border border-[#f4a62a]/20 text-[#8b6914] text-sm">
              Showing sample content. Connect the backend to display live news and events.
            </div>
          )}

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-64 rounded-[1.8rem] bg-white border border-slate-200 animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <FiClock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No {filter === 'all' ? 'items' : filter} found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <NewsCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
