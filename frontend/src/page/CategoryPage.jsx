import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

const CategoryPage = () => {
    const { categoryName } = useParams(); 
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('lowToHigh');
    const [loading, setLoading] = useState(true);
    const [emptyCategory, setEmptyCategory] = useState(false);
    const nav = useNavigate();
    const api = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${api}/api/categories/getproductbycategory/${categoryName}`);
                console.log(response.data)
                if(!response.data.message){
                    setProducts(response.data);
                    setLoading(false);
                }else{
                    setLoading(false);
                    setEmptyCategory(true);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
                setEmptyCategory(true);
            }
        };
        fetchProducts();
    }, [categoryName]);

    // Function to handle sorting
    const sortedProducts = [...products].sort((a, b) => {
        return sortOrder === 'lowToHigh' ? a.price - b.price : b.price - a.price;
    });

    const openProduct = (id)=>{
        nav(`/products/details/${id}`)
    }

    return (
        <Box sx={{ padding: 3, display: 'flex',bgcolor:'white',mt:10, borderRadius:'20px', height:'90vh'}}>
            <Box sx={{ width: '25%', paddingRight: 2 }}>
                <Typography variant="h6">Filter</Typography>
                <FormControl fullWidth variant="outlined" sx={{ marginTop: 2 }}>
                    <InputLabel>Sort by Price</InputLabel>
                    <Select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        label="Sort by Price"
                    >
                        <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
                        <MenuItem value="highToLow">Price: High to Low</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ width: '75%' }}>
                <Typography variant="h4" sx={{ marginBottom: 3 }}>
                    {categoryName}
                </Typography>

                <Grid container spacing={3}>
                    {loading ? (
                       
                        Array.from(new Array(2)).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ border: '3px solid black', padding: 2, borderRadius: '30px' }}>
                                    <Skeleton variant="rectangular" width="100%" height={140} />
                                    <CardContent>
                                        <Skeleton variant="text" width="80%" />
                                        <Skeleton variant="text" width="60%" sx={{ marginTop: 2 }} />
                                        <Skeleton variant="text" width="40%" sx={{ marginTop: 2 }} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                        
                    ) : (
                        emptyCategory? (
                            <Grid item xs={12}>
                                <Typography variant="h6" color="text.secondary" align="center">
                                    No products found for this category.
                                </Typography>
                            </Grid>
                        )

                        :sortedProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product._id}>
                                <Card sx={{ border: '2px solid black',padding:1, borderRadius: '30px',cursor:'pointer' }} onClick={()=>openProduct(product._id)}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={product.thumbnail}
                                        alt={product.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h5">{product.title}</Typography>
                                        <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
                                            Price: {product.price}rs
                                        </Typography>
                                        <Typography variant="h5">{product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                    ))
                  
                )}
                </Grid>
            </Box>
        </Box>
    );
};

export default CategoryPage;
