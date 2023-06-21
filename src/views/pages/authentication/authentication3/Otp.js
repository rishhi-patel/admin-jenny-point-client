import { useRef, useState } from 'react';
import { connect } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Divider, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import { useNavigate } from 'react-router';
import AuthWrapper1 from '../AuthWrapper1';
import { Link } from 'react-router-dom';
import Logo from 'ui-component/Logo';
import AuthCardWrapper from '../AuthCardWrapper';
import { generateOTP, verifyOTP } from 'store/actions/userActions';

const Otp = ({ sendOtp, verifyUserOtp, ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const buttonRef = useRef(null);
    const [otpSent, setOtpSent] = useState(false);
    return (
        <>
            <AuthWrapper1>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    sx={{ minHeight: '100vh' }}
                    style={{
                        background: 'url(https://newjennypoint.jennypoint.com/assets/images/others/login-2.png)',
                        height: '100%',
                        width: '100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'right'
                    }}
                >
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }} md={4}>
                                <AuthCardWrapper>
                                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                                        <Grid item>
                                            <Link to="#">
                                                <Logo small />
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
                                                        <Typography variant="subtitle1">Enter your Mobile Number</Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            <Formik
                                                initialValues={{
                                                    mobileNo: '',
                                                    otp: ''
                                                }}
                                                validationSchema={Yup.object().shape({
                                                    mobileNo: Yup.string()
                                                        .min(10, 'Please Enter Valid Mobile Number')
                                                        .required('Mobile Number is required')
                                                })}
                                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                                    try {
                                                        if (otpSent) {
                                                            verifyUserOtp({ mobileNo: values.mobileNo, otp: Number(values.otp) }, navigate);
                                                        } else {
                                                            setOtpSent(true);
                                                            sendOtp(values.mobileNo);
                                                        }
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
                                                            error={Boolean(touched.mobileNo && errors.mobileNo)}
                                                            sx={{ ...theme.typography.customInput }}
                                                        >
                                                            <InputLabel htmlFor="outlined-adornment-mobileNo-login">
                                                                Mobile Number
                                                            </InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-mobileNo-login"
                                                                type="mobileNo"
                                                                value={values.mobileNo}
                                                                name="mobileNo"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Mobile Number"
                                                                inputProps={{}}
                                                                onKeyPress={(event) => {
                                                                    var charCode = event.which ? event.which : event.keyCode;
                                                                    if (
                                                                        String.fromCharCode(charCode).match(/[^0-9]/g) ||
                                                                        event.target.value.length > 9
                                                                    ) {
                                                                        event.preventDefault();
                                                                    }
                                                                    if (event.key === 'Enter' && buttonRef.current) {
                                                                        buttonRef.current.click();
                                                                    }
                                                                }}
                                                            />
                                                            {touched.mobileNo && errors.mobileNo && (
                                                                <FormHelperText error id="standard-weight-helper-text-mobileNo-login">
                                                                    {errors.mobileNo}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>

                                                        {otpSent && (
                                                            <>
                                                                <Stack
                                                                    direction="row"
                                                                    alignItems="center"
                                                                    justifyContent="flex-end"
                                                                    spacing={1}
                                                                >
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        color="secondary"
                                                                        sx={{ textDecoration: 'none', cursor: 'pointer' }}
                                                                        onClick={() => sendOtp(values.mobileNo)}
                                                                    >
                                                                        Resent OTP
                                                                    </Typography>
                                                                </Stack>
                                                                <FormControl
                                                                    fullWidth
                                                                    error={Boolean(touched.mobileNo && errors.mobileNo)}
                                                                    sx={{ ...theme.typography.customInput }}
                                                                >
                                                                    <InputLabel htmlFor="outlined-adornment-mobileNo-login">OTP</InputLabel>
                                                                    <OutlinedInput
                                                                        id="outlined-adornment-mobileNo-login"
                                                                        value={values.otp}
                                                                        name="otp"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        label="OTP"
                                                                        inputProps={{}}
                                                                        error={touched.otp && errors.otp}
                                                                        onKeyPress={(event) => {
                                                                            var charCode = event.which ? event.which : event.keyCode;
                                                                            if (
                                                                                String.fromCharCode(charCode).match(/[^0-9]/g) ||
                                                                                event.target.value.length > 5
                                                                            ) {
                                                                                event.preventDefault();
                                                                            }
                                                                            if (event.key === 'Enter' && buttonRef.current) {
                                                                                buttonRef.current.click();
                                                                            }
                                                                        }}
                                                                    />
                                                                    {touched.otp && errors.otp && (
                                                                        <FormHelperText
                                                                            error
                                                                            id="standard-weight-helper-text-mobileNo-login"
                                                                        >
                                                                            {errors.otp}
                                                                        </FormHelperText>
                                                                    )}
                                                                </FormControl>
                                                            </>
                                                        )}

                                                        {errors.submit && (
                                                            <Box sx={{ mt: 3 }}>
                                                                <FormHelperText error>{errors.submit}</FormHelperText>
                                                            </Box>
                                                        )}

                                                        <Box sx={{ mt: 2 }}>
                                                            <AnimateButton>
                                                                <Button
                                                                    ref={buttonRef}
                                                                    disableElevation
                                                                    disabled={isSubmitting}
                                                                    fullWidth
                                                                    size="large"
                                                                    type="submit"
                                                                    variant="contained"
                                                                    color="secondary"
                                                                >
                                                                    {otpSent ? 'Verify' : 'Send OTP'}
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
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }} md={4}>
                                <div></div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AuthWrapper1>
        </>
    );
};

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => ({
    sendOtp: (mobileNo) => dispatch(generateOTP(mobileNo)),
    verifyUserOtp: (data, navigate) => dispatch(verifyOTP(data, navigate))
});

export default connect(mapStateToProps, mapDispatchToProps)(Otp);
