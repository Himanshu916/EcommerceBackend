const express = require("express");
const categorierouter = express.Router()
const categorieCtrl = require("../controllers/categorieCtrl")
const isAuthorized = require("../middlewares/isAuthorized");
const isAdmin = require("../middlewares/isAdmin");



categorierouter.route("/categories")
.get(categorieCtrl.getCategories)
.post(isAuthorized,isAdmin,categorieCtrl.createCategorie)

categorierouter.route("/categories/:id")
.delete(isAuthorized,isAdmin,categorieCtrl.deleteCategorie)
.put(isAuthorized,isAdmin,categorieCtrl.updateCategorie)


module.exports = categorierouter