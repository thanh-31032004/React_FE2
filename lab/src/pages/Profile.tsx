import { useEffect, useState } from 'react';
import { Container, Typography, Stack, Divider, Box } from '@mui/material';
import axios from 'axios';
import { useUser } from 'src/context/user';
import { Product } from 'src/types/Product';

const ProfilePage = () => {
    const { user } = useUser();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        if (user) {
            const fetchOrders = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`/orders`);
                    const userOrders = response.data.filter((order: any) => order.user === user._id);
                    setOrders(userOrders);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchOrders();
        }
    }, [user]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
    if (loading) return <Typography>Loading...</Typography>;

    const paidOrders = orders.filter(order => order.user === user?._id);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 10, fontFamily: 'Arial, sans-serif', color: '#333' }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                Profile
            </Typography>
            <Typography variant="h6" gutterBottom>
                Username: {user?.username || 'N/A'}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Email: {user?.email || 'N/A'}
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                Purchase History
            </Typography>
            {paidOrders.length === 0 ? (
                <Typography>No paid orders found.</Typography>
            ) : (
                paidOrders.map((order: any, index: number) => (
                    <Box key={index} sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                        <Typography variant="h6" sx={{ color: '#1976d2' }}>Order code: {order._id}</Typography>
                        <Typography>Order date: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                        <Typography>Recipient Name: {order.name}</Typography>
                        <Typography>Recipient Address: {order.address}</Typography>
                        <Typography>Recipient Phone: {order.phone}</Typography>
                        <Typography>Payment: {order.payment}</Typography>
                        {order.products.map((item: any, idx: number) => {
                            const matchingProduct = products.find(product => product._id === item.product);
                            return matchingProduct ? (
                                <Stack key={idx} direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                                    <img
                                        src={matchingProduct.image}
                                        alt={matchingProduct.title}
                                        width="80"
                                        style={{ borderRadius: '8px', border: '1px solid #ddd' }}
                                    />
                                    <Stack>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{matchingProduct.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {matchingProduct.price}$ x {item.quantity}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            ) : null;
                        })}
                        <Typography variant="h6" color="textPrimary" sx={{ mt: 2 }}>
                            Total: {order.totalPrice.toLocaleString()}$
                        </Typography>
                    </Box>
                ))
            )}
        </Container>
    );
};

export default ProfilePage;