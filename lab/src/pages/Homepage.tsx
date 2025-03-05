import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Alert, Container, Pagination } from '@mui/material';
import ProductCard from 'src/components/ProductCard';
import axios from 'axios';
import { Product } from 'src/types/Product';
import { useLoading } from 'src/context/loading';

function Homepage() {
    const [products, setProducts] = useState<Product[]>([]);
    const { setLoading } = useLoading();
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(8); // Number of items per page

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

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <>
            <Container sx={{ mt: 8, mb: 8 }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Danh sách sản phẩm
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}
                <Grid container spacing={3} justifyContent="center">
                    {paginatedProducts
                        .filter(product => product.isShow !== false)
                        .map((product, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                </Grid>
                {products.length > itemsPerPage && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                        <Pagination
                            count={Math.ceil(products.length / itemsPerPage)}
                            page={page}
                            onChange={handleChangePage}
                            color="primary"
                        />
                    </Box>
                )}
            </Container>
        </>
    );
}

export default Homepage;