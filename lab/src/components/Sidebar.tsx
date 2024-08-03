import { Drawer, List, ListItemText, ListItemIcon, Avatar, Divider, ListItemButton } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export const Sidebar = () => {
    const drawerWidth = 240;
    return (
        <>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <div style={{ padding: '16px', textAlign: 'center' }}>
                    <Avatar sx={{ width: 56, height: 56, margin: '0 auto' }}><AccountCircleIcon /></Avatar>
                    <h3>Username</h3>
                </div>
                <Divider />
                <List>
                    {[
                        { text: 'Danh mục', icon: <CategoryIcon />, path: '/categories' },
                        { text: 'Sản phẩm', icon: <StorefrontIcon /> },
                        { text: 'Liên hệ', icon: <ContactMailIcon /> },
                        { text: 'Khách hàng', icon: <PeopleIcon /> },
                    ].map((item, index) => (
                        <ListItemButton key={item.text}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
        </>
    )
}