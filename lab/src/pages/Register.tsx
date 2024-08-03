
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';


type RegisterFormParams = {
    username: string;
    email: string;
    password: string;

};
const RegisterPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, } = useForm<RegisterFormParams>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<RegisterFormParams> = async (data) => {
        try {
            setError(null);
            const response = await axios.post('auth/register', data);
            console.log('User registered:', response.data);
            toast.success('Sign Up Success!', {
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
            navigate('/login');
        } catch (error) {
            setError('Failed to load. Please try again.');
            console.error('Error registering user:', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{}}>
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
                    Register
                </Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    id="username"
                    label="Username"
                    {...register('username', { required: 'Username is required' })}
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ''}
                />

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
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default RegisterPage;
