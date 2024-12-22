import React from 'react';
import { Link } from 'react-router-dom';
import login from '../assets/Lottie/login.json'
import Lottie from 'lottie-react';
import GoogleSignIn from './GoogleSignIn';
import useAuthHook from '../Hooks/useAuthHook';

const Login = () => {

    const {signInUser} = useAuthHook();

    const handleLogin = (e) => {
        e.preventDefault()

        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log('user:', email, password);

        signInUser(email, password)
        .then(result => {
            console.log('Signin done:', result.user);
        })
        .catch(error => {
            console.log(error.message);
        })

    }
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie animationData={login}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl border">
                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-5xl font-bold text-center mb-5">Login now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="email" placeholder="enter your email" className="input input-bordered rounded-md" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="enter your password" className="input input-bordered rounded-md" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn rounded-md btn-primary">Login</button>
                        </div>

                        <div>
                            <GoogleSignIn></GoogleSignIn>
                        </div>

                        <p className='text-center mt-5'>New here? <Link className='underline font-bold text-red-600' to='/register'>create an account!</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;