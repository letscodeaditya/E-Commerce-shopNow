import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "idle",
    productUpdateStatus: 'idle',
    productAddStatus: "idle",
    productFetchStatus: "idle",
    products: [],
    totalResults: 0,
    isFilterOpen: false,
    selectedProduct: null,
    errors: null,
    successMessage: null
}

// Base URL of your API
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const addProductAsync = createAsyncThunk("products/addProductAsync", async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data; 
});

export const fetchProductsAsync = createAsyncThunk("products/fetchProductsAsync", async (filters) => {
    const response = await axios.get(API_URL, { params: filters }); 
    return response.data; 
});

export const fetchProductByIdAsync = createAsyncThunk("products/fetchProductByIdAsync", async (id) => {
    const response = await axios.get(`${API_URL}/${id}`); 
    return response.data; 
});

export const updateProductByIdAsync = createAsyncThunk("products/updateProductByIdAsync", async (update) => {
    const response = await axios.put(`${API_URL}/${update._id}`, update); // Update product by ID
    return response.data; // Return the updated product data
});

export const undeleteProductByIdAsync = createAsyncThunk("products/undeleteProductByIdAsync", async (id) => {
    const response = await axios.patch(`${API_URL}/${id}/undelete`); // Undelete product by ID
    return response.data; // Return the undeleted product data
});

export const deleteProductByIdAsync = createAsyncThunk("products/deleteProductByIdAsync", async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`); // Delete product by ID
    return response.data; // Return the deleted product data
});

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        clearProductErrors: (state) => {
            state.errors = null;
        },
        clearProductSuccessMessage: (state) => {
            state.successMessage = null;
        },
        resetProductStatus: (state) => {
            state.status = 'idle';
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        resetProductUpdateStatus: (state) => {
            state.productUpdateStatus = 'idle';
        },
        resetProductAddStatus: (state) => {
            state.productAddStatus = 'idle';
        },
        toggleFilters: (state) => {
            state.isFilterOpen = !state.isFilterOpen;
        },
        resetProductFetchStatus: (state) => {
            state.productFetchStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProductAsync.pending, (state) => {
                state.productAddStatus = 'pending';
            })
            .addCase(addProductAsync.fulfilled, (state, action) => {
                state.productAddStatus = 'fulfilled';
                state.products.push(action.payload);
            })
            .addCase(addProductAsync.rejected, (state, action) => {
                state.productAddStatus = 'rejected';
                state.errors = action.error.message; // Use message for a better error description
            })

            .addCase(fetchProductsAsync.pending, (state) => {
                state.productFetchStatus = 'pending';
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.productFetchStatus = 'fulfilled';
                state.products = action.payload.data; // Adjust according to your API response structure
                state.totalResults = action.payload.totalResults; // Adjust according to your API response structure
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.productFetchStatus = 'rejected';
                state.errors = action.error.message;
            })

            .addCase(fetchProductByIdAsync.pending, (state) => {
                state.productFetchStatus = 'pending';
            })
            .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
                state.productFetchStatus = 'fulfilled';
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductByIdAsync.rejected, (state, action) => {
                state.productFetchStatus = 'rejected';
                state.errors = action.error.message;
            })

            .addCase(updateProductByIdAsync.pending, (state) => {
                state.productUpdateStatus = 'pending';
            })
            .addCase(updateProductByIdAsync.fulfilled, (state, action) => {
                state.productUpdateStatus = 'fulfilled';
                const index = state.products.findIndex((product) => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload; // Update the product in the state
                }
            })
            .addCase(updateProductByIdAsync.rejected, (state, action) => {
                state.productUpdateStatus = 'rejected';
                state.errors = action.error.message;
            })

            .addCase(undeleteProductByIdAsync.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(undeleteProductByIdAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                const index = state.products.findIndex((product) => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload; // Update the undeleted product in the state
                }
            })
            .addCase(undeleteProductByIdAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.errors = action.error.message;
            })

            .addCase(deleteProductByIdAsync.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(deleteProductByIdAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                const index = state.products.findIndex((product) => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload; // Mark the product as deleted in the state
                }
            })
            .addCase(deleteProductByIdAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.errors = action.error.message;
            });
    }
});

// Exporting selectors
export const selectProductStatus = (state) => state.ProductSlice.status;
export const selectProducts = (state) => state.ProductSlice.products;
export const selectProductTotalResults = (state) => state.ProductSlice.totalResults;
export const selectSelectedProduct = (state) => state.ProductSlice.selectedProduct;
export const selectProductErrors = (state) => state.ProductSlice.errors;
export const selectProductSuccessMessage = (state) => state.ProductSlice.successMessage;
export const selectProductUpdateStatus = (state) => state.ProductSlice.productUpdateStatus;
export const selectProductAddStatus = (state) => state.ProductSlice.productAddStatus;
export const selectProductIsFilterOpen = (state) => state.ProductSlice.isFilterOpen;
export const selectProductFetchStatus = (state) => state.ProductSlice.productFetchStatus;

// Exporting actions
export const {
    clearProductSuccessMessage,
    clearProductErrors,
    clearSelectedProduct,
    resetProductStatus,
    resetProductUpdateStatus,
    resetProductAddStatus,
    toggleFilters,
    resetProductFetchStatus
} = productSlice.actions;

export default productSlice.reducer;
