import { Box, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center'
}));

const JustifyBox = styled(FlexBox)(() => ({
    maxWidth: 320,
    flexDirection: 'column',
    justifyContent: 'center'
}));

const IMG = styled('img')(() => ({
    width: '100%',
    marginBottom: '32px'
}));

const NotFoundRoot = styled(FlexBox)(() => ({
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh !important'
}));

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <NotFoundRoot>
            <JustifyBox>
                <IMG
                    src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?t=st=1682406757~exp=1682407357~hmac=2f5506474407db966469fe3113eaecb4b81161b892e8915c2d29e1ff051719fa"
                    alt=""
                />
                <Button color="primary" variant="contained" sx={{ textTransform: 'capitalize' }} onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </JustifyBox>
        </NotFoundRoot>
    );
};

export default NotFound;
