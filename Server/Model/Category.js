const mongoose=require("mongoose")
const {Schema}=mongoose


const categorySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    pic: {
        type: String, 
    },
}, { timestamps: true });

module.exports=mongoose.model("Category",categorySchema)


// const categorySchema = new Schema({
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//     },
//     image: {
//       type: String, // Image URL for category
//     },
//   }, { timestamps: true });
  
//   module.exports = mongoose.model('Category', categorySchema);