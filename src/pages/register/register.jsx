import Button from '../../components/common/Button';
import InputText from '../../components/common/InputText';
import InputPassword from '../../components/common/Password';
import InputTextarea from '../../components/common/Textarea';
import registerImg from '../../assets/img/register-img.svg';

function register() {

    return (
        <div className='flex items-center justify-center flex-row max-w-screen-lg p-4'>
            <img src={registerImg} alt="Budget App Home Page Illustration" className="h-96 w-96 p-6 mr-6" />
            <div className='bg-cardBg dark:bg-darkCardBg p-12'>
                <h1 className='font-black text-2xl mb-12'>Register</h1>
                <div className='flex items-center justify-center flex-row'>
                    <InputText type='text' labelFor='userName' labelName='User Name' inputId='userName' name='User Name' placeholder="Enter User Name" />
                    <InputText type='email' labelFor='userEmail' labelName='Email' inputId='userEmail' name='Email' placeholder="Enter Email" />
                </div>
                <div className='flex items-center justify-center flex-row'>
                    <InputText type='number' labelFor='userPhone' labelName='Phone' inputId='userPhone' name='Phone' placeholder="Enter Phone" />
                    <InputPassword type='password' labelFor='userPassword' labelName='Password' inputId='userPassword' name='Password' placeholder="Enter Password" />
                </div>
                <InputTextarea type='textarea' labelFor='userAddress' labelName='Address' inputId='userAddress' name='Address' placeholder="Enter Address" />
                <Button text='Register' variant="primary" tailwindClass="w-full mt-12" />
            </div>
        </div>
    )
}

export default register;
