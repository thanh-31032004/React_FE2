import { AppBar, Toolbar, Typography, Button, Box, Avatar, InputBase, Paper, IconButton, Badge } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useMemo, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from 'src/context/cart';
import LoginPromptDialog from 'src/components/Comfirmdialog';

export const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const { cart } = useCart();
    const location = useLocation();
    const cartQuantity = useMemo(
        () => cart && cart.products ? cart.products.reduce((total, { quantity }) => total + quantity, 0) : 0,
        [cart]
    );

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload();
        setIsLoggedIn(false);
    };

    const handleCartClick = () => {
        if (!isLoggedIn) {
            setOpen(true);
        } else {
            window.location.href = '/cart';
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('user');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: '#333', }}>
                <Toolbar>
                    <Typography component={Link}
                        to="/" variant="h6" sx={{ marginRight: 4, color: '#fff', textDecoration: 'none', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                        TShop
                    </Typography>
                    <Box>
                        <Button color="inherit" component={Link} to="/products" sx={{ mr: 2, color: '#fff', textTransform: 'none', '&:hover': { backgroundColor: '#555' } }}>
                            Products
                        </Button>
                        <Button color="inherit" component={Link} to="/about" sx={{ mr: 2, color: '#fff', textTransform: 'none', '&:hover': { backgroundColor: '#555' } }}>
                            About
                        </Button>
                        <Button color="inherit" component={Link} to="/news" sx={{ mr: 2, color: '#fff', textTransform: 'none', '&:hover': { backgroundColor: '#555' } }}>
                            News
                        </Button>
                    </Box>
                    <Paper
                        component="form"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: 300,
                            backgroundColor: '#fff',
                            marginLeft: 20,
                            borderRadius: 1,
                            boxShadow: 'none',
                            padding: '0 10px',
                        }}
                    >
                        <InputBase
                            placeholder="Search Products"
                            sx={{ ml: 1, flex: 1, fontFamily: 'Roboto, sans-serif' }}
                            inputProps={{ 'aria-label': 'search products' }}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <Box sx={{ marginLeft: 45 }}>
                        <IconButton color="inherit" onClick={handleCartClick}>
                            <Badge badgeContent={cartQuantity} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        {isLoggedIn ? (
                            <>
                                <IconButton to="/profile" component={Link}>
                                    <Avatar alt="User Avatar" src="https://static.vecteezy.com/system/resources/previews/024/183/502/non_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg" sx={{ mr: 2 }} />
                                </IconButton>
                                <Button color="inherit" onClick={handleLogout} sx={{ color: '#fff', textTransform: 'none', '&:hover': { backgroundColor: '#555' } }}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="inherit" component={Link} to="/login" sx={{ mr: 2, color: '#fff', textTransform: 'none', '&:hover': { backgroundColor: '#555' } }}>
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="/register" sx={{ mr: 2, color: '#fff', textTransform: 'none', '&:hover': { backgroundColor: '#555' } }}>
                                    Register
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            {location.pathname === '/' && (
                <Box
                    sx={{
                        backgroundImage: 'url(https://tipsmake.com/data/images/collection-of-the-most-beautiful-fashion-banners-picture-19-vcJMcqXF3.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100vh',
                        textAlign: 'center',
                        color: '#fff',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        mt: 8,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 'bold',
                        fontSize: '2rem',
                    }}
                >
                </Box>
            )}
            <LoginPromptDialog open={open} onClose={handleClose} />
        </>
    );
};