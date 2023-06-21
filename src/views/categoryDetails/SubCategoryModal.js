import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CustomInput from 'views/customerDetails/CustomInput';
import { CardMedia, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams } from 'react-router';

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

export default function SubCategoryModal({ open, setOpen, saveCategory, selectedCategory, updateCategoryDetails }) {
    const { id } = useParams();
    const [categoryDetails, setCategoryDetails] = useState({ name: '' });
    const handleClose = () => {
        setOpen(false);
        setCategoryDetails({ name });
    };

    useEffect(() => {
        if (selectedCategory) {
            setCategoryDetails(selectedCategory);
        } else {
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (!open) setCategoryDetails({ name: '' });
    }, [open]);
    const handleSaveData = () => {
        if (selectedCategory) updateCategoryDetails(categoryDetails, id, selectedCategory._id);
        else saveCategory(categoryDetails, id);
    };

    return (
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography variant="h3">Sub Category</Typography>

                    <CustomInput
                        placeholder="Name"
                        value={categoryDetails.name}
                        onChange={(e) =>
                            setCategoryDetails((oldVal) => {
                                return { ...oldVal, name: e.target.value };
                            })
                        }
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '13px' }}>
                        <Button variant="outlined" color="error" sx={{ width: '45%' }} onClick={handleClose}>
                            Cancel
                        </Button>

                        <Button variant="contained" color="secondary" sx={{ width: '45%' }} onClick={() => handleSaveData()}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
