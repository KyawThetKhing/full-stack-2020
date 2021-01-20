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

const blogsInDB = async () => {
    const blogs = await Blog.find({})

    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDB
}