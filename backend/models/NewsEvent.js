const mongoose = require('mongoose');

const NewsEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, default: '' },
    type: { type: String, enum: ['news', 'event'], default: 'news' },
    eventDate: { type: Date },
    location: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

NewsEventSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('NewsEvent', NewsEventSchema);
