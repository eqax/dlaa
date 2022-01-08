const mongoose = require("mongoose")

const config = process.env

 module.exports.init = () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      reconnectTries: Infinity,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 1000000,
      family: 4
    };
    
    mongoose.connect('mongodb+srv://yousuf:41371755aa@cluster0.gu4me.mongodb.net/accounts', {connectTimeoutMS: 20000})
    mongoose.Promise = global.Promise;
    
    mongoose.connection.on('connected', () =>{
      console.log('Mongoose has successfully connected!')
    });
    
    mongoose.connection.on('err', err => {
      console.error(`Mongoose connection error: \n${err.stack}`)
    });
    
    mongoose.connection.on('disconnected', () =>{
      console.warn('Mongoose connection lost')
    });
  }

