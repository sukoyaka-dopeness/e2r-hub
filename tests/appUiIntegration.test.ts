import assert from 'node:assert/strict'
import test from 'node:test'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { createServer } from 'vite'
import { createDomTestEnvironment } from './helpers/dom-test-environment.ts'

test('renders the production Hub Home surface', async () => {
  const environment = createDomTestEnvironment()
  environment.installGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  const container = environment.document.createElement('div')
  environment.document.body.append(container)

  try {
    const server = await createServer({
      root: process.cwd(),
      server: { middlewareMode: true, hmr: false },
      appType: 'custom',
    })
    environment.addCleanup(() => server.close())

    const root = createRoot(container)
    environment.addCleanup(() => act(async () => root.unmount()))

    const { default: App } = await server.ssrLoadModule('/src/App.tsx')
    await act(async () => {
      root.render(React.createElement(App))
    })

    assert.equal(environment.document.querySelector('.brand')?.textContent, 'E2R Hub')
    assert.ok(environment.document.querySelector('h1'))
    assert.equal(environment.document.querySelector('#choose-heading')?.textContent, 'Which would you like to use?')
    assert.equal(environment.document.querySelector('h1')?.textContent, 'One datasettwo views.')
    assert.equal(environment.document.querySelectorAll('.card-arrow').length, 0)
    assert.ok(environment.document.querySelector('.application-card h3')?.textContent?.includes('View and edit a timeline'))
    assert.ok(environment.document.querySelector('.application-card:nth-child(2) h3')?.textContent?.includes('View and edit a relationship diagram'))
    const specificationLink = environment.document.querySelector('.action-link')
    assert.equal(specificationLink?.getAttribute('target'), '_blank')
    assert.equal(specificationLink?.getAttribute('rel'), 'noreferrer')
  } finally {
    await environment.cleanup()
  }
})
