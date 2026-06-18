const Class = require('../models/Class');
const { success, fail } = require('../utils/responseHelper');

exports.getAll  = async (req, res) => { try { success(res, await Class.find().populate('classTeacher subjects')); } catch(e){ fail(res,e.message,500); }};
exports.getOne  = async (req, res) => { try { success(res, await Class.findById(req.params.id).populate('classTeacher subjects students')); } catch(e){ fail(res,e.message,500); }};
exports.create  = async (req, res) => { try { success(res, await Class.create(req.body), 201); } catch(e){ fail(res,e.message,500); }};
exports.update  = async (req, res) => { try { success(res, await Class.findByIdAndUpdate(req.params.id, req.body, { new:true })); } catch(e){ fail(res,e.message,500); }};
exports.remove  = async (req, res) => { try { await Class.findByIdAndDelete(req.params.id); success(res, { message:'Deleted' }); } catch(e){ fail(res,e.message,500); }};
