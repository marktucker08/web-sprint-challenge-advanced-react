// Write your tests here
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react';
import AppFunctional from './AppFunctional';

let up, down, left, right, reset, submit
let squares, coordinates, steps, message, email

const updateStatelessSelectors = document => {
  up = document.querySelector('#up')
  down = document.querySelector('#down')
  left = document.querySelector('#left')
  right = document.querySelector('#right')
  reset = document.querySelector('#reset')
  submit = document.querySelector('#submit')
}

const updateStatefulSelectors = document => {
  squares = document.querySelectorAll('.square')
  coordinates = document.querySelector('#coordinates')
  steps = document.querySelector('#steps')
  message = document.querySelector('#message')
  email = document.querySelector('#email')
}

test('sanity', () => {
  expect(true).toBe(true)
})

test('render the component successfully', () => {
  render(<AppFunctional />)
      
})

test('check for coordinates, steps, squares', () => {
  render(<AppFunctional />)
      updateStatelessSelectors(document)
      updateStatefulSelectors(document)
      expect(coordinates).toBeVisible();
      expect(steps).toBeVisible();
      expect(squares).toBeTruthy();
      expect(message).toBeInTheDocument();
})

test('check for reset and submit buttons', () => {
  render(<AppFunctional />)
      updateStatelessSelectors(document)
      updateStatefulSelectors(document)
      expect(reset).toBeInTheDocument();
      expect(submit).toBeInTheDocument();
})

test('check for all buttons', () => {
  render(<AppFunctional />)
      updateStatelessSelectors(document)
      updateStatefulSelectors(document)
      expect(reset).toBeInTheDocument();
      expect(submit).toBeInTheDocument();
      expect(left).toBeInTheDocument();
      expect(right).toBeInTheDocument();
      expect(up).toBeInTheDocument();
      expect(down).toBeInTheDocument();
})



test('type email, test input', () => {
  render(<AppFunctional />)
      updateStatelessSelectors(document)
      updateStatefulSelectors(document)
      fireEvent.change(email, { target: { value: 'stuff@things.com' } });
      expect(email).toHaveValue('stuff@things.com');
})

