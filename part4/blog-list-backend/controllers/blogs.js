const blogsRouter = require('express').Router()

const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.title && !body.url) {
        response.status(400).end()
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    const savedBlog = await blog.save()
    response.json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    console.log('requ', request.body, request.params.id)

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
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter