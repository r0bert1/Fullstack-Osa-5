import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = (props) => {

  if (props.user === null) {

    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={props.message}/>
        <form onSubmit={props.handleLogin}>
          <div>
            käyttäjätunnus
              <input
              type="text"
              value={props.username}
              name="Username"
              onChange={({ target }) => props.setUsername(target.value)}
            />
          </div>
          <div>
            salasana
              <input
              type="password"
              value={props.password}
              name="Password"
              onChange={({ target }) => props.setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return null
}

const Blogs = ({ blogs, user, handleLogout, message, setMessage }) => {

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message}/>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <BlogForm user={user} setMessage={setMessage}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return null
}

const BlogForm = ({ user, setMessage }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateNew = async (event) => {
    event.preventDefault()

    try {
      const userId = user.userId

      await blogService.create({
        title, author, url, userId,
      })

      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log('Error adding blog')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="Text"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="Text"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="Text"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const Notification = ({ message }) => {
  const messageStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    
    setUser(null)
    setUsername('')
    setPassword('')
  }

  
  

  return (
    <div>

      <LoginForm 
        handleLogin={handleLogin} 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        user={user}
        message={message}
      />

      <Blogs blogs={blogs} user={user} handleLogout={handleLogout} message={message} setMessage={setMessage}/>
    </div>
  )
}

export default App