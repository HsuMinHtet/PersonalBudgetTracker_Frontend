import { Button } from '../../components/common';
import InputText from '../../components/common/InputText';
import resetImg from '../../assets/img/reset-img.svg';

function register() {

    return (
        <div className='flex items-center justify-center flex-row max-w-screen-lg p-4'>
            <img src={resetImg} alt="Budget App Home Page Illustration" className="h-96 w-96 p-6 mr-6" />
            <div className='bg-cardBg dark:bg-darkCardBg p-12'>
                <h1 className='font-black text-2xl mb-12 px-3'>Reset Password</h1>
                    <InputText type='email' labelFor='userEmail' labelName='Email' inputId='userEmail' name='Email' placeholder="Enter Email" />
                <Button text='Reset' variant="primary" tailwindClass="w-full mt-12" />
            </div>
        </div>
    )
}

export default register;
