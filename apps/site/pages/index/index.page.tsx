import React from 'react'
import { Counter } from './Counter'

export { Page }

function Page() {
  return (
    <div data-test="home">
      <h1>Welcome</h1>
      This page is:
      <ul data-test="header">
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </div>
  )
}
