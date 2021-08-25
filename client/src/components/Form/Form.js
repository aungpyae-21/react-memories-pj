import React, {useState, useEffect} from 'react'
import {TextField,Paper,Button,Typography} from '@material-ui/core'
import Filebase from 'react-file-base64'
import {useDispatch, useSelector} from 'react-redux'
import {createPosts, updatePost} from '../../action/posts'
import { useHistory } from 'react-router-dom'
import useStyle from './styles'

const Form = ({currentId, setCurrentId}) => {
    const [postData , setPostData] = useState({
        title:'', message:'', tags:'', selectedFile:''
    })
    const classes = useStyle();
    const dispatch = useDispatch();
    const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId ) : null));
    const user = JSON.parse( localStorage.getItem('profile'))
    const history = useHistory()

    useEffect(() => {
        if(post) return setPostData(post)
    },[post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId,{...postData, name:user?.result?.name}))
        }else{
            dispatch(createPosts({...postData, name:user?.result?.name,},history))
            
        }
        clear()
    }
    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in and create posts
                </Typography>
            </Paper>
        )
    }
    const clear = () => {
        setCurrentId(null)
        setPostData({ title: '', message: '', tags: '',selectedFile: '' });
    }

    
    return (
        <Paper className={classes.paper} raised elevation={6}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? "Editing" : "Creat"} The Memories</Typography>
            {/* <TextField 
                name="creator"
                variant="outlined"
                label="Creator"
                fullWidth
                value={postData.creator}
                onChange={(e) => setPostData({...postData,creator:e.target.value})}
            /> */}
            <TextField 
                name="title"
                variant="outlined"
                label="Title"
                fullWidth
                value={postData.title}
                onChange={(e) => setPostData({...postData,title:e.target.value})}
            />
            <TextField 
                name="message"
                variant="outlined"
                label="Message"
                fullWidth
                value={postData.message}
                onChange={(e) => setPostData({...postData,message:e.target.value})}
            />
            <TextField 
                name="tags"
                variant="outlined"
                label="Tags"
                fullWidth
                value={postData.tags}
                onChange={(e) => setPostData({...postData,tags:e.target.value.split(',')})}
            />
            <div className={classes.fileInput}>
                <Filebase
                    type="file"
                    multiple={false}
                    onDone ={({base64}) => setPostData({...postData,selectedFile:base64 }) }
                />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" type="submit" color="primary" size="large" fullWidth>Submit</Button>
            <Button  variant="contained" onClick={clear} color="secondary" size="large" fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
