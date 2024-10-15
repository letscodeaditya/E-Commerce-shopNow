const Category=require("../Model/Category")

exports.getAll=async(req,res)=>{
    try {
        const result=await Category.find({})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error fetching categories"})
    }
}

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


// try {
//   const categoryName = req.params.categoryName;
//   const products = await Product.find({ category: categoryName }); 
//   res.json(products);
// } catch (err) {
//   res.status(500).json({ message: err.message });
// }