import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LoginPromptDialogProps {
    open: boolean;
    onClose: () => void;
}

const LoginPromptDialog: React.FC<LoginPromptDialogProps> = ({ open, onClose }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        onClose();
        navigate('/login');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login Required</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You need to log in to add items to your cart. Would you like to log in now?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleLogin} color="primary" autoFocus>
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginPromptDialog;