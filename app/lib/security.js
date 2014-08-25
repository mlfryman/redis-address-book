'use strict';

var User = require('../models/user');

exports.authenticate = function(req, res, next){
  console.log('looking into session');
  console.log(req.session);

  if(!req.session.userId){return next();}

  User.findById(req.session.userId, function(err, user){
    console.log(user);
    res.locals.user = user; // Anything after this step will access to user
    next();
  });
};
