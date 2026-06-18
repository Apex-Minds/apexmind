const NewsEvent = require('../models/NewsEvent');
const ContactInquiry = require('../models/ContactInquiry');

exports.getAllNewsEvents = async (req, res, next) => {
  try {
    const items = await NewsEvent.find().sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.createNewsEvent = async (req, res, next) => {
  try {
    const item = await NewsEvent.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

exports.updateNewsEvent = async (req, res, next) => {
  try {
    const item = await NewsEvent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.deleteNewsEvent = async (req, res, next) => {
  try {
    const item = await NewsEvent.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};

exports.getContactInquiries = async (req, res, next) => {
  try {
    const items = await ContactInquiry.find().sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (err) {
    next(err);
  }
};
