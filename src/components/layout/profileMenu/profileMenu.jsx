import { Link } from "react-router-dom";

function profileMenu() {

    return (
        <nav>
            <div className="flex flex-col">
                <Link
                    className="m-2 color-textColor text-primaryTextColor font-bold hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
                >
                    Personal Info
                </Link>
                <Link
                    className="m-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
                >
                    Change Password
                </Link>
                <Link
                    className="m-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
                >
                    Delete Account
                </Link>
            </div>
        </nav>
    );
}

export default profileMenu;
