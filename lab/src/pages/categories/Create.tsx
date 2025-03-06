import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLoading } from 'src/context/loading';

type AddCategoryForm = {
    title: string;
    description: string;
};

const CreateCategory = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<AddCategoryForm>();
    const { setLoading } = useLoading();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<AddCategoryForm> = async (data) => {
        try {
            setLoading(true);
            await axios.post('/categories', data);
            toast.success('Category created successfully!', {
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
            navigate('/admin/categories');
        } catch (error) {
            console.error('Error creating category:', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Add New Category
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
                    Add Category
                </Button>
            </Box>
        </Container>
    );
};

export default CreateCategory;