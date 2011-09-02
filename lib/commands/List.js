var util = require("util");

/*------------------------------------------------------------------------------
  (public) List
  
  + client
  - void
  
  Set up List object.
------------------------------------------------------------------------------*/
var List = module.exports = function List(nerdis) {
    this.nerdis = nerdis;
    this.client = nerdis.redisClient;
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
    if(callback) {
        this.client.rpush(key, value, function(err, res) {
            callback(err, res);
        });
    } else {
        this.nerdis.operationsQueue.push({
            type: "list",
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
  + member
  + callback - err (native), res (native)
  - void
  
  Helper for redis LREM command.
------------------------------------------------------------------------------*/
List.prototype.remove = function(key, value, callback) {
    if(callback) {
        this.client.lrem(key, 1, value, function(err, res) {
            callback(err, res);
        });
    } else {
        this.nerdis.operationsQueue.push({
            type: "list",
            command: "remove",
            parameters: {
                key: key,
                value: value
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
  
  Helper for redis LRANGE command to get all values.
------------------------------------------------------------------------------*/
List.prototype.getAll = function(key, callback) {    
    if(callback) {
        this.client.lrange(key, 0, -1, function(err, res) {
            callback(err, res);
        });
    } else {
        this.nerdis.operationsQueue.push({
            type: "list",
            command: "getAll",
            parameters: {
                key: key
            }
        });
        
        return this.nerdis;
    }
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
    if(callback) {
        this.client.lrange(key, start, stop, function(err, res) {
            callback(err, res);
        });
    } else {
        this.nerdis.operationsQueue.push({
            type: "list",
            command: "range",
            parameters: {
                key: key,
                start: start,
                stop: stop
            }
        });
        
        return this.nerdis;
    }
};

/*------------------------------------------------------------------------------
  (public) count
  
  + key
  + callback - err (native), res (number)
  - void
  
  Helper for redis LREM command.
------------------------------------------------------------------------------*/
List.prototype.count = function(key, callback) {
    if(callback) {
        this.client.llen(key, function(err, res) {
            callback(err, res);
        });
    } else {
        this.nerdis.operationsQueue.push({
            type: "list",
            command: "count",
            parameters: {
                key: key
            }
        });
        
        return this.nerdis;
    }
};