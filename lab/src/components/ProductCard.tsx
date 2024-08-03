import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Product } from "src/types/Product";
type ProductCardProps = {
    product: Product;
}
const ProductCard: FC<ProductCardProps> = ({ product }) => {
    return (
        <Card component={Link}
            to={`/products/${product._id}`}
            sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

            <CardMedia
                component="img"
                alt={product.title}
                height="140"
                image={product.image}
                sx={{ objectFit: "contain" }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ height: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>

    )
}
export default ProductCard;