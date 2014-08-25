'use strict';

var bcrypt = require('bcrypt');

function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user){return cb();}
    o.password = bcrypt.hashSync(o.password, 10);
    User.collection.save(o, cb);
  });
};

User.authenticate = function(o, cb){
  User.collection.findOne({email:o.email}, function(user){ // err removed because don't need it
    if(!user){return cb();} // Return null if user email does not exist in DB
    var isOk = bcrypt.compareSync(o.password, user.password); // Returns T/F if login password matches DB password
    if(!isOk){return cb();}
    cb(null, user); // user is the user object
  });
};

User.all = function(cb){
  User.collection.find().toArray(cb);
};

module.exports = User;
