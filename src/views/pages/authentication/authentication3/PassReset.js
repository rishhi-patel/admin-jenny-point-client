import { useState } from 'react';
import { connect } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    InputAdornment,
    IconButton
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

import { useNavigate, useParams } from 'react-router';
import AuthWrapper1 from '../AuthWrapper1';
import { Link } from 'react-router-dom';
import Logo from 'ui-component/Logo';
import AuthCardWrapper from '../AuthCardWrapper';
import { generateOTP, resetPassword, verifyOTP } from 'store/actions/userActions';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PassReset = ({ updatePassowrd, ...others }) => {
    const theme = useTheme();
    const { token } = useParams();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
            <AuthWrapper1>
                <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <AuthCardWrapper>
                                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                                        <Grid item>
                                            <Link to="#">
                                                <Logo />
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container direction="column" justifyContent="center" spacing={2}>
                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            alignItems: 'center',
                                                            display: 'flex'
                                                        }}
                                                    ></Box>
                                                </Grid>
                                                <Grid item xs={12} container alignItems="center" justifyContent="center">
                                                    <Box sx={{ mb: 2 }}>
                                                        <Typography variant="subtitle1">Type New Password and Confirm Password</Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            <Formik
                                                initialValues={{
                                                    password: '',
                                                    confirmPassword: ''
                                                }}
                                                validationSchema={Yup.object().shape({
                                                    password: Yup.string().max(255).required('Required'),
                                                    confirmPassword: Yup.string()
                                                        .oneOf([Yup.ref('password'), null], 'Passsword doesnot match')
                                                        .required('Required')
                                                })}
                                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                                    try {
                                                        updatePassowrd({ password: values.password, token }, navigate);
                                                    } catch (err) {
                                                        setStatus({ success: false });
                                                        setErrors({ submit: err.message });
                                                        setSubmitting(false);
                                                    }
                                                }}
                                            >
                                                {({ errors, handleBlur, handleSubmit, handleChange, isSubmitting, touched, values }) => (
                                                    <form noValidate onSubmit={handleSubmit} {...others}>
                                                        <FormControl
                                                            fullWidth
                                                            error={Boolean(touched.password && errors.password)}
                                                            sx={{ ...theme.typography.customInput }}
                                                        >
                                                            <InputLabel htmlFor="outlined-adornment-password-login">
                                                                New Password
                                                            </InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-password-login"
                                                                type={showPassword ? 'text' : 'password'}
                                                                value={values.password}
                                                                name="password"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={handleClickShowPassword}
                                                                            onMouseDown={handleMouseDownPassword}
                                                                            edge="end"
                                                                            size="large"
                                                                        >
                                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                                label="password"
                                                                inputProps={{}}
                                                            />
                                                            {touched.password && errors.password && (
                                                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                                                    {errors.password}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                        <FormControl
                                                            fullWidth
                                                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                                            sx={{ ...theme.typography.customInput }}
                                                        >
                                                            <InputLabel htmlFor="outlined-adornment-password-login">
                                                                Confirm Password
                                                            </InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-password-login"
                                                                type={showConfirmPassword ? 'text' : 'password'}
                                                                value={values.confirmPassword}
                                                                name="confirmPassword"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={handleClickShowConfirmPassword}
                                                                            onMouseDown={handleMouseDownPassword}
                                                                            edge="end"
                                                                            size="large"
                                                                        >
                                                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                                label="confirmPassword"
                                                                inputProps={{}}
                                                            />
                                                            {touched.confirmPassword && errors.confirmPassword && (
                                                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                                                    {errors.confirmPassword}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                        {errors.submit && (
                                                            <Box sx={{ mt: 3 }}>
                                                                <FormHelperText error>{errors.submit}</FormHelperText>
                                                            </Box>
                                                        )}

                                                        <Box sx={{ mt: 2 }}>
                                                            <AnimateButton>
                                                                <Button
                                                                    disableElevation
                                                                    disabled={isSubmitting}
                                                                    fullWidth
                                                                    size="large"
                                                                    type="submit"
                                                                    variant="contained"
                                                                    color="secondary"
                                                                >
                                                                    Save
                                                                </Button>
                                                            </AnimateButton>
                                                        </Box>
                                                    </form>
                                                )}
                                            </Formik>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AuthWrapper1>
        </>
    );
};

const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => ({
    updatePassowrd: (data, navigate) => dispatch(resetPassword(data, navigate))
});

export default connect(mapStateToProps, mapDispatchToProps)(PassReset);
