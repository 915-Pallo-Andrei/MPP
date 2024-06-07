import {Link} from 'react-router-dom';
import './Header.css';
import { Button } from '@mui/material';

const Header = () => {
    return (
    <>
        <div className='login-register-button'>
            <Link to='/login' className='link'>
                <Button variant="contained">Login</Button>
            </Link>
            <Link to='/register' className='link'>
                <Button variant="contained">Register</Button>
            </Link>
        </div>
        <div className='header' data-testid='header-test-id'>
            <nav className='navbar'>
                <div className='title'>Medevices</div>
                <div className='menu'>
                    <div>
                        <Link to='/' className='link'>
                            Show Devices
                        </Link>
                    </div>

                {localStorage.getItem('username') && ( <div>
                    <Link to='/addDevice' className='link'>
                        Add Device
                    </Link>
                </div>)}

                    <div>
                        <Link to='/brands' className='link'>
                            Show Brands
                        </Link>
                    </div>

                    <div>
                        <Link to='/addBrand' className='link'>
                            Add Brand
                        </Link>
                    </div>

                    <div>
                        <Link to='/Statistics' className='link'>
                            Statistics
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    </>
    );
};

export {Header};
