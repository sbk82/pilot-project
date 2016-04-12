// models/sysres.js
// system resource schema

/* 
--------------------------------------------------------------------------------*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var syscpuSchema = new Schema({
    idle: Number,
    user: Number,
    sys: Number,
    reg_date: { type: Date, default: Date.now  }
});
 
module.exports = mongoose.model('syscpu', syscpuSchema);