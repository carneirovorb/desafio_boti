const Revendedor = require('../models/Revendedores')
const generateToken = require('../../helpers/generateToken')
const logger = require('pino')()

/**
 * Função que cadastra um novo revendedor
 * Entrada: email, cpf, nome e senha 
 * Saída: dados do revendedor cadastrado e token JWT se sucesso ou mensagem de erro se falha
 */
const create = async (req, res)=>{
     try{
          const {email, cpf, nome, password} = req.body
          if(await Revendedor.findOne({email}) || await Revendedor.findOne({cpf})){
               logger.warn({msg:"o revendedor já está registrado"})
               return res.status(400).send({erro: "o revendedor já está registrado"})
          }
          if(!email || !cpf || !nome || !password){
               logger.error({msg:"Não foi possivel cadastrar o revendedor, dados incompletos"})
               return res.status(400).send({erro: "Não foi possivel cadastrar o revendedor, dados incompletos"})
          }

          revendedor = await Revendedor.create(req.body)
          revendedor.password = undefined

          logger.info({msg:"Revendedor cadastrado com sucesso!"})
          return res.send({revendedor, token:generateToken.newToken(revendedor.id)})

     } catch(err){
          console.log(err)
          logger.error({msg:"Erro no registro do revendedor"})
          res.status(400).send({erro:"Erro no registro do revendedor"})
     }
}



module.exports = {create}