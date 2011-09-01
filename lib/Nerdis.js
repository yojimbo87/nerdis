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
    
    this.commandsQueue = [];
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
  + callback
  - void
  
  Execute commands in queue and call callback.
  
  { type: string, command: string, parameters: array }
------------------------------------------------------------------------------*/
Nerdis.prototype.execute = function(operation, callback) {
    var self = this,
        queueItem, i, len;
    
    for(i = 0, len = queue.length; i < len; i++) {
        queueItem = queue[i];
        
        switch(queueItem.type) {
            case "keys":
                switch(queueItem.command) {
                    case "add":
                        self.commands.keys.add(
                            queueItem.parameters.key
                        );
                        break;
                    case "remove":
                        break;
                    case "get":
                        break;
                    case "getAll":
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
        
        if(i === (len - 1)) {
            callback("done");
        }
    }
};

// TODO: use execute inside queue loop to get callback from particular command,
// then check if some runs parameter isn't applicable for current queue command
// and apply it accordingly
Nerdis.prototype.queue = function(runs, callback) {
    var self = this, commandsQueue = [],
        command, i, len, item;

    //self.cmds.push(params);
    
    if(callback) {
        commandsQueue = self.commandsQueue;
        self.commandsQueue = [];
        
        for(i = 0, len = commandsQueue.length; i < len; i++) {
            //command = commandsQueue[i];
            //command += i;
            commandsQueue[i] += i;
            if(i === (len - 1)) {
                callback(commandsQueue);
            }
        }
    } else {
        return self;
    }
};