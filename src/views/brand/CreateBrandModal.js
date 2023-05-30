import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CustomInput from 'views/customerDetails/CustomInput';
import { CardMedia, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

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

export default function CreateBrandModal({ open, setOpen, saveBrand, selectedBrand, updateBrandDetails }) {
    const [image, setImage] = useState(null);
    const [brandDetails, setBrandDetails] = useState({ name: '', image: null });

    const handleClose = () => {
        setOpen(false);
        setImage(null);
        setBrandDetails({ name, image: null });
    };

    const changeImage = (file) => {
        setImage(URL.createObjectURL(file));
        setBrandDetails((oldVal) => {
            return { ...oldVal, image: file };
        });
    };

    useEffect(() => {
        if (selectedBrand) {
            setBrandDetails(selectedBrand);
            setImage(selectedBrand.image.url);
        }
    }, [selectedBrand]);

    useEffect(() => {
        if (!open) {
            setBrandDetails({ name: '', image: null });
            setImage(null);
        }
    }, [open]);
    const handleSaveData = () => {
        const formData = new FormData();
        formData.append('name', brandDetails.name);
        formData.append('image', brandDetails.image);
        if (selectedBrand) updateBrandDetails(formData, selectedBrand._id);
        else saveBrand(formData);
    };

    return (
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography variant="h3">Brand</Typography>
                    {image ? (
                        <>
                            <IconButton
                                aria-label="delete"
                                sx={{ position: 'absolute', right: 32, marginTop: '12px', color: '#FFFFFF' }}
                                onClick={() => {
                                    setImage(null);
                                    setBrandDetails((oldSate) => {
                                        return { ...oldSate, image: null };
                                    });
                                }}
                            >
                                <CancelIcon sx={{ path: { stroke: 'black' } }} />
                            </IconButton>
                            <CardMedia sx={{ height: 200, borderRadius: '12px', marginTop: '13px' }} image={image} title="green iguana" />
                        </>
                    ) : (
                        <>
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="label"
                                style={{ margin: '0 auto', display: 'block', borderRadius: 0 }}
                            >
                                <input hidden accept="image/*" type="file" onChange={(e) => changeImage(e.target.files[0])} />
                                <img
                                    src={
                                        'https://assets.upload.io/website/blog_assets/icons/material/icons/add_photo_alternate_outlined.svg'
                                    }
                                    alt=""
                                    style={{ height: 200, width: 200 }}
                                />
                            </IconButton>
                        </>
                    )}

                    <CustomInput
                        placeholder="title"
                        value={brandDetails.name}
                        onChange={(e) =>
                            setBrandDetails((oldVal) => {
                                return { ...oldVal, name: e.target.value };
                            })
                        }
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '13px' }}>
                        {image ? (
                            <Button
                                variant="outlined"
                                color="error"
                                sx={{ width: '45%' }}
                                onClick={() => {
                                    setImage(null);
                                    setBrandDetails((oldSate) => {
                                        return { ...oldSate, name: '', image: null };
                                    });
                                }}
                            >
                                Clear
                            </Button>
                        ) : (
                            <Button variant="outlined" color="error" sx={{ width: '45%' }} onClick={handleClose}>
                                Cancel
                            </Button>
                        )}{' '}
                        <Button variant="contained" color="secondary" sx={{ width: '45%' }} onClick={() => handleSaveData()}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
