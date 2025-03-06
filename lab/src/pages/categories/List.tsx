import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Bounce, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
} from '@mui/material';

import { Category } from 'src/types/Product';
import { Link } from 'react-router-dom';
import { useLoading } from 'src/context/loading';

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const { setLoading } = useLoading();
    const [page, setPage] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const getAllCategories = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:3000/categories");
            setCategories(data);
            setError(null);
        } catch (error) {
            console.log(error);
            setError('Failed to load categories. Please try again.');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setSelectedCategoryId(id);
        setOpenDialog(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/categories/${selectedCategoryId}`);
            setLoading(true);
            setCategories(prevCategories => prevCategories.filter(category => category._id !== selectedCategoryId));
            toast.success('Successfully deleted!', {
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
            setOpenDialog(false);
        } catch (error) {
            console.error('Error deleting category:', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    const cancelDelete = () => {
        setOpenDialog(false);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Category List</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link} to={'/admin/categories/add'}
                >
                    Add Category
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '10%' }}>ID</TableCell>
                            <TableCell sx={{ width: '70%' }}>Name</TableCell>
                            <TableCell sx={{ width: '20%' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((category) => (
                                <TableRow key={category._id} sx={{ backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                                    <TableCell>{category._id}</TableCell>
                                    <TableCell sx={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '300px' }}>{category.title}</TableCell>
                                    <TableCell>
                                        <Link to={`/admin/categories/edit/${category._id}`}>
                                            <IconButton color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton onClick={() => handleDelete(category._id)} color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={categories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this category?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CategoryList;