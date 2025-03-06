import { Drawer, List, ListItemText, ListItemIcon, Avatar, Divider, ListItemButton, Typography, Box } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const Sidebar = () => {
    const drawerWidth = 240;
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#f4f4f4',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box sx={{ padding: '16px', textAlign: 'center', backgroundColor: '#1976d2', color: '#fff' }}>
                <Avatar sx={{ width: 56, height: 56, margin: '0 auto', backgroundColor: '#fff' }}>
                    <AccountCircleIcon sx={{ color: '#1976d2' }} />
                </Avatar>
                <Typography variant="h6" sx={{ marginTop: '8px' }}>Username</Typography>
            </Box>
            <Divider />
            <List>
                {[
                    { text: 'Home', icon: <HomeIcon />, path: '/' },
                    { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
                    { text: 'Products', icon: <StorefrontIcon />, path: '/products' },
                    { text: 'Cart', icon: <ShoppingCartIcon />, path: '/cart' },
                    { text: 'Contact', icon: <ContactMailIcon />, path: '/contact' },
                    { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
                ].map((item) => (
                    <ListItemButton key={item.text} component="a" href={item.path}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};