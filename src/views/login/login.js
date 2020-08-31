import React from 'react'
import classes from './login.module.css';
import signinicon from '../../assets/login/googlesignin.png';
import Flip from 'react-reveal/Flip';
const Login = (props) => {
    return (
        <Flip cascade top>
        <div className={classes.login}>
            <p className={classes.asktext}>Please sign in or continue as guest</p>
            <img onClick={props.signin} src={signinicon} alt={'signin'}></img>
        </div>
        </Flip>
    )
}

export default Login
