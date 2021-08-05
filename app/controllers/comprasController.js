const Compras = require("../models/Compras");
const Revendedores = require('../models/Revendedores')
const axios = require('axios');
const logger = require('pino')()

/**
 * Função que cadastra uma nova compra 
 * Entrada: codigo, valor e nome
 * Saída: dados da compra registrada se sucesso e mensagem de erro se falha
 */
const cadastrarCompra = async (req, res)=>{
     try{          
          const {codigo, valor, cpf, data} = req.body;
          if(!codigo || !cpf || !valor || !data){
               logger.error({msg:"Não foi possivel cadastrar a compra, dados incompletos"})
               return res.status(400).send({erro: "Não foi possivel cadastrar a compra, dados incompletos"})
          }

          if(await Compras.findOne({codigo})){
               logger.warn({msg:"Já existe uma compra cadastrada com este codigo!"})
               return res.status(400).send({erro: "Já existe uma compra cadastrada com este codigo!"})
          }

          compra = await Compras.create({
               codigo, valor, cpf, data, 
               status: cpf==15350946056 ? 'Aprovado':'Em validação'
          })
          logger.info({msg:"Compra registrada!"})
          return res.send({compra})

     } catch(err){
          logger.error({msg:"Erro no registro da compra"})
          res.status(400).send({erro:"Erro no registro da compra"})
     }
}


/**
 * Função que lista as compras cadastradas
 * Entrada: id do revendedor
 * Saída: dados das compras registradas se sucesso e mensagem de erro se falha
 */
const listarCompras = async (req,res)=>{
     try{
          const {cpf} = await Revendedores.findOne({_id:req.revendedor_id})
          if(!cpf){
               logger.error({msg:"Erro ao recuperar compras"})
               return res.status(400).send({erro:"Erro ao recuperar compras"})
          }
          let compras = await Compras.find().where({cpf})
          
          compras = compras.map(compra=>{
               if(compra.valor<=1000) cashback = 0.1;
               else if(compra.valor>1000 && compra.valor<=1500) cashback = 0.15;
               else cashback = 0.2;

               return ({
                    codigo: compra.codigo, 
                    valor:compra.valor, 
                    data: compra.data, 
                    cashback_aplicado: `${cashback*100}%`, 
                    valor_cashback: `R$ ${compra.valor*cashback}`, 
                    status: compra.status
               })
          })
          logger.info({msg:"Compras recuperadas com sucesso!"})
          return res.status(200).send({compras})
     }catch(err){
          logger.error({msg:"Erro ao recuperar compras"})
          return res.status(400).send({erro:"Erro ao recuperar compras"})
     }
}

const cashbackAcumulado = async (req, res)=>{
     try{
          const {cpf} = await Revendedores.findOne({_id:req.revendedor_id})
          if(!cpf){
               logger.error({msg:"Erro ao recuperar cashback acumulado"})
               return res.status(400).send({erro:"Erro ao recuperar cashback acumulado"})
          }

          const {data} = await axios.get(`https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=${cpf}`, {
               headers: {'token': 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm'}
          });

          logger.info({msg:"Cashback acumulado recuperado com sucesso"})
          return res.status(200).send({cashback_acumulado: data.body.credit}); 
     }catch(err){
          logger.error({msg:"Erro ao recuperar cashback acumulado"})
          return res.status(400).send({erro:"Erro ao recuperar cashback acumulado"})
     }
}

module.exports ={cadastrarCompra, listarCompras, cashbackAcumulado}