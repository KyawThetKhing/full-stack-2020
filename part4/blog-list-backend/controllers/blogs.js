const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blogs')
const User = require('../models/user')

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }

//     return null
// }

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    console.log('Post Post', request.token)
    const body = request.body
    // const token = getTokenFrom(request)
    // console.log("Token from post", request.token)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log('Token invalid', request.token, decodedToken)
    if (!request.token || !decodedToken.id) {
        console.log('token missing or invalid')
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!body.title && !body.url) {
        response.status(400).end()
    }

    // const user = await User.findById(body.userId)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    // console.log('requ', request.body, request.params.id)

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const editedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(editedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id || !request.token) {
        response.status(401).json({ error: 'token is missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    // console.log('blog', blog, decodedToken.id)
    if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'Unauthorized Access' })
    }
})

module.exports = blogsRouter