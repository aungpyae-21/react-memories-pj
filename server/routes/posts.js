const router = require('express').Router();
const auth = require('../middleware/auth')
const {getPostsBySearch,getPostDetail, getPosts,createPosts, updatePost, deletePost, likePost, commentPost} = require('../controllers/posts')

router.get('/search',getPostsBySearch)
router.get('/',getPosts)
router.get('/:id',getPostDetail)
router.post('/',auth, createPosts)
router.patch('/:id',auth, updatePost)
router.delete('/:id',auth, deletePost)
router.patch('/:id/likepost',auth,likePost)
router.post('/:id/comments', auth, commentPost)

module.exports = router;