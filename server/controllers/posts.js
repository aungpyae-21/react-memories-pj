const Post = require('../models/posts')
const mongoose = require('mongoose');
const { update } = require('../models/posts');

exports.getPosts = async (req,res) =>{
    const {page} = req.query
    try {
        const Limit = 8;
        const skip = (Number(page) -1) * Limit
        const total = await Post.countDocuments({})

        const posts = await Post.find().sort({_id:-1}).limit(Limit).skip(skip);
        res.status(200).json({data:posts, currentPage:Number(page), numberOfPage:Math.ceil(total/Limit)});
    } catch (error) {
        res.status(404).json(error)
    }
}
exports.getPostDetail = async(req,res) => {
    const {id} = req.params
    try {
        const postDetail = await Post.findById(id)
        res.status(200).json(postDetail)
    } catch (error) {
        res.status(404).json(error)
    }
}
exports.getPostsBySearch = async (req, res) =>{
    const {searchQuery, tags} = req.query
    try {
        const title = new RegExp(searchQuery, 'i')
        const posts = await Post.find({
            $or:[
                {title},
                {tags:{
                    $in:tags.split(',')
                }}
            ]
        }) 
        res.status(200).json({data:posts})
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.createPosts = async (req,res) => {
    const data = req.body;
    
    const newPost = new Post({...data,creator:req.userId, createdAt:new Date().toISOString()});
    try {
        await newPost.save()
        res.status(201).json(newPost)    
    } catch (error) {
        res.status(409).json(error)
    }
}

exports.updatePost = async (req,res) => {
    const {id:_id} = req.params;
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with that id')

    const updatedPost = await Post.findByIdAndUpdate(_id, post, {new:true})
    res.json(updatedPost)
}

exports.deletePost = async(req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with that id')

    await Post.findByIdAndDelete(id)
    res.send("Post deleted success")
    
}

exports.likePost = async(req,res) => {
    const {id} = req.params;

    if(!req.userId) return res.status(401).json({message: "Unauththenticated"})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with that id')

    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId))
    if(index === -1){
        post.likes.push(req.userId)
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatePost = await Post.findByIdAndUpdate(id, post , {new:true})

    res.send(updatePost)
}

exports.commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await Post.findById(id);

    post.comments.push(value);

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};