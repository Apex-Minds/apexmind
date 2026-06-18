const NewsEvent = require('../models/NewsEvent');
const ContactInquiry = require('../models/ContactInquiry');

exports.getNewsEvents = async (req, res, next) => {
  try {
    const { type, featured, limit } = req.query;
    const filter = { published: true };
    if (type) filter.type = type;
    if (featured === 'true') filter.featured = true;

    const query = NewsEvent.find(filter).sort({ createdAt: -1 });
    if (limit) query.limit(parseInt(limit, 10));

    const items = await query.lean();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getNewsEventBySlug = async (req, res, next) => {
  try {
    const item = await NewsEvent.findOne({
      slug: req.params.slug,
      published: true,
    }).lean();
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    const inquiry = await ContactInquiry.create({
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
    });
    res.status(201).json({ message: 'Thank you! We will get back to you soon.', id: inquiry._id });
  } catch (err) {
    next(err);
  }
};
