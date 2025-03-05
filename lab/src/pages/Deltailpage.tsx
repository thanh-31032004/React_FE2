import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "src/types/Product";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Alert, Button, Container, IconButton, Stack, TextField, Typography, Box } from "@mui/material";
import Loading from "src/components/Loading";
import { useProductCart } from "src/hooks/useProductCarts";
import LoginPromptDialog from "src/components/Comfirmdialog";


function ProductDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<Product | undefined>();
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { addToCart } = useProductCart();

    const handleAddToCart = (product: Product) => {
        const token = localStorage.getItem('user');
        if (!token) {
            setOpen(true);
            return;
        }
        if (quantity <= 0) return;
        addToCart({ product, quantity });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getProduct = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.get(`http://localhost:3000/products/${id}`);
            setProduct(data);
        } catch (error) {
            console.log(error);
            setError('Failed to load products. Please try again.');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    useEffect(() => {
        if (!id) return;
        getProduct(id);
    }, [id, navigate]);

    return (
        <>
            <Loading isShow={loading} />
            <Container sx={{ mt: 12, mb: 24 }}>
                <Typography variant="h4" gutterBottom>
                    Product Details
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}
                {product && (
                    <Stack direction={{ xs: 'column', md: 'row' }} gap={3} alignItems={{ xs: 'center', md: 'flex-start' }}>
                        <Box sx={{ width: '100%', maxWidth: '400px', textAlign: 'center', border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
                            <img
                                src={product.image}
                                alt={product.title}
                                width={"100%"}
                                style={{ objectFit: 'contain', height: 'auto' }}
                            />
                        </Box>
                        <Stack gap={3} sx={{ width: '100%', maxWidth: '600px' }}>
                            <Typography component="h1" fontSize={"26px"} fontWeight="bold">
                                {product.title}
                            </Typography>
                            <Typography fontWeight={"bold"} color={"#ff5722"} fontSize={"24px"}>
                                ${product.price}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#666' }}>
                                {product.description}
                            </Typography>
                            <Stack direction="row" alignItems="center" gap={2}>
                                <IconButton onClick={() => setQuantity(quantity === 0 ? 0 : quantity - 1)} disabled={quantity <= 1}>
                                    <RemoveIcon />
                                </IconButton>
                                <TextField
                                    id="outlined-basic"
                                    label="Quantity"
                                    variant="outlined"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    sx={{ width: '80px' }}
                                />
                                <IconButton onClick={() => setQuantity(quantity + 1)}>
                                    <AddIcon />
                                </IconButton>
                            </Stack>
                            <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)} sx={{ textTransform: 'none' }}>
                                Add to Cart
                            </Button>
                        </Stack>
                    </Stack>
                )}
            </Container>
            <LoginPromptDialog open={open} onClose={handleClose} />
        </>
    );
}

export default ProductDetail;