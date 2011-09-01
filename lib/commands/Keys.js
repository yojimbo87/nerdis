var util = require("util");

/*------------------------------------------------------------------------------
  (public) Keys
  
  + client
  - void
  
  Set up keys object.
------------------------------------------------------------------------------*/
var Keys = module.exports = function Keys(client) {
    this.client = client;
};

/*------------------------------------------------------------------------------
  (public) add
  
  + key
  + value
  + callback - err (native), res (native)
  - void
  
  Helper for redis DEL command.
------------------------------------------------------------------------------*/
Keys.prototype.add = function(key, callback) {
    this.client.set(key, function(err, res) {
        callback(err, res);
    });
};

/*------------------------------------------------------------------------------
  (public) remove
  
  + key
  + callback - err (native), res (native)
  - void
  
  Helper for redis DEL command.
------------------------------------------------------------------------------*/
Keys.prototype.remove = function(key, callback) {
    this.client.del(key, function(err, res) {
        callback(err, res);
    });
};

/*------------------------------------------------------------------------------
  (public) getAll
  
  + key
  + callback - err (native), res (string)
  - void
  
  Helper for redis KEYS command.
------------------------------------------------------------------------------*/
Keys.prototype.get = function(key, callback) {
    this.client.get(key, function(err, res) {
        callback(err, res);
    });
};

/*------------------------------------------------------------------------------
  (public) getAll
  
  + key
  + callback - err (native), res (array of strings)
  - void
  
  Helper for redis KEYS command.
------------------------------------------------------------------------------*/
Keys.prototype.getAll = function(pattern, callback) {
    this.client.keys(pattern, function(err, res) {
        callback(err, res);
    });
};
