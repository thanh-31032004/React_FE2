import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductCart } from 'src/hooks/useProductCarts';
import axios from 'axios';

interface LoginForm {
    email: string;
    password: string;
}

const LoginPage = () => {
    const { getCartUser } = useProductCart();
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        try {
            setError(null);
            const response = await axios.post('/auth/login', data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            getCartUser();

            toast.success('Logged in successfully!', {
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

            setTimeout(() => {
                navigate('/', { state: { user: response.data.user } });
            }, 1000);
        } catch (error) {
            setError('Please try again.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    mt: 3,
                    mb: 3,
                    p: 3,
                    backgroundColor: '#BED7DC',
                    borderRadius: '8px',
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    id="email"
                    label="Email"
                    type="email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email address',
                        },
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    id="password"
                    label="Password"
                    type="password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters long',
                        },
                    })}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                />

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Login
                </Button>
            </Box>
        </Container>
    );
};

export default LoginPage;
