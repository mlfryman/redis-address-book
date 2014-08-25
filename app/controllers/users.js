'use strict';

var User = require('../models/user');

exports.new = function(req, res){
  res.render('users/new');
};

exports.login = function(req, res){
  res.render('users/login');
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/'); // If user does not exist, then they can register successfully
    }else{
      res.redirect('/register'); // If user already exists, then return to register page
    }
  });
};

exports.authenticate = function(req, res){
  User.authenticate(req.body, function(err, user){ // keep err here bc Mongo is calling us back
    if(user){
      req.session.userId = user._id; //saves userId in Redis DB
      req.session.save(function(){
        res.redirect('/'); // If user exists, they login & are redirected to home page
      });
    }else{
      res.redirect('/login'); // If user is NOT authenticated, then return to login page
    }
  });
};
