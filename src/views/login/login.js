import React from 'react'
import classes from './login.module.css';
import signinicon from '../../assets/login/googlesignin.png';
import Flip from 'react-reveal/Fade';
import Leaderboard from '../leaderboard/leaderboard';
const Login = (props) => {
    return (
        <Flip top>
        <div className={classes.login}>
            <p className={classes.asktext}>Please sign in</p>
            <p className={classes.providertext}>More login providers and anonymous login coming soon.</p>
            <img className={classes.signinimage} onClick={props.signin} src={signinicon} alt={'signin'}></img>
            </div>
            <Leaderboard/>
        </Flip>
    )
}

export default Login
