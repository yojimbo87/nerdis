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
        keys: new Keys(this.redisClient),
        set: new Set(this.redisClient),
        list: new List(this.redisClient)
    };
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
