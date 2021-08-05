const mongoose = require('../../config/db');

const bcrypt = require('bcryptjs')

const RevendedorSchema = new mongoose.Schema({
     nome:{
          type:String,
          require:true,
     },
     cpf:{
          type: Number,
          require:true,
          unique:true
     },
     email:{
          type:String,
          unique:true,
          lowercase:true,
          required:true
     },
     password:{
          type:String,
          required:true,
          select:false
     },
     createdAt:{
          type:Date,
          default: Date.now()
     }
})

RevendedorSchema.pre('save', async function(next){
     const hash = await bcrypt.hash(this.password, 5);
     this.password = hash;
     next();
})

const Revendedor = mongoose.model('revendedores', RevendedorSchema)

module.exports = Revendedor