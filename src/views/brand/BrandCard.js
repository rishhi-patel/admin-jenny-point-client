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

export default function BrandCard({ brand, updateSelectedBrand, deleteBrandById }) {
    const { image, name } = brand;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card sx={{ maxWidth: 345, boxShadow: 3, position: 'relative' }}>
            {/* <CardMedia
                sx={{ height: 150, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                image={image.url}
                title="green iguana"
            /> */}
            <Box sx={{ height: 150 }}>
                <img src={image.url} alt="" style={{ height: '100%', width: '100%' }} />
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
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
                    onClick={() => updateSelectedBrand(brand)}
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
                    onClick={() => deleteBrandById(brand._id)}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}
