import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserName } from '../store/slices/userName.slice';

const Login = () => {
    const [ userName_st, setUserName_st ] = useState('');
    const dispatch = useDispatch();
    const submit = e => {
        e.preventDefault();
        dispatch(setUserName(userName_st));
    }

    return (
        <div>
            <h1>test login</h1>
            <form onSubmit={submit}>
                <input
                type="text"
                placeholder='Insert name'
                value={userName_st}
                onChange={e => setUserName_st(e.target.value)}
                />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Login;