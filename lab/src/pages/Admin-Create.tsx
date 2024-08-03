
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, MenuItem, FormControl, InputLabel, Select, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLoading } from 'src/context/loading';

type AddForm = {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string,
    isShow: boolean
};
const AdminCreateProduct = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<AddForm>();
    const { setLoading } = useLoading();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<AddForm> = async (data) => {
        try {
            setLoading(true);
            await axios.post('http://localhost:3000/products', data);
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
            navigate('/admin/products'); // Điều hướng đến trang danh sách sản phẩm sau khi thêm thành công
        } catch (error) {
            console.error('Error adding product:', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Add New Product
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
                    rules={{ required: 'Descriptionis required' }}
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
                <p></p>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Add Product
                </Button>
            </Box>
        </Container>
    );
};



export default AdminCreateProduct