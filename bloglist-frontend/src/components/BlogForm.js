import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useField } from '../hooks/index'

const BlogForm = ({ user, setMessage, blogs, setBlogs }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateNew = async (event) => {
    event.preventDefault()

    try {
      const userId = user.userId

      const newBlog = await blogService.create({
        title, author, url, userId,
      })

      console.log(newBlog)

      setBlogs(blogs.concat(newBlog))
      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      setMessage('unable to add blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const { reset: resetTitle, ...blogTitle } = useField('text', 'Title', title, setTitle)
  const { reset: resetAuthor, ...blogAuthor } = useField('text', 'Author', author, setAuthor)
  const { reset: resetUrl, ...blogUrl } = useField('text', 'Url', url, setUrl)


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <div>
          title:
          <input {...blogTitle}/>
        </div>
        <div>
          author:
          <input {...blogAuthor}/>
        </div>
        <div>
          url:
          <input {...blogUrl}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm