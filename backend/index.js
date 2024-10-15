const express = require("express");
const connectDb = require("./config/db");
const userRouter = require('./router/user'); 
const productRoutes = require("./router/Product")
const brandRoutes = require('./router/Brand')
const categoryRoutes = require('./router/Category')
const dotenv = require('dotenv');
const cors = require("cors");
const multer = require('multer');
const AWS = require('aws-sdk');

dotenv.config();

connectDb();

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173", "https://e-comm-shop-now.vercel.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api', userRouter);
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);

// Configure Multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Route to handle multiple image uploads including thumbnail
app.post('/api/upload', upload.fields([
    { name: 'thumbnail', maxCount: 1 },  // For thumbnail
    { name: 'images', maxCount: 5 }      // For multiple images
]), async (req, res) => {
    const { files } = req;
    
    if (!files.thumbnail || !files.images) {
        return res.status(400).json({ error: 'Thumbnail or images are missing' });
    }

    try {
        // Function to upload files to S3
        const uploadToS3 = (file) => {
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: `${Date.now()}_${file.originalname}`, // Unique file name
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read', // Make the file publicly readable
            };
            return s3.upload(params).promise();
        };

        // Upload thumbnail
        const thumbnailResult = await uploadToS3(files.thumbnail[0]);

        // Upload all images
        const imageUploadPromises = files.images.map(uploadToS3);
        const imageResults = await Promise.all(imageUploadPromises);

        // Collect URLs from the uploaded files
        const thumbnailUrl = thumbnailResult.Location;
        const imageUrls = imageResults.map(result => result.Location);

        return res.status(200).json({ thumbnailUrl, imageUrls });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to upload images', details: error.message });
    }
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
