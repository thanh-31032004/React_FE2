import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Bounce, toast } from 'react-toastify';
import { TextField, Button, Container, Typography, Box, MenuItem, FormControl, InputLabel, Select, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoading } from 'src/context/loading';
import { Category } from 'src/types/Product';

type EditForm = {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
    isShow: boolean;
};

const AdminProductEdit = () => {
    const { id } = useParams<{ id: string }>();
    const { control, handleSubmit, setValue, formState: { errors } } = useForm<EditForm>();
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/categories');
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`);
                const product = response.data;

                setValue('title', product.title);
                setValue('price', product.price);
                setValue('description', product.description);
                setValue('image', product.image);
                setValue('category', product.category);
                setValue('isShow', product.showProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id, setValue]);

    const onSubmit: SubmitHandler<EditForm> = async (data) => {
        try {
            setLoading(true);
            await axios.put(`http://localhost:3000/products/${id}`, data);
            toast.success('Successfully!', {
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
            navigate('/admin/products');
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Edit Product
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Title is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Product Title"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.title}
                            helperText={errors.title ? errors.title.message : ''}
                        />
                    )}
                />
                <Controller
                    name="price"
                    control={control}
                    rules={{ required: 'Price is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Price"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="number"
                            error={!!errors.price}
                            helperText={errors.price ? errors.price.message : ''}
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Description is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.description}
                            helperText={errors.description ? errors.description.message : ''}
                        />
                    )}
                />
                <Controller
                    name="image"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Image URL is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Image URL"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.image}
                            helperText={errors.image ? errors.image.message : ''}
                        />
                    )}
                />
                <Controller
                    name="category"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.category}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                {...field}
                                label="Category"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.title}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.category && <Typography color="error">{errors.category.message}</Typography>}
                        </FormControl>
                    )}
                />
                <Controller
                    name="isShow"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                />
                            }
                            label="Show Products"
                        />
                    )}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Update Product
                </Button>
            </Box>
        </Container>
    );
};

export default AdminProductEdit;