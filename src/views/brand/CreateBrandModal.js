import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CustomInput from 'views/customerDetails/CustomInput';
import { CardMedia, CircularProgress, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Cropper from 'react-cropper';

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
    const cropperRef = useRef(null);
    const [image, setImage] = useState(null);
    const [brandDetails, setBrandDetails] = useState({ name: '', image: null });
    const [newImage, setnewImage] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setImage(null);
        setBrandDetails({ name, image: null });
    };

    const changeImage = (file) => {
        setnewImage(true);
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
            setnewImage(false);
        }
    }, [open]);

    const onCrop = (e) => {
        e.preventDefault();
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {
                setBrandDetails((oldVal) => {
                    return { ...oldVal, image: blob };
                });
            }, 'image/jpeg');
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();

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
                    {newImage ? (
                        <Cropper aspectRatio={1} ref={cropperRef} src={image} guides={true} crop={onCrop} />
                    ) : image ? (
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
                            <img src={image} alt="" style={{ height: 200, width: '100%', borderRadius: '12px', marginTop: '13px' }} />
                        </>
                    ) : (
                        <>
                            <IconButton
                                aria-label="delete"
                                sx={{
                                    height: '200px',
                                    width: '100%',
                                    borderRadius: 6,
                                    border: '1px solid',
                                    margin: '13px 0'
                                }}
                                component="label"
                                color="secondary"
                                variant="filledTonal"
                            >
                                <input hidden accept="image/*" type="file" onChange={(e) => changeImage(e.target.files[0])} />
                                <CloudUploadIcon
                                    sx={{
                                        height: '30%',
                                        width: '100%'
                                    }}
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
                                    setnewImage(false);
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
                        <Button variant="contained" color="secondary" sx={{ width: '45%' }} onClick={handleUpload}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
