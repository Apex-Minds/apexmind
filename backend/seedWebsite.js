require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const NewsEvent = require('./models/NewsEvent');

const NEWS_EVENTS = [
  {
    title: 'ApexMinds Wins National Innovation Award',
    excerpt:
      'Our student startup MediScan AI received the 2025 National Innovation Award for healthcare technology.',
    content:
      'The ApexMinds Innovation Lab celebrates another milestone as MediScan AI, developed by Team Nova, wins the prestigious National Innovation Award. The AI-powered diagnostic tool has already been piloted in three hospitals.',
    type: 'news',
    featured: true,
    published: true,
  },
  {
    title: 'Annual Tech Hackathon 2026',
    excerpt:
      'Join 200+ developers for 48 hours of coding, mentorship, and prizes worth over $50,000.',
    content:
      'Registration is now open for our flagship hackathon. Teams will tackle real-world challenges in healthcare, fintech, and climate tech with mentorship from industry leaders.',
    type: 'event',
    eventDate: new Date('2026-07-15T09:00:00.000Z'),
    location: 'ApexMinds Innovation Lab',
    featured: true,
    published: true,
  },
  {
    title: 'New AI Research Partnership Announced',
    excerpt:
      'ApexMinds partners with leading tech firms to expand our AI and machine learning curriculum.',
    content:
      'This partnership brings cutting-edge GPU resources, guest lecturers, and internship pipelines to our Artificial Intelligence program.',
    type: 'news',
    published: true,
  },
  {
    title: 'Open Day & Campus Tour',
    excerpt:
      'Prospective students and parents are invited to explore our facilities and meet faculty.',
    content:
      'Tour our Innovation Lab, robotics workshop, and AI research center. Q&A sessions with current students and admissions team available.',
    type: 'event',
    eventDate: new Date('2026-06-28T10:00:00.000Z'),
    location: 'Main Campus',
    published: true,
  },
  {
    title: 'Robotics Team Qualifies for World Championship',
    excerpt:
      'Team AgriBot X advances to the international robotics competition in Singapore.',
    type: 'news',
    published: true,
  },
  {
    title: 'Cybersecurity Bootcamp Intake',
    excerpt:
      'Applications now open for our intensive 12-week cybersecurity professional certificate.',
    type: 'event',
    eventDate: new Date('2026-08-01T08:00:00.000Z'),
    location: 'Cyber Range Lab',
    published: true,
  },
];

async function seedWebsite() {
  await connectDB();
  console.log('Connected to MongoDB');

  await NewsEvent.deleteMany({});
  console.log('Cleared existing news/events');

  for (const item of NEWS_EVENTS) {
    await NewsEvent.create(item);
  }
  console.log(`Seeded ${NEWS_EVENTS.length} news/events`);

  await mongoose.disconnect();
  console.log('Done.');
}

seedWebsite().catch((err) => {
  console.error(err);
  process.exit(1);
});
