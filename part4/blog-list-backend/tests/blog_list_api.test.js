const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blogs')

const initialBlogs = [
    {
        title: "Data Structrues and Algo",
        author: "Matt",
        url: "https://fullstackopen.com/en/part3",
        likes: 700
    },
    {
        title: "Frontend Libraires",
        author: "Quincy",
        url: "https://freecodecamp.com/en/part3",
        likes: 400
    },

]

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of initialBlogs) {
        let blogObj = new Blog(blog)
        await blogObj.save()
    }
})

test('blogs are return as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog has id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()

})

test('create new post successfully', async () => {
    const newBlog = {
        title: "Responsive Web design",
        author: "Matt",
        url: "https://fullstackopen.com/en/part4",
        likes: 900
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogList = response.body
    const titles = blogList.map(n => n.title)

    expect(blogList).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('Responsive Web design')
})

test('set like to 0 when like missing', async () => {
    const newBlog = {
        title: 'Responsive Web design 2',
        author: 'Matt2',
        url: 'https://fullstackopen.com/en/part5'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogList = response.body
    const addedBlog = blogList.filter(blog => blog.title === newBlog.title)
    expect(addedBlog[0].likes).toBe(0)
})

test('blog without title and url is not added', async () => {
    const newBlog = {
        author: "Matt",
        likes: 900
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})