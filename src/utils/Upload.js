import { CircularProgress, FormHelperText, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import API from 'API';
import ImageCropper from './ImageCropper';

const headers = {
    'Content-Type': 'multipart/form-data'
};

export const Upload = ({ imgData, updateImage, index, disabled = false, error, values }) => {
    const { url } = imgData;
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [isNewImage, setIsNewImage] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (url) setImage(url);
    }, [imgData, url]);

    const changeImage = (file) => {
        setOpen(true);
        setImage(URL.createObjectURL(file));
    };
    const CloudUpload = async (file) => {
        setLoading(true);
        setImage(null);
        const formData = new FormData();
        formData.append('image', file);
        const {
            data: { data }
        } = await API.post('/product/image', formData, {
            headers
        });

        updateImage((oldState) => {
            const imgs = [...oldState.images];
            imgs.splice(index, 1, data);
            return { ...oldState, ...values, images: imgs };
        });
        setOpen(false);
        setLoading(false);
    };

    const removeImage = async () => {
        setImage(null);
        setLoading(true);
        // await API.post(`/product/image/${key}`);
        // // remove mage
        updateImage((oldState) => {
            const imgs = [...oldState.images];
            imgs.splice(index, 1, { key: '', url: null });
            return { ...oldState, ...values, images: imgs };
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
                    <img src={image} style={{ height: '100%', width: '100%', borderRadius: 6, border: '2px solid' }} alt="img" />
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
                        color={index === 0 && error ? 'error' : 'secondary'}
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
                    {index === 0 &&
                        (error ? (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                Cover Image is Required
                            </FormHelperText>
                        ) : (
                            <FormHelperText id="standard-weight-helper-text-email-login"> Cover Image*</FormHelperText>
                        ))}
                </>
            )}
            <ImageCropper image={image} CloudUpload={CloudUpload} open={open} setOpen={setOpen} setImage={setImage} />
        </>
    );
};
