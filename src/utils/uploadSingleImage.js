import { CircularProgress, FormHelperText, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import API from 'API';

const headers = {
    'Content-Type': 'multipart/form-data'
};

export const UploadSingleImage = ({ imgData, updateImage, disabled = false, error, values = {} }) => {
    const { url, key } = imgData;
    const [image, setImage] = useState(null);
    const [isNewImage, setIsNewImage] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (url) setImage(url);
    }, [imgData, url]);

    const changeImage = async (file) => {
        setIsNewImage(true);
        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);
        const {
            data: { data }
        } = await API.post('/product/image', formData, {
            headers
        });
        setImage(URL.createObjectURL(file));

        updateImage((oldState) => {
            return { ...oldState, ...values, image: data };
        });
        setLoading(false);
    };

    const removeImage = async () => {
        setImage(null);
        setLoading(true);
        await API.post(`/product/image/${key}`);
        updateImage((oldState) => {
            return { ...oldState, ...values, images: { key: '', url: '' } };
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
                        {loading ? <CircularProgress color="secondary" /> : <CloudUploadIcon />}
                    </IconButton>
                    {error && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                            First Image is Required
                        </FormHelperText>
                    )}
                </>
            )}
        </>
    );
};
