import React,{useState, useEffect} from 'react'
import {AppBar, Avatar, Button, Toolbar, Typography} from "@material-ui/core"
import {Link, useHistory,useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import decode from 'jwt-decode'
import useStyle from './style'

const Navbar = () => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))


    useEffect(() => {
        const token = user?.token;

        if(token){
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) return logout()
        }


        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

    const logout = () => {
        dispatch({type:'LOGOUT'})
        setUser(null)
        history.push('/')
    }
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl} >{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button color="secondary" variant="contained" onClick={logout}>Log Out</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary" >Log In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
