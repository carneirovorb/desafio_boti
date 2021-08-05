const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGODB, {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex:true})

mongoose.Promise = global.Promise;

module.exports = mongoose;