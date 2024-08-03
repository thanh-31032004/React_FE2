import { useEffect, useState } from 'react';
import {
    Button,
    Container,
    IconButton,
    Stack,
    Typography,
    styled,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useCart } from 'src/context/cart';
import { useProductCart } from 'src/hooks/useProductCarts';

const Cart = () => {
    const { cart } = useCart();
    const { removeToCart } = useProductCart();
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = () => {
        let total = 0;
        cart?.products.forEach((item) => {
            total += item.product.price * item.quantity;
        });
        return total;
    };

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [cart]);

    return (
        <>
            <Container sx={{ padding: '40px 20px', maxWidth: '1200px', margin: 'auto' }}>
                <Header>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#333' }}>
                        Shopping Cart
                    </Typography>
                </Header>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr 1fr 0.5fr',
                        gap: '10px',
                        backgroundColor: '#f4f4f4',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontWeight: 600,
                        color: '#555',
                    }}
                >
                    <Typography>Product</Typography>
                    <Typography>Price</Typography>
                    <Typography>Quantity</Typography>
                    <Typography>Subtotal</Typography>
                    <Typography></Typography>
                </Stack>

                <Stack spacing={2} mt={2}>
                    {cart?.products.map((item, index) => (
                        <CartItem key={index}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <img src={item.product.image} alt={item.product.title} width="100" style={{ borderRadius: '8px' }} />
                                <Typography sx={{ fontWeight: 500, color: '#333' }}>
                                    {item.product.title.substring(0, 10)}...
                                </Typography>
                            </Stack>
                            <Typography sx={{ fontWeight: 500, color: '#333' }}>{item.product.price}$</Typography>
                            <Typography sx={{ fontWeight: 500, color: '#333' }}>{item.quantity}</Typography>
                            <Typography sx={{ fontWeight: 500, color: '#333' }}>{item.product.price * item.quantity}$</Typography>
                            <IconButton onClick={() => removeToCart(item.product._id)} sx={{ color: '#d32f2f' }}>
                                <DeleteIcon />
                            </IconButton>
                        </CartItem>
                    ))}
                </Stack>

                <Summary>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
                        Total: {totalPrice.toLocaleString()}$
                    </Typography>
                </Summary>

                <ActionButtons>
                    <Link to="/checkout">
                        <Button sx={{
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            borderRadius: '25px',
                            padding: '10px 20px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            transition: 'background-color 0.3s ease',
                            '&:hover': { backgroundColor: '#1565c0' },
                        }}>
                            Continue to Payment
                        </Button>
                    </Link>
                </ActionButtons>
            </Container>
        </>
    );
};

export default Cart;

const Header = styled('div')({
    textAlign: 'center',
    marginBottom: '40px',
});

const CartItem = styled(Stack)({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 0.5fr',
    gap: '10px',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
});

const Summary = styled('div')({
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
    textAlign: 'right',
});

const ActionButtons = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
});
