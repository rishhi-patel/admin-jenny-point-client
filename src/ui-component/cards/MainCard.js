import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';

// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            btnText,
            btnEvent,
            btnText1,
            btnEvent1,
            dltBtn,
            dltBtnEvent,
            cancelBtnEvent,
            cancelBtn,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();

        return (
            <Card
                ref={ref}
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderColor: theme.palette.primary[200] + 25,
                    ':hover': {
                        boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
                    },
                    position: 'relative',
                    ...sx
                }}
            >
                <Box sx={{ position: 'absolute', right: 0, m: 2 }}>
                    {btnText && (
                        <Button variant="contained" color="secondary" onClick={btnEvent}>
                            {btnText}
                        </Button>
                    )}
                    {btnText1 && (
                        <Button variant="contained" color="secondary" onClick={btnEvent1} sx={{ ml: 2 }}>
                            {btnText1}
                        </Button>
                    )}
                    {dltBtn && (
                        <Button variant="contained" color="error" onClick={dltBtnEvent} sx={{ ml: 2 }}>
                            Delete
                        </Button>
                    )}
                    {cancelBtn && (
                        <Button variant="contained" color="error" onClick={cancelBtnEvent} sx={{ ml: 2 }}>
                            Cancel
                        </Button>
                    )}
                </Box>

                {title && (
                    <CardHeader
                        sx={headerSX}
                        title={darkTitle ? <Typography variant="h3">{title}</Typography> : title}
                        action={secondary}
                    ></CardHeader>
                )}

                {/* content & header divider */}
                {title && <Divider />}
                {/* {EndComponent && <EndComponent />} */}

                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    }
);

MainCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    shadow: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
