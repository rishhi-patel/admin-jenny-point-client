import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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

const ImageCropper = ({ image, CloudUpload, open, setOpen, setImage }) => {
    const cropperRef = useRef(null);

    const handleUpload = (e) => {
        e.preventDefault();
        setOpen(false);
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {
                CloudUpload(blob);
            }, 'image/jpeg');
        }
    };
    const handleClose = () => {
        setOpen(false);
        setImage(null);
    };
    return (
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Cropper aspectRatio={16 / 9} ref={cropperRef} src={image} guides={true} style={{ height: '50vh' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '13px' }}>
                        <Button variant="outlined" color="error" sx={{ width: '45%' }} onClick={handleClose}>
                            Cancel
                        </Button>

                        <Button variant="contained" color="secondary" sx={{ width: '45%' }} onClick={handleUpload}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default ImageCropper;
