import changepasswordImg from '../../assets/img/changepassword-img.svg';
import { Avatar, InputPassword, Button } from '../../components/common';
import ProfileMenu from "../../components/layout/profileMenu/profileMenu.jsx";

function ChangePassword() {

    return (
        <div className='flex flex-col max-w-screen-lg px-4'>

            <div className='flex items-center justify-center flex-column'>
                <div>
                    <h1 className='font-black text-2xl'>Your Personal Hub: Manage & Secure Your Profile</h1>
                    <p className='py-4 mb-4'>The Profile Page in the Budget Tracker app is your personal space for managing account information. Here, you can view the details you provided during registration, such as your name and email, and update them as needed. This page also allows you to securely change your password to keep your account safe. Designed with simplicity and convenience in mind, the Profile Page ensures that managing your personal information is easy and hassle-free, giving you more time to focus on tracking your finances effectively.</p>
                </div>
                <img src={changepasswordImg} alt="Change Password" className="h-60 w-60 p-6" />
            </div>

            <div className='flex flex-column'>

                <div className="flex flex-col border-solid border-r-2 border-borderColor dark:border-darkBorderColor px-4">

                    <Avatar name='Hsu Min Htet' tailwindClass='border-solid border-2 border-borderColor dark:border-darkBorderColor mb-10' />

                    <ProfileMenu />

                </div>

                <div className="flex flex-col px-4 w-full">

                    <div className="flex flex-row mb-12 items-center justify-between">
                        <h2 className="text-2xl font-bold">Change Password</h2>
                    </div>

                    <div className="flex flex-col mb-4 w-max">

                        {/* <InputPassword
                            type="password"
                            labelFor="currentPassword"
                            labelName="Current Password"
                            inputId="currentPassword"
                            inputName="Current Password"
                            placeholder="Enter Password"
                        /> */}

                        <InputPassword
                            type="password"
                            labelFor="newPassword"
                            labelName="New Password"
                            inputId="newPassword"
                            inputName="New Password"
                            placeholder="Enter New Password"
                        />

                        <InputPassword
                            type="password"
                            labelFor="verifyPassword"
                            labelName="Verify Password"
                            inputId="verifyPassword"
                            inputName="Verify Password"
                            placeholder="Enter Verify Password"
                        />

                        <Button
                            type="submit"
                            text="Change Password"
                            variant="primary"
                            tailwindClass="inline-block mt-12 w-full"
                        />

                    </div>

                </div>


            </div>



        </div>
    );
}

export default ChangePassword;
