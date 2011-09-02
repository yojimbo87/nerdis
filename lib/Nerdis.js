var util = require("util"),
    redis = require("redis"),
    Keys = require("./commands/Keys"),
    Set = require("./commands/Set"),
    List = require("./commands/List");
    
/*------------------------------------------------------------------------------
  (public) Nerdis
  
  + options - host, port, password
  - void
  
  Set up Nerdis.
------------------------------------------------------------------------------*/
var Nerdis = module.exports = function Nerdis(opt) {
    var options = {
        host: opt.host || "127.0.0.1",
        port: opt.port || 6379,
        password: opt.password || "",
        database: opt.database || 0
    };

    this.redisClient = redis.createClient(
        options.port,
        options.host
    );
    
    if(options.password !== "") {
        this.redisClient.auth(options.password);
    }
    
    if(options.database !== 0) {
        this.redisClient.select(options.database);
    }
    
    this.commands = {
        keys: new Keys(this, this.redisClient),
        set: new Set(this.redisClient),
        list: new List(this.redisClient)
    };
    
    this.operationsQueue = [];
};

/*------------------------------------------------------------------------------
  (public) keys
  
  - get - returns keys commands object
  
  Helper for redis keys commands.
------------------------------------------------------------------------------*/
Object.defineProperty(Nerdis.prototype, "keys", {
    get: function() {
        return this.commands.keys;
    }
});

/*------------------------------------------------------------------------------
  (public) set
  
  - get - returns set commands object
  
  Helper for redis set commands.
------------------------------------------------------------------------------*/
Object.defineProperty(Nerdis.prototype, "set", {
    get: function() {
        return this.commands.set;
    }
});

/*------------------------------------------------------------------------------
  (public) list
  
  - get - returns list commands object
  
  Helper for redis list commands.
------------------------------------------------------------------------------*/
Object.defineProperty(Nerdis.prototype, "list", {
    get: function() {
        return this.commands.list;
    }
});

/*------------------------------------------------------------------------------
  (public) execute

  + operation
  + callback - err, res
  - void
  
  Execute given operation.
  
------------------------------------------------------------------------------*/
Nerdis.prototype.execute = function(operation, callback) {
    var self = this;;
    
    switch(operation.type) {
        case "keys":
            switch(operation.command) {
                case "add":
                    self.commands.keys.add(
                        operation.parameters.key,
                        operation.parameters.value,
                        function(err, res) {
                            callback(err, res)
                        }
                    );
                    break;
                case "remove":
                    self.commands.keys.remove(
                        operation.parameters.key,
                        function(err, res) {
                            callback(err, res)
                        }
                    );
                    break;
                case "get":
                    self.commands.keys.get(
                        operation.parameters.key,
                        function(err, res) {
                            callback(err, res)
                        }
                    );
                    break;
                case "getAll":
                    self.commands.keys.getAll(
                        operation.parameters.pattern,
                        function(err, res) {
                            callback(err, res)
                        }
                    );
                    break;
                default:
                    break;
            }
            break;
        case "set":
            break;
        case "list":
            break;
        default:
            break;
    }
};

/*------------------------------------------------------------------------------
  (public) queue

  + runs
  + callback - err, res (array of results from all operations)
  - void
  
  Process operations inside internal queue and return results.
  
------------------------------------------------------------------------------*/
Nerdis.prototype.queue = function(callback) {
    var self = this, 
        operationsQueue = [],
        results = [],
        operation, i, len, item;
    
    operationsQueue = self.operationsQueue;
    self.operationsQueue = [];
    
    (function processOne() {
         // get the first record of coll and reduce coll by one
        operation = operationsQueue.splice(0, 1)[0];
        
        self.execute(operation, function(err, res) {
            if (err) { 
                callback(err); 
                return;
            } else {          
                if (operationsQueue.length === 0) {
                    results.push(res);
                    callback(err, results);
                } else {
                    results.push(res);
                    processOne();
                }
            }
        });
    })();
};