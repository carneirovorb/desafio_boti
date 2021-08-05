const mongoose = require('../../config/db');

const CompraSchema = new mongoose.Schema({
     codigo:{
          type:Number,
          require:true,
          unique:true
     },
     cpf:{
          type: Number,
          require:true,
     },
     data:{
          type:Date,
          required:true
     },
     valor:{
          type:Number,
          required:true
     },
     status:{
          type:String,
          required:true
     },
     createdAt:{
          type:Date,
          default: Date.now()
     }
})


const Compra = mongoose.model('compras', CompraSchema)

module.exports = Compra