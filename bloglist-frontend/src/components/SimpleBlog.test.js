import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Testing component',
    author: 'Robert',
    likes: 5
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const element = component.getByText('Testing component Robert')
  expect(element).toBeDefined()

  const element2 = component.getByText('blog has 5 likes')
  expect(element2).toBeDefined()
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Testing component',
    author: 'Robert',
    likes: 5
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})