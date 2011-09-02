var util = require("util");

/*------------------------------------------------------------------------------
  (public) Keys
  
  + client
  - void
  
  Set up keys object.
------------------------------------------------------------------------------*/
var Keys = module.exports = function Keys(nerdis) {
    this.nerdis = nerdis;
    this.client = nerdis.redisClient;
};

/*------------------------------------------------------------------------------
  (public) add
  
  + key
  + value
  + callback - err (native), res (native)
  - void
  
  Helper for redis SET command.
------------------------------------------------------------------------------*/
Keys.prototype.add = function(key, value, callback) {    
    if(callback) {
        this.client.set(key, value, function(err, res) {
            callback(err, res);
        });
    } else {
        this.nerdis.operationsQueue.push({
            type: "keys",
            command: "add",
            parameters: {
                key: key,
                value: value
            }
        });
        
        return this.nerdis;
    }
};

/*------------------------------------------------------------------------------
  (public) remove
  
  + key
  + callback - err (native), res (native)
  - void
  
  Helper for redis DEL command.
------------------------------------------------------------------------------*/
Keys.prototype.remove = function(key, callback) {
    if(callback) {
        this.client.del(key, function(err, res) {
            callback(err, res);
        });
    } else {
        this.nerdis.operationsQueue.push({
            type: "keys",
            command: "remove",
            parameters: {
                key: key
            }
        });
        
        return this.nerdis;
    }
};

/*------------------------------------------------------------------------------
  (public) get
  
  + key
  + callback - err (native), res (string)
  - void
  
  Helper for redis GET command.
------------------------------------------------------------------------------*/
Keys.prototype.get = function(key, callback) {
    if(callback) {
        this.client.get(key, function(err, res) {
            callback(err, res);
        });
    } else {
        this.nerdis.operationsQueue.push({
            type: "keys",
            command: "get",
            parameters: {
                key: key
            }
        });
        
        return this.nerdis;
    }
};

/*------------------------------------------------------------------------------
  (public) getAll
  
  + key
  + callback - err (native), res (array of strings)
  - void
  
  Helper for redis KEYS command.
------------------------------------------------------------------------------*/
Keys.prototype.getAll = function(pattern, callback) {
    if(callback) {
        this.client.keys(pattern, function(err, res) {
            callback(err, res);
        });
    } else {
        this.nerdis.operationsQueue.push({
            type: "keys",
            command: "getAll",
            parameters: {
                pattern: pattern
            }
        });
        
        return this.nerdis;
    }
};
