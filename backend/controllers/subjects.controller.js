const Subject = require('../models/Subject');
const { success, fail } = require('../utils/responseHelper');

exports.getAll  = async (req, res) => { try { success(res, await Subject.find().populate('teacher')); } catch(e){ fail(res,e.message,500); }};
exports.create  = async (req, res) => { try { success(res, await Subject.create(req.body), 201); } catch(e){ fail(res,e.message,500); }};
exports.update  = async (req, res) => { try { success(res, await Subject.findByIdAndUpdate(req.params.id, req.body, { new:true })); } catch(e){ fail(res,e.message,500); }};
exports.remove  = async (req, res) => { try { await Subject.findByIdAndDelete(req.params.id); success(res, { message:'Deleted' }); } catch(e){ fail(res,e.message,500); }};
