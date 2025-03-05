import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
export const Footer = () => {
    return (

        <AppBar position="static" sx={{ top: 'auto', bottom: 0, backgroundColor: "#333", padding: 2, marginTop: "150px" }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="inherit">
                    TShop
                </Typography>
                <Box>
                    <IconButton edge="end" color="inherit" href="https://facebook.com" target="_blank">
                        <Facebook />
                    </IconButton>
                    <IconButton edge="end" color="inherit" href="https://twitter.com" target="_blank">
                        <Twitter />
                    </IconButton>
                    <IconButton edge="end" color="inherit" href="https://instagram.com" target="_blank">
                        <Instagram />
                    </IconButton>
                    <IconButton edge="end" color="inherit" href="https://linkedin.com" target="_blank">
                        <LinkedIn />
                    </IconButton>
                </Box>
                <Typography variant="body2" color="inherit">
                    &copy; {new Date().getFullYear()} My Company. All rights reserved.
                </Typography>
            </Toolbar>
        </AppBar>
    )
}