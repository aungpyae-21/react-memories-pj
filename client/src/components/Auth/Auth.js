import React,{useState} from 'react'
import {GoogleLogin} from 'react-google-login'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import useStyle from './style'
import Input from './Input';
import {signUp, signIn} from '../../action/auth'

const Auth = () => {
    const State = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
    const classes = useStyle()
    const dispatch = useDispatch()
    const history = useHistory()
    const [formData, setFormData] = useState(State)
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignUp){
            dispatch(signUp(formData, history))
        }else{
            dispatch(signIn(formData, history))
        }
    }
    const handleChange = (e) => {
       
        setFormData({...formData, [e.target.name] : e.target.value })
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const switchMode = () => {
        setIsSignUp(!isSignUp)
    }
    const googleSuccess = async(res) => {
        // console.log(res)
        const result = res.profileObj
        const token = res.tokenId
        try {
            dispatch({type:"AUTH", payload:{result,token}})
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (error) => {
        console.log({error})
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">{isSignUp ? 'Sign Up': 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignUp ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin 
                        clientId="119980826967-05v9o764qijpb9d9b31o2lrp114i7176.apps.googleusercontent.com"
                        render = {(renderProps) => (
                            <Button 
                                color="primary"
                                className={classes.googleButton}
                                variant="contained"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                fullWidth
                            >
                                Google log in
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Button onClick={switchMode}>
                            { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                          </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
