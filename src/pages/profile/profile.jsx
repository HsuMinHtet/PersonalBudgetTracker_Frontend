import categoryImg from '../../assets/img/category-img.svg';
import { Avatar } from '../../components/common';
import ProfileMenu from "../../components/layout/profileMenu/profileMenu.jsx";

function Profile() {

    return (
        <div className='flex items-start justify-center flex-col max-w-screen-lg px-4'>
            
            <div className='flex items-center justify-center flex-column'>
                <div>
                    <h1 className='font-black text-2xl'>Customize Your Categories</h1>
                    <p className='py-4 mb-4'>This is your hub for managing transition categories! Easily add new categories with the Add Category button to tailor your budget tracker to your unique needs. Group your income and expenses into meaningful categories, making it simple to review and analyze your financial habits. Stay in control of your budget by keeping your categories organized and up-to-date!</p>
                </div>
                <img src={categoryImg} alt="Categories" className="h-60 w-60 p-6" />
            </div>

            <div className='flex flex-column px-4'>

                <div className="flex flex-col border-solid border-r-2 border-borderColor dark:border-darkBorderColor px-4">

                    <Avatar name='Hsu Min Htet' tailwindClass='border-solid border-2 border-borderColor dark:border-darkBorderColor mb-10' />

                    <ProfileMenu />

                </div>

                <div className="flex flex-col px-4">

                    <h2 className="text-2xl font-bold">Personal Info</h2>
                    <div className="flex flex-row">

                        <label>User Name</label>
                        <p>Hsu Min Htet</p>

                    </div>


                </div>


            </div>

            

        </div>
    );
}

export default Profile;
