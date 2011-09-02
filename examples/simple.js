var util = require("util"),
    Nerdis = require("../lib/Nerdis");
    
var nerdis = new Nerdis({
    host: "vps-19-ubuntu-server.developmententity.sk",
    password: "tomino87",
    database: 1
});

//keys_get("mykey");
//keys_getAll("*");

//set_add("myset", "member1");
//set_remove("myset", "member1");
//set_getAll("myset");
//set_count("myset");

//list_add("mylist", "value1");
//list_add("mylist", "value2");
//list_add("mylist", "value3");
//list_remove("mylist", "value2");
//list_getAll("mylist");
//list_range("mylist", 0, 1);
//list_count("mylist");

queue();

/*------------------------------------------------------------------------------
  
  keys
  
------------------------------------------------------------------------------*/
function keys_get(key) {
    nerdis.keys.get(key, function(err, res) {
        if(err) {
            util.log(err);
        } else {
            console.log(res);
        }
    });
}

function keys_getAll(pattern) {
    nerdis.keys.getAll(pattern, function(err, res) {
        if(err) {
            util.log(err);
        } else {
            for(var i = 0, len = res.length; i < len; i++) {
                console.log((i + 1) + ": " + res[i]);
            }
        }
    });
}

/*------------------------------------------------------------------------------
  
  set
  
------------------------------------------------------------------------------*/
function set_add(key, member) {
    nerdis.set.add(key, member, function(err, res) {
        if(err) {
            util.log(err);
        } else {
            console.log(res);
        }
    });
}

function set_remove(key, member) {
    nerdis.set.remove(key, member, function(err, res) {
        if(err) {
            util.log(err);
        } else {
            console.log(res);
        }
    });
}

function set_getAll(key) {
    nerdis.set.getAll(key, function(err, res) {
        if(err) {
            util.log(err);
        } else {
            for(var i = 0, len = res.length; i < len; i++) {
                console.log((i + 1) + ": " + res[i]);
            }
        }
    });
}

function set_count(key) {
    nerdis.set.count(key, function(err, res) {
        if(err) {
            util.log(err);
        } else {
            console.log(res);
        }
    });
}

/*------------------------------------------------------------------------------
  
  list
  
------------------------------------------------------------------------------*/
function list_add(key, value) {
    nerdis.list.add(key, value, function(err, res) {
        if(err) {
            util.log(err);
        } else {
            console.log(res);
        }
    });
}

function list_remove(key, value) {
    nerdis.list.remove(key, value, function(err, res) {
        if(err) {
            util.log(err);
        } else {
            console.log(res);
        }
    });
}

function list_getAll(key) {
    nerdis.list.getAll(key, function(err, res) {
        if(err) {
            util.log(err);
        } else {
            for(var i = 0, len = res.length; i < len; i++) {
                console.log((i + 1) + ": " + res[i]);
            }
        }
    });
}

function list_range(key, start, stop) {
    nerdis.list.range(key, start, stop, function(err, res) {
        if(err) {
            util.log(err);
        } else {
            for(var i = 0, len = res.length; i < len; i++) {
                console.log((i + 1) + ": " + res[i]);
            }
        }
    });
}

function list_count(key) {
    nerdis.list.count(key, function(err, res) {
        if(err) {
            util.log(err);
        } else {
            console.log(res);
        }
    });
}


/*------------------------------------------------------------------------------
  
  queue
  
------------------------------------------------------------------------------*/
function queue() {
    nerdis
        .keys.add("xxx", "valxxx")
        .keys.add("mykey", "valmykey")
        .keys.getAll("*")
        .keys.get("mykey")
        .keys.get("xxx")
        .queue(function(err, results) {
            util.log("results: " + JSON.stringify(results));
        }
    );
}