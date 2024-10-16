const express=require('express')
const cartController=require('../controller/Cart')
const router=express.Router()

router
    .post("/add",cartController.create)
    .get("/user/:id",cartController.getByUserId)
    .patch("/update/:id",cartController.updateById)
    .delete("/delete/:id",cartController.deleteById)
    .delete("/user/deleteall/:id",cartController.deleteByUserId)
    .get("/check/:userId/:productId",cartController.getCartItemByUserAndProduct)

module.exports=router