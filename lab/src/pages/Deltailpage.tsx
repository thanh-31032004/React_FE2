import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "src/types/Product";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Alert, Button, Container, IconButton, Stack, TextField, Typography } from "@mui/material";
import Loading from "src/components/Loading";
import { useProductCart } from "src/hooks/useProductCarts";




function ProductDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<Product | undefined>();
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { addToCart } = useProductCart();



    const handleAddToCart = (product: Product) => {
        if (quantity <= 0) return;
        // toast.success('Successfully!', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored",
        //     transition: Bounce,
        // });
        addToCart({ product, quantity });
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
            // navigate('/notfound');
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
            <Container sx={{ mt: 4, marginBottom: 10 }}>
                <Typography variant="h4" gutterBottom>
                    Chi tiết sản phẩm
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}
                {product && (
                    <Stack direction={{ xs: 'column', md: 'row' }} gap={3} alignItems={{ xs: 'center', md: 'flex-start' }}>
                        <img
                            src={product.image}
                            alt={product.title}
                            width={"100%"}
                            style={{ maxWidth: '500px', objectFit: 'contain' }}
                        />
                        <Stack gap={3} sx={{ width: '100%', maxWidth: '600px' }}>
                            <Typography component="h1" fontSize={"26px"} fontWeight="bold">
                                {product.title}
                            </Typography>
                            <Typography fontWeight={"bold"} color={"Highlight"} fontSize={"24px"}>
                                ${product.price}
                            </Typography>
                            {/* <Typography fontSize={"20px"} color="textSecondary">
                                {product.category}
                            </Typography> */}
                            {/* <Typography fontSize={"20px"} color="textSecondary">
                                Rate: {product.rating.count}
                            </Typography> */}
                            <Typography variant="body1">
                                {product.description}
                            </Typography>
                            <Stack direction="row" alignItems="center" gap={2}>
                                <IconButton onClick={() => setQuantity(quantity === 0 ? 0 : quantity - 1)} disabled={quantity <= 1}>
                                    <RemoveIcon />
                                </IconButton>
                                <TextField
                                    id="outlined-basic"
                                    label="quantity"
                                    variant="outlined"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                />
                                <IconButton onClick={() => setQuantity(quantity + 1)}>
                                    <AddIcon />
                                </IconButton>
                            </Stack>
                            <Button variant="outlined" onClick={() => handleAddToCart(product)}>Add to cart</Button>
                        </Stack>
                    </Stack>
                )}
            </Container>
        </>
    );
}

export default ProductDetail;