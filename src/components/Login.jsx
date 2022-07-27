import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserName } from '../store/slices/userName.slice';
import { useNavigate } from 'react-router-dom';

// import img
import ash from '../../img/Ash.png';
import pokeball from '../../img/pokeball2.png';

const Login = () => {
    const [ userName_st, setUserName_st ] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submit = e => {
        e.preventDefault();
        dispatch(setUserName(userName_st));
        navigate('/pokedex');
    }

    return (
        <div className='container-login'>
            <div className="pokeball">
                <img src={pokeball}/>
            </div>
            <div className="content-">
                <div className="hero">
                    <span>Hello trainer!</span>
                    {/* <img src="../img/Ash.png"/> */}
                    <img src={ash}/>
                </div>
                <form onSubmit={submit}>
                    <span>Give me your name to start</span>
                    <input type="text" placeholder='Insert name' value={userName_st} onChange={e => setUserName_st(e.target.value)}/>
                    <button>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;