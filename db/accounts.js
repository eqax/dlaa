const mongoose = require("mongoose")

const bots = new mongoose.Schema({

"token": { type: String, require: true } ,

"backup": { type: Array, default: [] } ,
  
"password": { type: String, require: true } ,

  
});

module.exports = mongoose.model('Bots', bots, 'bots')