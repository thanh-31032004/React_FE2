import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Alert } from '@mui/material';
import ProductCard from 'src/components/ProductCard';
import axios from 'axios';

import { Product } from 'src/types/Product';
import { useLoading } from 'src/context/loading';

function Homepage() {
    const [products, setProducts] = useState<Product[]>([]);
    const { setLoading } = useLoading();
    const [error, setError] = useState<string | null>(null);

    const getAllProduct = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:3000/products");
            setProducts(data);
            setError(null);
        } catch (error) {
            console.log(error);
            setError('Failed to load products. Please try again.');

        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    useEffect(() => {
        getAllProduct();
    }, []);

    return (
        <>

            <Box sx={{ mt: 8, p: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Danh sách sản phẩm
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}
                <Grid container spacing={3} justifyContent="center">
                    {products
                        .filter(product => product.isShow != false)
                        .map((product, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                </Grid>
            </Box>
        </>
    );
}

export default Homepage;
