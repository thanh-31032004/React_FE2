import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, Alert, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Link, FormControlLabel, Checkbox } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault();
    };

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
                window.location.reload();
            }, 1000);
        } catch (error) {
            setError('Please try again.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '90vh',
                justifyContent: 'center',
                alignItems: 'center',

            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexGrow: 1,
                }}
            >
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
                        backgroundColor: '#ffffff', // Changed to a standard white color
                        borderRadius: '8px',
                        boxShadow: '20px 20px 20px rgba(24, 162, 205, 0.1)',
                        width: '100%',
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom color="primary">
                        Login
                    </Typography>

                    <TextField
                        id="input-with-icon-textfield"
                        label="Email"
                        type="email"
                        size="small"

                        fullWidth
                        variant="outlined"
                        margin="normal"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Invalid email address',
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle fontSize="inherit" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
                        <InputLabel size="small" htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            size="small"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                            })}
                            error={!!errors.password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="small"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff fontSize="inherit" />
                                        ) : (
                                            <Visibility fontSize="inherit" />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {errors.password && (
                            <Typography variant="body2" color="error">
                                {errors.password.message}
                            </Typography>
                        )}
                    </FormControl>


                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        disableElevation
                        fullWidth
                        sx={{
                            my: 2,
                            backgroundColor: '#1976d2',
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            }
                        }}
                    >
                        Log In
                    </Button>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link href="/register" variant="body2">
                            Sign up
                        </Link>
                    </Box>
                </Box>
            </Container>

        </Box>
    );
};

export default LoginPage;