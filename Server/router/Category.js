const express=require("express")
const categoryController=require("../controller/Category")
const router=express.Router()

router
    .get('/getcategory',categoryController.getAll)
    .post('/add',categoryController.addCategory)
    .get('/getproductbycategory/:categoryName', categoryController.getProductByCategory)

    
module.exports=router