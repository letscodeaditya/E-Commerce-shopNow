const express = require("express");
const connectDb = require("./config/db");
const userRouter = require('./router/user'); 
const productRoutes = require("./router/Product")
const uploadRoutes = require("./router/Upload")
const brandRoutes = require('./router/Brand')
const categoryRoutes = require('./router/Category')
const dotenv = require('dotenv');
const cors = require("cors");


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
app.use('/api/auth', userRouter);
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use('/api/upload', uploadRoutes);



const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
