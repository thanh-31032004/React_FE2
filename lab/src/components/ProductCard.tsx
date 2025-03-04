import { Button, Card, CardActions, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Product } from "src/types/Product";

type ProductCardProps = {
    product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    return (
        <Card
            component={Link}
            to={`/products/${product._id}`}
            sx={{
                maxWidth: 345,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                '&:hover': {
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            <CardMedia
                component="img"
                alt={product.title}
                height="200"
                image={product.image}
                sx={{ objectFit: "contain", padding: 2 }}
            />
            <CardContent sx={{ flexGrow: 1, padding: 2 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>
                    {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ height: '50px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#666' }}>
                    {product.description}
                </Typography>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#ff5722', marginTop: 1, fontSize: '1.2rem' }}>
                    ${product.price}
                </Typography>
            </CardContent>
            <CardActions sx={{ padding: 2, justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary" size="small" sx={{ textTransform: 'none' }}>
                    Add to Cart
                </Button>
                <Button variant="outlined" color="primary" size="small" sx={{ textTransform: 'none' }}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;