import React from 'react'
import classes from './login.module.css';
import signinicon from '../../assets/login/googlesignin.png';
import Fade from 'react-reveal/Fade';
const Login = (props) => {
    return (
        <Fade bottom>
        <div className={classes.login}>
            <p className={classes.asktext}>Please sign in or continue as guest</p>
            <img onClick={props.signin} src={signinicon} alt={'signin'}></img>
        </div>
        </Fade>
    )
}

export default Login
