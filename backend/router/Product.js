const express=require('express')
const productController=require("../controller/Product")
const router=express.Router()


router.post("/create",productController.create)
router.get("/",productController.getAll)
router.get("/details/:id",productController.getById)
router.patch("/:id",productController.updateById)
router.patch("/undelete/:id",productController.undeleteById)
router.delete("/:id",productController.deleteById)
router.get('/getfeatured',productController.getFeature)

module.exports=router