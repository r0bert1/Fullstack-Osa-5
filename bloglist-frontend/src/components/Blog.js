import React, { useState, } from 'react'
import blogService from '../services/blogs'

const RemoveButton = ({ currentUser, clickHandler, blog }) => {

  if (currentUser.userId === blog.user.id) {
    return (
      <button onClick={clickHandler}>remove</button>
    )
  }

  return null
}

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [expand, setExpand] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    await blogService.update(blog.id, updatedBlog)

    setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
  }

  const handleRemoval = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)

      const removedBlogId = blog.id

      setBlogs(blogs.filter(blog => blog.id !== removedBlogId))
    }
  }

  const blogView = () => {
    if (expand) {
      return (
        <div style={blogStyle}>
          <div onClick={() => setExpand(!expand)}>
            {blog.title} {blog.author} <br/>
            {blog.url} <br/>
            {blog.likes} likes
            <button onClick={handleLike}>like</button> <br/>
            added by {blog.user.name} <br/>
            <RemoveButton currentUser={user} clickHandler={handleRemoval} blog={blog}/>
          </div>
        </div>
      )
    }

    return (
      <div style={blogStyle}>
        <div onClick={() => setExpand(!expand)}>
          {blog.title} {blog.author}
        </div>
      </div>
    )
  }

  return (
    <div>
      {blogView()}
    </div>
  )
}

export default Blog