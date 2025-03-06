import { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Bounce, toast } from 'react-toastify';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoading } from 'src/context/loading';

type EditCategoryForm = {
    title: string;
    description: string;
};

const EditCategory = () => {
    const { id } = useParams<{ id: string }>();
    const { control, handleSubmit, setValue, formState: { errors } } = useForm<EditCategoryForm>();
    const { setLoading } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/categories/${id}`);
                const category = response.data;
                setValue('title', category.title);
                setValue('description', category.description);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [id, setValue]);

    const onSubmit: SubmitHandler<EditCategoryForm> = async (data) => {
        try {
            setLoading(true);
            await axios.put(`/categories/${id}`, data);
            toast.success('Successfully updated category!', {
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
            navigate('/admin/category');
        } catch (error) {
            console.error('Error updating category:', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Edit Category
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
                            label="Category Title"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.title}
                            helperText={errors.title ? errors.title.message : ''}
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
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Update Category
                </Button>
            </Box>
        </Container>
    );
};

export default EditCategory;