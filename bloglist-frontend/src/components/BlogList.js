import React from 'react'
import Notification from './Notification'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'

const BlogList = ({
  blogs,
  setBlogs,
  user,
  handleLogout,
  message,
  setMessage
}) => {

  const blogFormRef = React.createRef()

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message}/>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel="create new" ref={blogFormRef}>
          <BlogForm user={user} setMessage={setMessage} blogs={blogs} setBlogs={setBlogs}/>
        </Togglable>

        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>
          )
        }
      </div>
    )
  }

  return null
}

export default BlogList