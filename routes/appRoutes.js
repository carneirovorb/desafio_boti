const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const revendedorController = require("../app/controllers/revendedorController");
const authController = require("../app/controllers/authController");
const comprasController = require("../app/controllers/comprasController");


router.post('/revendedor/cadastrar', async (req, res)=>{
     await revendedorController.create(req, res);
})

router.post('/revendedor/login', async (req, res)=>{
     await authController.login(req, res);
})

router.use(authMiddleware).post('/compras/cadastrar', async (req, res)=>{
     await comprasController.cadastrarCompra(req, res);
})

router.use(authMiddleware).get('/compras/listar', async (req, res)=>{
     await comprasController.listarCompras(req, res);
})

router.use(authMiddleware).get('/compras/cashback', async (req, res)=>{
     await comprasController.cashbackAcumulado(req, res);
})


module.exports = router