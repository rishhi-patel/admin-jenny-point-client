import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    Chip,
    ClickAwayListener,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Modal,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';

// third-party

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconLogout, IconSettings, IconUser } from '@tabler/icons';

// ==============================|| PROFILE MENU ||============================== //

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

const ProfileSection = ({ userDetails }) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();

    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);

    const [popupState, setPopupState] = useState(false);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/');
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={IconUser}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Box sx={{ p: 2 }}>
                                        <Stack>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                {/* <Typography variant="h4">Good Morning,</Typography> */}
                                                <Typography component="span" variant="h3">
                                                    {userDetails.name}
                                                </Typography>
                                            </Stack>
                                            <Typography variant="h5" sx={{ fontWeight: 400 }}>
                                                {userDetails.email}
                                            </Typography>
                                        </Stack>
                                        {/* <OutlinedInput
                                            sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
                                            id="input-search-profile"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder="Search profile options"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                                                </InputAdornment>
                                            }
                                            aria-describedby="search-helper-text"
                                            inputProps={{
                                                'aria-label': 'weight'
                                            }}
                                        />
                                        <Divider /> */}
                                    </Box>
                                    {/* <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}> */}
                                    <Box sx={{ p: 2 }}>
                                        {/* <UpgradePlanCard />
                                            <Divider /> */}
                                        {/* <Card
                                                sx={{
                                                    bgcolor: theme.palette.primary.light,
                                                    my: 2
                                                }}
                                            >
                                                 <CardContent>
                                                    <Grid container spacing={3} direction="column">
                                                        <Grid item>
                                                            <Grid item container alignItems="center" justifyContent="space-between">
                                                                <Grid item>
                                                                    <Typography variant="subtitle1">Start DND Mode</Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Switch
                                                                        color="primary"
                                                                        checked={sdm}
                                                                        onChange={(e) => setSdm(e.target.checked)}
                                                                        name="sdm"
                                                                        size="small"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid item container alignItems="center" justifyContent="space-between">
                                                                <Grid item>
                                                                    <Typography variant="subtitle1">Allow Notifications</Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Switch
                                                                        checked={notification}
                                                                        onChange={(e) => setNotification(e.target.checked)}
                                                                        name="sdm"
                                                                        size="small"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card> */}
                                        <Divider />
                                        <List
                                            component="nav"
                                            sx={{
                                                width: '100%',
                                                maxWidth: 350,
                                                minWidth: 300,
                                                backgroundColor: theme.palette.background.paper,
                                                borderRadius: '10px',
                                                [theme.breakpoints.down('md')]: {
                                                    minWidth: '100%'
                                                },
                                                '& .MuiListItemButton-root': {
                                                    mt: 0.5
                                                }
                                            }}
                                        >
                                            <ListItemButton
                                                sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                selected={selectedIndex === 4}
                                                onClick={() => setPopupState(true)}
                                            >
                                                <ListItemIcon>
                                                    <IconLogout stroke={1.5} size="1.3rem" />
                                                </ListItemIcon>
                                                <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                            </ListItemButton>
                                        </List>
                                    </Box>
                                    {/* </PerfectScrollbar> */}
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
            <div>
                <Modal
                    open={popupState}
                    onClose={() => setPopupState(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography variant="h3">Are you sure to log out?</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: '30px' }}>
                            <Button variant="outlined" color="secondary" sx={{ width: '45%' }} onClick={() => handleLogout()}>
                                Yes
                            </Button>

                            <Button variant="contained" color="error" sx={{ width: '45%' }} onClick={() => setPopupState(false)}>
                                No
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        </>
    );
};

const mapStateToProps = ({ user }) => {
    const { userDetails } = user;
    return { userDetails };
};
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);
