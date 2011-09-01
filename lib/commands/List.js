var util = require("util");

/*------------------------------------------------------------------------------
  (public) List
  
  + client
  - void
  
  Set up List object.
------------------------------------------------------------------------------*/
var List = module.exports = function List(client) {
    this.client = client;
};

/*------------------------------------------------------------------------------
  (public) add
  
  + key
  + member
  + callback - err (native), res (native)
  - void
  
  Helper for redis RPUSH command.
------------------------------------------------------------------------------*/
List.prototype.add = function(key, value, callback) {
    this.client.rpush(key, value, function(err, res) {
        callback(err, res);
    });
};

/*------------------------------------------------------------------------------
  (public) remove
  
  + key
  + member
  + callback - err (native), res (native)
  - void
  
  Helper for redis LREM command.
------------------------------------------------------------------------------*/
List.prototype.remove = function(key, value, callback) {
    this.client.lrem(key, 1, value, function(err, res) {
        callback(err, res);
    });
};

/*------------------------------------------------------------------------------
  (public) getAll
  
  + key
  + callback - err (native), res (array of strings)
  - void
  
  Helper for redis LRANGE command to get all values.
------------------------------------------------------------------------------*/
List.prototype.getAll = function(key, callback) {
    this.client.lrange(key, 0, -1, function(err, res) {
        callback(err, res);
    });
};

/*------------------------------------------------------------------------------
  (public) range
  
  + key
  + start
  + stop
  + callback - err (native), res (array of strings)
  - void
  
  Helper for redis LRANGE command.
------------------------------------------------------------------------------*/
List.prototype.range = function(key, start, stop, callback) {
    this.client.lrange(key, start, stop, function(err, res) {
        callback(err, res);
    });
};

/*------------------------------------------------------------------------------
  (public) count
  
  + key
  + callback - err (native), res (number)
  - void
  
  Helper for redis LREM command.
------------------------------------------------------------------------------*/
List.prototype.count = function(key, callback) {
    this.client.llen(key, function(err, res) {
        callback(err, res);
    });
};