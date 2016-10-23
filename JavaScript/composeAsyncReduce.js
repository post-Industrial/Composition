fs = require('fs');

// params - array of parametrs for functions

// args - array of functions

// args[i] - function

// args[-1] - callback(err, data)


let composeAsync = (params, ...args) =>
  args.slice(1).reduce((acc, el) => 
      callback => acc((err, ...data) => el(...data, callback)), 
    args[0].bind(null, ...params)
  );


//Bind Composite
let f = composeAsync(

  ['config.txt','utf8'],

  readConfig,

  parseConfing,
  
  preProcess,

  (data, callback) => (data, callback(null, 'composeAsync Callback'))

);

//Apply Composite
f((  (err, data) => {
    if (!err) console.log(data);

  }
));


function wrapAsync(callback) {
    var time = Math.floor((Math.random() * 1000));
    console.log(time + " deley count");
    setTimeout(callback, time);
}

function readConfig(path,charset,callback) {
    fs.readFile(path,charset,(err,configLocal) => {
        if (!err) {
            console.log("Read Done");
            console.log(configLocal + '\n');
            callback(null,configLocal);
        }
        else
        console.log("err 0");
    });
}
function parseConfing(config,callback){
    config = config.toLowerCase();
    wrapAsync(() => {
        console.log("Parse Done");
        console.log(config+ '\n');
        callback(null,config);
    })
}
function preProcess(config,callback){
    // Do smth crazy
    [config1 = config.slice(0,config.length/2),config2 = config.slice(config.length/2).toUpperCase()]
    wrapAsync(() => {
        console.log("Process Done");
        console.log(config1 + '\n' + '\\n' + '\n' + config2 + '\n');
        callback(null,[config1,config2]);
    })
    
}


