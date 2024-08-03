
import { AppBar, Toolbar, Typography, Button, Box, Avatar, InputBase, Paper, IconButton, Badge, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useMemo, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from 'src/context/cart';

export const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { cart } = useCart();
    const cartQuantity = useMemo(
        () => cart && cart.products ? cart.products.reduce((total, { quantity }) => total + quantity, 0) : 0,
        [cart]
    );
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: '#6AD4DD', }}>
                <Toolbar>
                    <Typography component={Link}
                        to="/" variant="h6" sx={{ marginRight: 4 }}>
                        TShop
                    </Typography>
                    <Box>
                        <Button color="inherit" component={Link} to="/products" sx={{ mr: 2 }}>
                            Products
                        </Button>
                        <Button color="inherit" component={Link} to="/categories" sx={{ mr: 2 }}>
                            Categories
                        </Button>
                        <Button color="inherit" component={Link} to="/news" sx={{ mr: 2 }}>
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
                            sx={{ ml: 1, flex: 1 }}
                            inputProps={{ 'aria-label': 'search products' }}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <Box sx={{ marginLeft: 45 }}>
                        <IconButton component={Link} to="/cart" color="inherit">
                            <Badge badgeContent={cartQuantity} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        {isLoggedIn ? (
                            <>
                                <IconButton >
                                    <Avatar alt="User Avatar" src="/path/to/avatar.jpg" sx={{ mr: 2 }} />
                                </IconButton>
                                {/* <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => navigate('/profile')}>Thông tin</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu> */}
                            </>

                        ) : (
                            <>
                                <Button color="inherit" component={Link} to="/login" sx={{ mr: 2 }}>
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="/register" sx={{ mr: 2 }}>
                                    Register
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
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
                }}
            >
            </Box>
        </>
    );
};
