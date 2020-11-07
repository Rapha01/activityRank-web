const textModel = require('../models/textModel.js');

exports.index = (req, res, next) => {
  res.render('index',{shardStats: textModel.shardStats, botStats: textModel.botStats,features: textModel.features, feedbacks: textModel.feedbacks});
}
exports.commands = (req, res, next) => {
  res.render('commands',{shardStats: textModel.shardStats,commands: textModel.commands});
}
exports.patchnotes = (req, res, next) => {
  res.render('patchnotes',{shardStats: textModel.shardStats,patchnotes: textModel.patchnotes});
}
exports.about = (req, res, next) => {
  res.render('about',{shardStats: textModel.shardStats});
}
exports.premium = (req, res, next) => {
  res.render('premium',{shardStats: textModel.shardStats,node_env:process.env.NODE_ENV});
}
exports.faq = (req, res, next) => {
  res.render('faq',{shardStats: textModel.shardStats,faqs: textModel.faqs});
}
exports.support = (req, res, next) => {
  res.render('support',{shardStats: textModel.shardStats});
}
exports.privacyPolicy = (req, res, next) => {
  res.render('privacyPolicy',{shardStats: textModel.shardStats,privacyPolicy: textModel.privacyPolicy});
}
exports.termsAndConditions = (req, res, next) => {
  res.render('termsAndConditions',{shardStats: textModel.shardStats,termsAndConditions: textModel.termsAndConditions});
}
