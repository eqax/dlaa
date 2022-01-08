const mongoose = require("mongoose")

const accounts = new mongoose.Schema({

"token": { type: String, require: true } ,

"backups": { type: Array, default: [] } ,

"email": { type: String, default: "" } ,
"password": { type: String, default: "" } ,

});

module.exports = mongoose.model('Accounts', accounts, 'Accounts')