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
    Avatar,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
} from '@mui/material';

import { Product } from 'src/types/Product';
import { Link } from 'react-router-dom';
import { useLoading } from 'src/context/loading';

const AdminProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { setLoading } = useLoading();
    const [page, setPage] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const getAllProduct = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:3000/products");
            setProducts(data);
            setError(null);
        } catch (error) {
            console.log(error);
            setError('Failed to load products. Please try again.');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    useEffect(() => {
        getAllProduct();
    }, []);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleDelete = (id: any) => {
        setSelectedProductId(id);
        setOpenDialog(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/products/${selectedProductId}`);
            setLoading(true);
            setProducts(prevProducts => prevProducts.filter(product => product._id !== selectedProductId));
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
            setOpenDialog(false);
        } catch (error) {
            console.error('Error deleting product:', error);
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
                <Typography variant="h4">Product List</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link} to={'/admin/products/add'}
                >
                    Add Product
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '10%' }}>ID</TableCell>
                            <TableCell sx={{ width: '40%' }}>Name</TableCell>
                            <TableCell sx={{ width: '10%' }}>Price</TableCell>
                            <TableCell sx={{ width: '20%' }}>Image</TableCell>
                            <TableCell sx={{ width: '20%' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .filter(product => product.isShow != false)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => (
                                <TableRow key={product._id} sx={{ backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                                    <TableCell>{product._id}</TableCell>
                                    <TableCell sx={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '300px' }}>{product.title.substring(0, 30)}...</TableCell>
                                    <TableCell>{product.price}$</TableCell>
                                    <TableCell>
                                        <Avatar alt={product.title} src={product.image} />
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin/products/edit/${product._id}`}>
                                            <IconButton color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton onClick={() => handleDelete(product._id)} color="secondary">
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
                count={products.length}
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
                    <Typography>Are you sure you want to delete this product?</Typography>
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

export default AdminProductList;