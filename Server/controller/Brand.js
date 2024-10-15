const Brand=require("../model/Brand")

exports.getAll=async(req,res)=>{
    try {
        const result=await Brand.find({})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error fetching brands"})
    }
}
exports.addBrand=async(req,res)=>{
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Please provide required fields.' });
    }

    try {        
        const brandExists = await Brand.findOne({ name });
        if (brandExists) {
            return res.status(400).json({ message: 'brand already exists.' });
        }
        const brand = await Brand.create(req.body);
        return res.status(201).json({ message: 'brand created successfully.' });
    } catch (error) {
        console.error('Error during sign up:', error); 
        return res.status(500).json({ message: 'Internal server error' });
    }
}