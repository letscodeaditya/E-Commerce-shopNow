const Category=require("../Model/Category");
const Product = require("../Model/Product");

exports.getAll=async(req,res)=>{
    try {
        const result=await Category.find({})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error fetching categories"})
    }
}
exports.getProductByCategory = async (req, res) => {
    try {
      const categoryName = req.params.categoryName;
  
      const category = await Category.findOne({ name: categoryName });
      
      if (!category) {
        return res.status(404).json({ message: `Category '${categoryName}' not found` });
      }
  
      const products = await Product.find({ category: category._id });
  
      if (products.length === 0) {
        return res.status(404).json({ message: `No products found in category: ${categoryName}` });
      }
  
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: `Error fetching products: ${err.message}` });
    }
  };
  

exports.addCategory=async(req,res)=>{
    const {name, pic} = req.body;
    if (!name || !pic) {
        return res.status(400).json({ message: 'Please provide required fields.' });
    }

    try {        
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({ message: 'categ Category already exists.' });
        }
        const category = await Category.create(req.body);
        return res.status(201).json({ message: 'categ Category created successfully.' });
    } catch (error) {
        console.error('Error during:', error); 
        return res.status(500).json({ message: 'Internal server error' });
    }
}


