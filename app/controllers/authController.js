const Revendedor = require('../models/Revendedores')
const bcrypt = require('bcryptjs') 
const generateToken = require('../../helpers/generateToken')
const logger = require('pino')()


/**
 * Função que realiza o login do revendedor
 * Entrada: email e uma senha 
 * Saída: dados do revendedor e token JWT se sucesso ou mensagem de erro se falha no login
 */

const login = async (req, res)=>{
     try{
          const {email, password} = req.body

          revendedor = await Revendedor.findOne({email}).select('+password');

          if(!revendedor){
               logger.error({msg:"Revendedor não registrado!"})
               return res.status(400).send({erro:"Revendedor não registrado!"})
          }

          if(!await bcrypt.compare(password, revendedor.password)){
               logger.error({msg:"Email ou Senha incorreta!"})
               return res.status(400).send({erro:"Email ou Senha incorreta!"})
          }

          revendedor.password = undefined
          logger.info({msg:"Logado com sucesso!"})
          return res.send({revendedor, token:generateToken.newToken(revendedor.id)})

     } catch(err){
          logger.error({msg:"Erro no registro do revendedor"})
          res.status(400).send({erro:"Erro no registro do revendedor"})
     }
}

module.exports = {login};