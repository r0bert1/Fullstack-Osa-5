import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

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

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Testing component',
    author: 'Robert',
    likes: 5
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  //component.debug()

  const button = component.getByText('like')
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
})