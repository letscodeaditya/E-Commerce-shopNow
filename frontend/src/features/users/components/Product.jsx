import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductForm = () => {
    const [productData, setProductData] = useState({
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      category: "",
      brand: "",
      stockQuantity: 0,
      thumbnail: "",
      images: [],
      postedBy: "",
    });
  
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
  
    const [thumbnailFile, setThumbnailFile] = useState(null); 
    const [imageFiles, setImageFiles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = import.meta.env.VITE_API_BASE_URL;

  
    useEffect(() => {
      const fetchCategoriesAndBrands = async () => {
        try {
          const categoryResponse = await axios.get(`${api}/api/categories/getcategory`);
          const brandResponse = await axios.get(`${api}/api/brands/getbrand`);
          setCategories(categoryResponse.data);
          setBrands(brandResponse.data);
        } catch (error) {
          toast.error("Error fetching categories or brands.");
          console.error("Error fetching categories or brands:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCategoriesAndBrands();
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProductData({ ...productData, [name]: value });
    };
  
    const handleThumbnailChange = (e) => {
      setThumbnailFile(e.target.files[0]);
    };
  
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 5) {
        toast.error("You can only upload up to 5 images.");
        return;
      }
      setImageFiles(files);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      if(!productData.title || !productData.description || !productData.price || !productData.discountPercentage || !productData.category || !productData.brand || !productData.stockQuantity){
        toast.error("fill all fields");
      }
  
      const formData = new FormData();
      formData.append("thumbnail", thumbnailFile);
      imageFiles.forEach((file) => formData.append("images", file));
  
      try {
        const response = await axios.post(`${api}/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        const { thumbnailUrl, imageUrls } = response.data;
  
        const finalProductData = {
          ...productData,
          thumbnail: thumbnailUrl,
          images: imageUrls,
          postedBy: user.userDetail.id,
        };
  
        const productResponse = await axios.post(`${api}/api/products/create`, finalProductData);
        setLoading(false);
        toast.success("Product created successfully!");
      } catch (error) {
        toast.error("Error creating product.");
        console.error("Error creating product:", error);
      }
    };
  
    if (loading) {
      return (
        <Container sx={{ mt: 15,backgroundColor: "white",
            padding: "30px",
            border: "2px solid black",
            borderRadius: "20px", height:"500px" }}>
          <Skeleton count={5} style={{height:'50px',marginTop:'20px'}} />
        </Container>
      );
    }
  
    return (
      <Container
        sx={{
          mt: 15,
          backgroundColor: "white",
          padding: "30px",
          border: "2px solid black",
          borderRadius: "20px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add New Product
        </Typography>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Title"
                name="title"
                fullWidth
                value={productData.title}
                onChange={handleChange}
                required
              />
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                multiline
                rows={4}
                fullWidth
                value={productData.description}
                onChange={handleChange}
                required
              />
            </Grid>
  
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                value={productData.price}
                onChange={handleChange}
                required
              />
            </Grid>
  
            <Grid item xs={12} sm={6}>
              <TextField
                label="Discount Percentage"
                name="discountPercentage"
                type="number"
                fullWidth
                value={productData.discountPercentage}
                onChange={handleChange}
              />
            </Grid>
  
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select name="category" value={productData.category} onChange={handleChange}>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
  
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Brand</InputLabel>
                <Select name="brand" value={productData.brand} onChange={handleChange}>
                  {brands.map((brand) => (
                    <MenuItem key={brand._id} value={brand._id}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
  
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock Quantity"
                name="stockQuantity"
                type="number"
                fullWidth
                value={productData.stockQuantity}
                onChange={handleChange}
                required
              />
            </Grid>
  
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Upload Thumbnail (1 image only)
              </Typography>
              <input name="thumbnail" type="file" onChange={handleThumbnailChange} required />
            </Grid>
  
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Upload up to 5 images
              </Typography>
              <input type="file" multiple onChange={handleImageChange} required name="images" />
            </Grid>
  
            <Grid item xs={12}>
            {!loading?
              <Button type="submit" variant="contained" color="primary">
                Submit Product
              </Button>:
                <Button type="submit" variant="contained" color="primary" disabled>
              loading
            </Button>
            }
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  };
  
  export default ProductForm;
  