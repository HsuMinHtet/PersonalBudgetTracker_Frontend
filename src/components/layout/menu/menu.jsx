import { Link } from 'react-router-dom';
import { ArrowDown2 } from 'iconsax-react';

function menu() {
    return (
        <nav>
            <Link to="/login" className="mx-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor">Login</Link>
            <Link to="/register" className="mx-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor">Register</Link>

            <div className='inline-block mx-3'>
                <div className="flex items-center">
                    <span>Hello,</span>
                    <Link to="/register" className="m-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor">User Name</Link>
                    <ArrowDown2 size="24" className="text-textColor dark:text-darkTextColor" title="Dropdown Menu" />
                </div>
            </div>
        </nav>
    );
}

export default menu;
