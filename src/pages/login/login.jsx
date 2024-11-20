import { useState } from 'react';
import Button from '../../components/common/Button';
import InputText from '../../components/common/InputText';
import InputPassword from '../../components/common/Password';
import Link from '../../components/common/Link';
import loginImg from '../../assets/img/login-img.svg';

function Login() {
    // State to store username and password input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handle input changes
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Log the captured username and password to console
        console.log("Username:", username);
        console.log("Password:", password);

        setError('');
    };

    return (
        <div className='flex items-center justify-center flex-row max-w-screen-lg p-4'>
            <img src={loginImg} alt="Budget App Home Page Illustration" className="h-96 w-96 p-6 mr-6" />
            <div className='bg-cardBg dark:bg-darkCardBg p-12'>
                <h1 className='font-black text-2xl mb-12 px-3'>Login</h1>

                {/* Show error message if any */}
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <InputText
                        type='text'
                        labelFor='userName'
                        labelName='User Name'
                        inputId='userName'
                        inputName='User Name'
                        placeholder="Enter User Name"
                        value={username}         // Bind the username input to state
                        onChange={handleUsernameChange}  // Handle change in username
                    />
                    <InputPassword
                        type='password'
                        labelFor='userPassword'
                        labelName='Password'
                        inputId='userPassword'
                        inputName='Password'
                        placeholder="Enter Password"
                        value={password}         // Bind the password input to state
                        onChange={handlePasswordChange}  // Handle change in password
                    />
                    <Link
                        href="/reset"
                        text="Forgot Password?"
                        tailwindClass="text-xs ml-4"
                    />
                    <Button
                        type="submit"  // The button is of type 'submit' to trigger form submission
                        text='Login'
                        variant="primary"
                        tailwindClass="w-full mt-12"
                    />
                </form>
            </div>
        </div>
    );
}

export default Login;
