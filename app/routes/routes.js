'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    security        = require('../lib/security'),
    home           = require('../controllers/home'),
    users          = require('../controllers/users');

// Pipeline executes serially (in order that they appear), every time browser sents/recieves a request
module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), // Creates session; parses cookie
    secret:'keyboard cat', // password that helps encode the cookie; can make the phrase whatever you want it to be
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:null} // cookie is good for an hour=3600; day=86400; always=null
  }));

  app.use(security.authenticate);
  app.get('/', home.index);

  app.get('/register', users.new);
  app.post('/register', users.create);
  app.get('/login', users.login);
  app.post('/login', users.authenticate);

  console.log('Express: Routes Loaded');
};
