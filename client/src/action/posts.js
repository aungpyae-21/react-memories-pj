import * as api from '../api';

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type:"START_LOADING"})
        const {data} = await api.fetchPosts(page)
        
        dispatch({type:"FETCH_ALL", payload: data})
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)
    }
}
export const getPostDetail = (id) => async (dispatch) => {
    try {
        dispatch({type:"START_LOADING"})
        const {data} = await api.fetchPostDetail(id)
        dispatch({type:"FETCH_POST", payload: data})
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type:"START_LOADING"})
        const {data:{data}} = await api.fetchPostBySearch(searchQuery)
        dispatch({type:"FETCH_BY_SEARCH", payload: data})
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)        
    }
}

export const createPosts = (postData,history) => async (dispatch) => {
    try {
        dispatch({type:"START_LOADING"})
        const {data} = await api.createPosts(postData)
        dispatch({type:"CREATE", payload:data})
        history.push(`/posts/${data._id}`)
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id,updateData) => async(dispatch) => {
    try {
        const {data} = await api.updatePost(id,updateData)
        dispatch({type:'UPDATE', payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({type:'DELETE', payload:id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const {data} = await api.likePost(id)
        dispatch({type:'LIKE', payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);
  
      dispatch({ type: "COMMENT", payload: data });
  
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };