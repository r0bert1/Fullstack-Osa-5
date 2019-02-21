import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { Blog } from './Blog'

test('only title and author are rendered by default', () => {
  const blog = {
    title: 'Testing component',
    author: 'Robert',
    url: '<insert url here>',
    likes: 5
  }

  const { getByText, queryByText } = render(
    <Blog blog={blog} />
  )

  let element = getByText('Testing component Robert')
  expect(element).toBeDefined()

  element = queryByText('5 likes')
  expect(element).toBeNull()

  element = queryByText('added by')
  expect(element).toBeNull()

  element = queryByText('<insert url here>')
  expect(element).toBeNull()
})

test('Additional info is rendered after clicking the blog', async () => {
  const blog = {
    title: 'Testing component',
    author: 'Robert',
    url: '<insert url here>',
    likes: 5,
    user: {
      username: 'r0bert1',
      name: 'Robert',
      userId: 1
    }
  }

  const user = {
    username: 'r0bert1',
    name: 'Robert',
    userId: 1
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.container.querySelector('.blogDisplay')
  fireEvent.click(button)

  component.debug()

  let element = component.getByText('Testing component Robert')
  expect(element).toBeDefined()

  element = component.getByText('5 likes')
  expect(element).toBeDefined()

  element = component.getByText('added by Robert')
  expect(element).toBeDefined()

  element = component.getByText('<insert url here>')
  expect(element).toBeDefined()
})