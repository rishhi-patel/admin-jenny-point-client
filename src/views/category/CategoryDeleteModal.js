import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    width: '90%',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4
};

export default function DeleteCategoryModal({ open, setOpen, confirmDelete }) {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography variant="h3">Are you Sure ?</Typography>
                    <Typography variant="h5" sx={{ my: 1 }}>
                        Deleting this category/subcategory will result in the loss of associated products.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '13px' }}>
                        <Button variant="outlined" color="error" sx={{ width: '45%' }} onClick={handleClose}>
                            Cancel
                        </Button>

                        <Button variant="contained" color="secondary" sx={{ width: '45%' }} onClick={() => confirmDelete()}>
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
