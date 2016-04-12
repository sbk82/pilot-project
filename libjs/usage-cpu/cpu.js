var os = require("os");

//Create function to get CPU information
function cpuAverage() {

  //Initialise sum of idle and time of cores and fetch CPU info
  var totalIdle = 0, totalTick = 0;
  var cpus = os.cpus();

  //Loop through CPU cores
  for(var i = 0, len = cpus.length; i < len; i++) {

    //Select CPU core
    var cpu = cpus[i];

    //Total up the time in the cores tick
    for(type in cpu.times) {
      totalTick += cpu.times[type];
    }     

    //Total up the idle time of the core
    totalIdle += cpu.times.idle;
  }

  var p_idle = totalIdle / cpus.length;
  var p_total = totalTick / cpus.length;

  //Return the average Idle and Tick times
  return {idle: p_idle,  total: p_total};
}

/*
 * @return {Object} dif - difference of usage CPU
 * @return {Float}  dif.idle
 * @return {Float}  dif.total
 * @return {Float}  dif.percent
*/
function cpuLoadInit(callback) {
  //Grab first CPU Measure
  var startMeasure = cpuAverage();

  //Set delay for second Measure
  setTimeout(function() { 

    //Grab second Measure
    var endMeasure = cpuAverage(); 

    //Calculate the difference in idle and total time between the measures
    var idleDifference = endMeasure.idle - startMeasure.idle;
    var totalDifference = endMeasure.total - startMeasure.total;

    //Calculate the average percentage CPU usage
    var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

    //Output result to console
    callback(percentageCPU);

  }, 100);
}

exports.cpuUsage2 = function(callback){ 
    cpuLoadInit(callback);
}