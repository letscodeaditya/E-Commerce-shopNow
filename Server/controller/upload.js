const AWS = require('aws-sdk');
const multer = require('multer');

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Configure Multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

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

// Route to handle multiple image uploads including thumbnail
const uploadImages = async (req, res) => {
    const { files } = req;
    
    if (!files.thumbnail || !files.images) {
        return res.status(400).json({ error: 'Thumbnail or images are missing' });
    }

    try {
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
};

module.exports = {
    upload,
    uploadImages,
};
