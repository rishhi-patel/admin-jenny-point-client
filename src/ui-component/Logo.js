// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = ({ small = false }) => {
    const theme = useTheme();

    return small ? (
        <img src={'https://newjennypoint.jennypoint.com/assets/images/logo/icon_jenny-point.svg'} alt="logo" style={{ height: 90 }} />
    ) : (
        <img src={'https://newjennypoint.jennypoint.com/assets/images/logo/logo_jenny-point.svg'} alt="logo" style={{ height: 60 }} />
    );
};

export default Logo;
