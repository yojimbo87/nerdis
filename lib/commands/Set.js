var util = require("util");

/*------------------------------------------------------------------------------
  (public) Set
  
  + client
  - void
  
  Set up Set object.
------------------------------------------------------------------------------*/
var Set = module.exports = function Set(client) {
    this.client = client;
};

/*------------------------------------------------------------------------------
  (public) add
  
  + key
  + member
  + callback - err (native), res (native)
  - void
  
  Helper for redis SADD command.
------------------------------------------------------------------------------*/
Set.prototype.add = function(key, member, callback) {
    this.client.sadd(key, member, function(err, res) {
        callback(err, res);
    });
};

/*------------------------------------------------------------------------------
  (public) remove
  
  + key
  + member
  + callback - err (native), res (native)
  - void
  
  Helper for redis SREM command.
------------------------------------------------------------------------------*/
Set.prototype.remove = function(key, member, callback) {
    this.client.srem(key, member, function(err, res) {
        callback(err, res);
    });
};

/*------------------------------------------------------------------------------
  (public) getAll
  
  + key
  + callback - err (native), res (array of strings)
  - void
  
  Helper for redis SMEMBERS command.
------------------------------------------------------------------------------*/
Set.prototype.getAll = function(key, callback) {
    this.client.smembers(key, function(err, res) {
        callback(err, res);
    });
};

/*------------------------------------------------------------------------------
  (public) count
  
  + key
  + callback - err (native), res (number)
  - void
  
  Helper for redis SCARD command.
------------------------------------------------------------------------------*/
Set.prototype.count = function(key, callback) {
    this.client.scard(key, function(err, res) {
        callback(err, res);
    });
};