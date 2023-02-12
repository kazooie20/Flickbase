import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { errorHelper, Loader } from '../../utils/tools';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { registerUser, signInUser } from '../../store/actions/users';
import PreventSignin from '../../hoc/preventSignin';

const Auth = () => {
    //COMP Logic
    const [register, setRegister] = useState(false);
    let navigate = useNavigate();
    //REDUX
    const users = useSelector((state) => state.users);
    const notification = useSelector(state => state.notification);
    const dispatch = useDispatch();

    //FORMIK IMPLEMENTATION 
    const formik = useFormik({
        initialValues: {
            email: 'francis@gmail.com',
            password: 'testing123'
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Sorry, the email is required")
                .email("This is not a valid email"),
            password: Yup.string()
                .required('Sorry the password is required')
        }),
        onSubmit: (values) => {
            handleSubmit(values)
        }

    })

    //Helper Functions for form 
    const handleSubmit = (values) => {

        if (register) {
            dispatch(registerUser(values));
        }
        else {
            dispatch(signInUser(values));
        }
    }

    React.useEffect(() => {
        if (notification && notification.global.success) {
            navigate('/dashboard');

        }

    }, [notification])

    return (
        <PreventSignin users={users}>
            <div className='auth_container'>
                <h1>Authenticate</h1>
                {users.loading ? <Loader /> :
                    <Box component="form" sx={{
                        '& .MuiTextField-root': { width: '100%', marginTop: '20px' },
                    }} onSubmit={formik.handleSubmit}>
                        <TextField name="email" label="Enter your email" variant="outlined" {...formik.getFieldProps('email')} {...errorHelper(formik, 'email')} />
                        <TextField name="password" label="Enter your password" variant="outlined" type="password" {...formik.getFieldProps('password')} {...errorHelper(formik, 'password')} />

                        <div className='mt-2'>
                            <Button variant='contained' color='primary' type='submit' size='large'>
                                {register ? 'Register' : 'Login'}
                            </Button>
                            <Button className='mt-3' variant='outlined' color='secondary' size='small' onClick={() => setRegister(!register)} >
                                Click here to {!register ? 'Register' : 'Login'}
                            </Button>
                        </div>

                    </Box>
                }
            </div>
        </PreventSignin>

    )
}

export default Auth;