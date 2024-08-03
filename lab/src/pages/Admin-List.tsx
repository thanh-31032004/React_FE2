
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
} from '@mui/material';

import { Product } from 'src/types/Product';
import { Link, useNavigate } from 'react-router-dom';
import { useLoading } from 'src/context/loading';

const AdminProductList = () => {
    const navigate = useNavigate();
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
    //xóa sp
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
        <Container sx={{ float: 'right' }}>

            <h1>Product List</h1>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                component={Link} to={'/admin/products/add'}
            >
                Add Product
            </Button>
            <p></p>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>

                            <TableCell>Image</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .filter(product => product.isShow != false)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell>{product._id}</TableCell>
                                    <TableCell sx={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '300px' }}>{product.title}</TableCell>
                                    <TableCell>{product.price}$</TableCell>
                                    {/* <TableCell>{product.c}</TableCell> */}
                                    <TableCell>
                                        <Avatar alt={product.title} src={product.image} />
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin/products/edit/${product._id}`}>
                                            <IconButton color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton >
                                            <DeleteIcon onClick={() => handleDelete(product._id)} color="secondary" />
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
                    <p>Are you sure you want to delete this product?</p>
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



export default AdminProductList