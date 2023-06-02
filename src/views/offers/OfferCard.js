import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';

export default function OfferCard({ offer, updateSelectedOffer, deleteOfferById }) {
    const { image, title } = offer;
    const navigate = useNavigate();
    return (
        <Card sx={{ boxShadow: 3, position: 'relative' }}>
            <Box sx={{ height: 250 }}>
                <img src={image.url} alt="" style={{ height: '100%', width: '100%' }} />
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', paddingTop: 0 }}>
                <Button
                    disableElevation
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ width: '45%' }}
                    onClick={() => navigate(offer._id)}
                >
                    Edit
                </Button>
                <Button
                    disableElevation
                    type="submit"
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ width: '45%' }}
                    onClick={() => deleteOfferById(offer._id)}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}
