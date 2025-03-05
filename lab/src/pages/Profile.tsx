import { useEffect, useState } from 'react';
import { Container, Typography, Stack, Divider } from '@mui/material';
import axios from 'axios';
import { useUser } from 'src/context/user';

const ProfilePage = () => {
    const { user } = useUser();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (user) {
            const fetchOrders = async () => {
                try {

                    const response = await axios.get(`/orders/user/${user._id}`);
                    setOrders(response.data);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchOrders();
        }
    }, [user]);

    if (loading) return <Typography>Loading...</Typography>;


    const paidOrders = orders.filter(order => order.status === 'paid');

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 10 }}>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            <Typography variant="h6" gutterBottom>
                Username: {user?.username || 'N/A'}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Email: {user?.email || 'N/A'}
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom>
                Purchase History
            </Typography>
            {paidOrders.length === 0 ? (
                <Typography>No paid orders found.</Typography>
            ) : (
                paidOrders.map((order: any, index: number) => (
                    <Stack key={index} spacing={2} mb={4}>
                        <Typography variant="h6">Order #{order._id}</Typography>
                        {order.products.map((item: any, idx: number) => (
                            <Stack key={idx} direction="row" spacing={2} alignItems="center">
                                <img
                                    src={item.product.image}  // Ensure the image URL is correct
                                    alt={item.product.title}
                                    width="80"
                                    style={{ borderRadius: '8px' }}
                                />
                                <Stack>
                                    <Typography variant="body1">{item.product.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {item.product.price}đ x {item.quantity}
                                    </Typography>
                                </Stack>
                            </Stack>
                        ))}
                        <Typography variant="h6" color="textPrimary">
                            Total: {order.totalPrice.toLocaleString()} VND
                        </Typography>
                    </Stack>
                ))
            )}
        </Container>
    );
};

export default ProfilePage;