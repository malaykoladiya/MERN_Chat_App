// Importing necessary dependencies
import React, { useState } from 'react'
import Gender from './Gender'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

// Defining the SignUp component
const SignUp = () => {
    
    // Setting up state for form inputs
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    })

    // Calling the useSignup hook to handle signup functionality
    const {loading, signup} = useSignup();

    // Handling checkbox change event
    const handleCheckboxChange = gender =>{
        setInputs({...inputs, gender})
    }

    // Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(inputs);
    };
  
    // Rendering the SignUp component
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto border border-black border-opacity-50 rounded-lg shadow-xl'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-50'>
                    Sign Up <span className='text-gray-50'>ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-50'>First Name</span>
                        </label>
                        <input type='text' placeholder='John' className='w-full input input-bordered h-10'
                            value={inputs.firstName}
                            onChange={(e) => setInputs({...inputs, firstName: e.target.value})}/>
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-50'>Last Name</span>
                        </label>
                        <input type='text' placeholder='Doe' className='w-full input input-bordered h-10'
                        value={inputs.lastName}
                        onChange={(e) => setInputs({...inputs, lastName: e.target.value})} />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-50'>Username</span>
                        </label>
                        <input type='text' placeholder='johndoe' className='w-full input input-bordered h-10'
                        value={inputs.username}
                        onChange={(e) => setInputs({...inputs, username: e.target.value})}/>
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-50'>Password</span>
                        </label>
                        <input type='password' placeholder='Enter Password' className='w-full input input-bordered h-10'
                        value={inputs.password}
                        onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-50'>Confirm Password</span>
                        </label>
                        <input type='password' placeholder='Confirm Password' className='w-full input input-bordered h-10'
                        value={inputs.confirmPassword}
                        onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}/>
                    </div>

                    {/* Rendering the Gender component */}
                    <Gender onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

                    {/* Link to login page */}
                    <Link to={'/login'} className='text-sm text-gray-50 hover:underline hover:text-yellow-300 mt-4 inline-block' >
                        Already have an account?
                    </Link>

                    <div>
                        {/* Sign up button */}
                        <button className='btn btn-block btn-sm mt-2 border-slate-700' disabled={loading}> 
                            {loading ? <span className='loading loading-spinner'> </span> : "Sign Up"} 
                        </button>
                    </div> 
                </form>
            </div>
        </div>
    )
}

export default SignUp
