const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : blogs.reduce((sum, currentValue) => {
        return sum + currentValue.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    return sortedBlogs[0];
}

const mostBlogs = (blogs) => {
    const authorArray = blogs.map((b) => b.author);

    let count = 1;
    let m = 0;
    let item;
    for (let i = 0; i < authorArray.length; i++) {
        for (let j = i; j < authorArray.length; j++) {
            if (authorArray[i] == authorArray[j]) m++;
            if (count < m) {
                count = m;
                item = authorArray[i];
            }
        }
        m = 0;
    }
    return {
        author: item,
        blogs: count,
    };

}

const mostLikes = (blogs) => {
    let authorLikes = blogs.reduce((op, { author, likes }) => {
        op[author] = op[author] || 0
        op[author] += likes
        return op
    }, {})

    let mostLikes = Object.keys(authorLikes).sort((a, b) => authorLikes[b] - authorLikes[a])[0]

    return {
        author: mostLikes,
        likes: authorLikes[mostLikes]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}