const express=require("express")
const brandController=require("../controller/Brand")
const router=express.Router()

router
    .get("/getbrand",brandController.getAll)
    .post("/add", brandController.addBrand)

module.exports=router