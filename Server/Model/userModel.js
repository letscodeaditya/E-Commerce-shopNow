const mongoose = require('mongoose');

const defaultImages = {
    seller: [
      "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/mqrt2vsiu0rks9gxz0if.png",
      "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/murqweh6j35pscp7hkml.png",
      "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/dbttvdwylxks6hxgybkx.png",
    ],
    buyer: [
      "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/kl2kpiuyhv9z5gbvp111.png",
      "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/q5kryu8iz6bvkrzsip2d.png",
    ]
  };

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, 
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    userType: {
        type: String,
        required: true,
        enum: ["seller", "buyer"]
    },    
    pic: {
        type: String,
        default: function () {
          // Get the array of image paths based on the user's gender
          const images = defaultImages[this.userType];
          // Select a random image path from the array
          const randomIndex = Math.floor(Math.random() * images.length);
          return images[randomIndex];
        },
    },
}, {
    timestamps: true, 
});


const User = mongoose.model("User", userSchema);

module.exports = User;
