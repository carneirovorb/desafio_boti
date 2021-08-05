const jwt = require("jsonwebtoken");
require("dotenv").config();
const logger = require('pino')()




/**
 * Middleware para validação do token JWT 
 * Entrada: token JWT
 * Saída: id do revendedor associado ao token
 */
const jwtCheck = (req, res, next) => {

  const token = req.headers.token;

  if (!token) {
    logger.error({msg:"token não fornecido!"})
    return res.status(401).send({ erro: "token não fornecido!" });
  }
  
  jwt.verify(token, process.env.SECRET_HASH, (err, decoded) => {
    if (err) {
      logger.error({msg:"token fornecido é inválido!"})
      return res.status(401).send({ error: "token fornecido é inválido!" });
    }
    logger.info({msg:"token validado com sucesso!"})
    req.revendedor_id = decoded.id;
    return next();
  });

};


module.exports = jwtCheck
