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
            <Container sx={{ padding: '40px 20px', maxWidth: '1200px', margin: '60px auto' }}>
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
                        gridTemplateColumns: '2fr 1fr 1fr 1fr 0.5fr',
                        gap: '10px',
                        border: '1px solid #ccc',
                        padding: '15px',
                        justifyItems: 'center',
                        borderRadius: '8px',
                        paddingRight: '36px',
                        marginBottom: '20px',
                        fontWeight: 600,
                        color: '#fff',
                        backgroundColor: '#3E5879',
                    }}
                >
                    <Typography sx={{ fontWeight: '700' }}>Product</Typography>
                    <Typography sx={{ fontWeight: '700', textAlign: 'right', paddingRight: "10px" }}>Price</Typography>
                    <Typography sx={{ fontWeight: '700', textAlign: 'right' }}>Quantity</Typography>
                    <Typography sx={{ fontWeight: '700', textAlign: 'right' }}>Subtotal</Typography>
                    <Typography></Typography>
                </Stack>

                <Stack spacing={2} mt={2}>
                    {cart?.products.map((item, index) => (
                        <CartItem key={index}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <img src={item.product.image} alt={item.product.title} width="100" style={{ borderRadius: '8px' }} />
                                <Typography sx={{ fontWeight: 500, color: '#333' }}>
                                    {item.product.title.substring(0, 40)}...
                                </Typography>
                            </Stack>
                            <Typography sx={{ fontWeight: 500, color: '#333', textAlign: 'right' }}>{item.product.price}$</Typography>
                            <Typography sx={{ fontWeight: 500, color: '#333', textAlign: 'right' }}>{item.quantity}</Typography>
                            <Typography sx={{ fontWeight: 500, color: '#333', textAlign: 'right' }}>{(item.product.price * item.quantity).toFixed(2)}$</Typography>
                            <IconButton onClick={() => removeToCart(item.product._id)} sx={{ color: '#d32f2f' }}>
                                <DeleteIcon />
                            </IconButton>
                        </CartItem>
                    ))}
                </Stack>

                <Summary>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                        Total: {totalPrice.toLocaleString()}$
                    </Typography>
                </Summary>

                <ActionButtons>
                    <Link to="/checkout">
                        <Button sx={{
                            backgroundColor: '#B7E0FF',
                            color: '#fff',
                            borderRadius: '25px',
                            padding: '10px 20px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            transition: 'background-color 0.3s ease',
                            '&:hover': { backgroundColor: '#0E46A3' },
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
    marginBottom: '30px',
    fontFamily: 'Roboto, sans-serif',
    color: '#1976d2',
});

const CartItem = styled(Stack)({
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 0.5fr',
    gap: '15px',
    border: '1px solid #ccc',
    alignItems: 'center',

    padding: '20px',
    justifyItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '15px',
    '& > *:nth-child(2), & > *:nth-child(3), & > *:nth-child(4)': {
        textAlign: 'right',
        color: '#333',
        fontFamily: 'Roboto, sans-serif',
    },
});

const Summary = styled('div')({
    backgroundColor: '#3E5879',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '25px',
    textAlign: 'right',
    fontFamily: 'Roboto, sans-serif',
    color: '#00796b',
});

const ActionButtons = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '25px',
    '& a': {
        textDecoration: 'none',
    },
    '& button': {
        backgroundColor: '#378CE7',
        color: '#fff',
        borderRadius: '25px',
        padding: '10px 20px',
        fontWeight: 600,
        textTransform: 'uppercase',
        transition: 'background-color 0.3s ease',
        '&:hover': { backgroundColor: '#A3D8FF' },
    },
});