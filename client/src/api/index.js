import axios from 'axios'

const API = axios.create({baseURL:"http://localhost:5000"})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPosts = (page) => API.get(`/api/posts?page=${page}`)
export const fetchPostDetail = (id) => API.get(`/api/posts/${id}`) 
export const fetchPostBySearch = (searchQuery) => API.get(`/api/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`)
export const createPosts = (newPost) => API.post('/api/posts', newPost)
export const updatePost = (id,updateData) => API.patch(`/api/posts/${id}`,updateData)
export const deletePost = (id) => API.delete(`/api/posts/${id}`)
export const likePost = (id) => API.patch(`/api/posts/${id}/likepost`)
export const comment = (value, id) => API.post(`/api/posts/${id}/comments`, { value });

export const signIn = (formData) => API.post('/api/user/signin', formData)
export const signUp = (formData) => API.post('/api/user/signup', formData)