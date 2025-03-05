import { useMemo } from 'react';
import {
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
    styled,
    Box,
    Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useLoading } from 'src/context/loading';
import { useCart } from 'src/context/cart';
import { useUser } from 'src/context/user';
import { useProductCart } from 'src/hooks/useProductCarts';
import { Bounce, toast } from 'react-toastify';

type CheckoutFormParams = {
    name: string;
    phone: string;
    address: string;
    payment: string;
};

const Sidebar = styled(Paper)({
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

const ProductList = styled(Box)({
    marginBottom: '20px',
});

function Checkout() {
    const nav = useNavigate();
    const { setLoading } = useLoading();
    const { cart } = useCart();
    const { user } = useUser();
    const { getCartUser } = useProductCart();

    const totalPrice = useMemo(
        () =>
            cart
                ? cart.products.reduce(
                    (total, { product, quantity }) => total + product.price * quantity,
                    0
                )
                : 0,
        [cart]
    );

    const { handleSubmit, control, setError } = useForm<CheckoutFormParams>({
        defaultValues: {
            payment: 'COD',
        },
    });

    const onSubmit = async (values: CheckoutFormParams) => {
        if (!user || !cart || !cart?.products.length) return;
        if (window.confirm("Xác nhận mua hàng")) {
            try {
                setLoading(true);
                const response = await axios.post('/orders', {
                    ...values,
                    products: cart.products,
                    user: user._id,
                    totalPrice,
                });

                if (response.status === 400) {
                    setError('name', { type: 'manual', message: 'Name is required' });
                    setError('phone', { type: 'manual', message: 'Invalid phone number' });
                    return;
                }

                await getCartUser();
                toast.success('Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                nav('/');
            } catch (error) {
                alert('An error occurred during checkout');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 16, mb: 16 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h4" color="textPrimary" mb={4}>
                            Checkout
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={3}>
                                <FormLabel>Recipient information</FormLabel>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            label="Name"
                                            fullWidth
                                            variant="outlined"
                                            required
                                            error={Boolean(fieldState.error)}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            label="Phone"
                                            fullWidth
                                            variant="outlined"
                                            required
                                            error={Boolean(fieldState.error)}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="address"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            label="Address"
                                            fullWidth
                                            variant="outlined"
                                            required
                                            error={Boolean(fieldState.error)}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                                <FormControl fullWidth>
                                    <FormLabel>Payment Method</FormLabel>
                                    <Controller
                                        name="payment"
                                        control={control}
                                        render={({ field }) => (
                                            <RadioGroup {...field}>
                                                <FormControlLabel
                                                    value="COD"
                                                    control={<Radio />}
                                                    label="Cash on Delivery"
                                                />
                                            </RadioGroup>
                                        )}
                                    />
                                </FormControl>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    sx={{
                                        padding: '12px 0',
                                        borderRadius: '8px',
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                    }}
                                >
                                    Payment
                                </Button>
                            </Stack>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Sidebar>
                        <Typography variant="h6" gutterBottom>
                            Purchased Products
                        </Typography>
                        <ProductList>
                            {cart?.products.map(({ product, quantity }, index) => (
                                <Stack key={index} direction="row" spacing={2} mb={2} alignItems="center">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        width="80"
                                        style={{ borderRadius: '8px' }}
                                    />
                                    <Stack>
                                        <Typography variant="body1">{product.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {product.price}$ x {quantity}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            ))}
                        </ProductList>
                        <Typography variant="h5" color="textPrimary" textAlign="center">
                            Total Price: {totalPrice.toLocaleString()}$
                        </Typography>
                    </Sidebar>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Checkout;