const express = require("express");
const productnewrouter = express.Router();
const productCtrl = require("../controllers/productCtrl")


productnewrouter.route("/productsnew")
.get(productCtrl.getProducts)
.post(productCtrl.createProduct)


productnewrouter.route("/productsnew/:productId")
.get(productCtrl.getProduct)
.delete(productCtrl.deleteProduct)
.put(productCtrl.updateProduct)
module.exports = productnewrouter;