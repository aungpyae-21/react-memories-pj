import React,{useEffect} from 'react'
import { Pagination, PaginationItem} from '@material-ui/lab'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

import {getPosts} from '../../action/posts'

import useStyle from './style'

const Paginate = ({page}) => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const {numberOfPage} = useSelector((state) => state.posts);

    useEffect(() =>{
        if(page) dispatch(getPosts(page))
    },[page])
    return (
        <Pagination
            classes = {{ul: classes.ul}}
            count = {numberOfPage}
            page = {Number(page) || 1}
            variant = "outlined"
            color = "primary"
            renderItem = {(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
            )}
        />
    )
}


export default Paginate
