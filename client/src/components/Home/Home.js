import React,{useState,useEffect} from 'react'
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from "@material-ui/core"
import {useDispatch} from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'


import Post from '../Posts/Posts'
import Form from '../Form/Form'
import Pagination from '../Pagination/Pagination'

import {getPosts, getPostBySearch} from '../../action/posts'
import useStyle from './style'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const[currentId, setCurrentId] = useState(null)
    const[search, setSearch] = useState('')
    const[tags, setTags] = useState([])
    const classes = useStyle()
    const dispatch = useDispatch()
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')

    // useEffect(()=>{
    //     dispatch(getPosts())
    // },[currentId,dispatch])

    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getPostBySearch({search, tags:tags.join(',')}))
            history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tags}`)
        }else{
            history.push('/')
        }
    }
    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            searchPost()
        }
    }

    const handleTagsAdd = (tag) => {
        setTags([...tags, tag])
    }
    const handleTagsDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete) )
    }
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Post setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                                name="search" 
                                variant="outlined" 
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} 
                                onKeyPress={handleKeyPress}
                            />
                            <ChipInput
                                style={{margin:'10px 0'}}
                                value={tags}
                                onAdd={handleTagsAdd}
                                onDelete={handleTagsDelete}
                                variant="outlined" 
                                label="Search Tags"
                                fullWidth
                            />
                            <Button className={classes.searchButton} onClick={searchPost} variant="contained" color="primary">Serach</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && 
                        
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page}/>
                            </Paper>
                        }
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
