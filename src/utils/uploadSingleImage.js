import { CircularProgress, FormHelperText, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import API from 'API';
import ImageCropper from './ImageCropper';

const headers = {
    'Content-Type': 'multipart/form-data'
};

export const UploadSingleImage = ({ imgData, updateImage, disabled = false, error, values = {} }) => {
    const { url } = imgData;
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (url) setImage(url);
    }, [imgData, url]);

    const changeImage = (file) => {
        setOpen(true);
        setImage(URL.createObjectURL(file));
    };

    const CloudUpload = async (file) => {
        setImage(null);
        setOpen(false);
        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);
        const {
            data: { data }
        } = await API.post('/product/image', formData, {
            headers
        });
        updateImage((oldState) => {
            return { ...oldState, ...values, image: data };
        });
        setLoading(false);
    };

    const removeImage = async () => {
        setImage(null);
        setLoading(true);
        // await API.post(`/product/image/${key}`);
        updateImage((oldState) => {
            return { ...oldState, ...values, image: { key: '', url: '' } };
        });
        setLoading(false);
    };
    return (
        <>
            {image ? (
                <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                    {!disabled && (
                        <IconButton
                            aria-label="delete"
                            sx={{ position: 'absolute', right: 0, zIndex: 1, color: '#FFFFFF' }}
                            onClick={() => removeImage()}
                        >
                            <CancelIcon sx={{ path: { stroke: 'black' } }} />
                        </IconButton>
                    )}
                    <img src={image} style={{ height: '100%', width: '100%', borderRadius: 6 }} alt="img" />
                </div>
            ) : (
                <>
                    <IconButton
                        aria-label="delete"
                        sx={{
                            height: '100%',
                            width: '100%',
                            borderRadius: 6,
                            border: '2px solid'
                        }}
                        component="label"
                        color={error ? 'error' : 'secondary'}
                        variant="filledTonal"
                        disabled={disabled}
                    >
                        <input hidden accept="image/*" type="file" onChange={(e) => changeImage(e.target.files[0])} disabled={loading} />
                        {loading ? (
                            <CircularProgress color="secondary" />
                        ) : (
                            <CloudUploadIcon
                                sx={{
                                    height: '30%',
                                    width: '100%'
                                }}
                            />
                        )}
                    </IconButton>
                    {error && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                            {error.key}
                        </FormHelperText>
                    )}
                </>
            )}
            <ImageCropper image={image} CloudUpload={CloudUpload} open={open} setOpen={setOpen} setImage={setImage} />
        </>
    );
};
