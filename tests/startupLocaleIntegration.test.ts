import assert from 'node:assert/strict'
import test from 'node:test'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { createServer } from 'vite'
import { createDomTestEnvironment } from './helpers/dom-test-environment.ts'

test('Hub locale request is startup-only and preserves top navigation and outgoing locale selection', async () => {
  const environment = createDomTestEnvironment({ url: 'https://e2r-hub.test/#locale=ja&extra=kept' })
  environment.installGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  let topScrolls = 0
  environment.window.HTMLElement.prototype.scrollIntoView = function () { if (this.id === 'top') topScrolls += 1 }
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
  environment.addCleanup(() => server.close())
  const container = environment.document.createElement('div')
  environment.document.body.append(container)
  const root = createRoot(container)
  environment.addCleanup(() => act(async () => root.unmount()))
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.tsx')
    await act(async () => root.render(React.createElement(App)))
    assert.equal(environment.document.documentElement.lang, 'ja')
    assert.equal(environment.document.querySelector('.brand')?.getAttribute('href'), '#locale=ja&extra=kept')
    assert.equal(environment.window.location.hash, '#locale=ja&extra=kept')
    const historyLength = environment.window.history.length
    await act(async () => (environment.document.querySelector('.locale-switch button') as HTMLButtonElement).click())
    assert.equal(environment.document.documentElement.lang, 'en')
    assert.equal(environment.window.location.hash, '#locale=en&extra=kept')
    assert.equal(environment.window.history.length, historyLength)
    await act(async () => {
      environment.window.location.hash = '#top'
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    assert.equal(environment.document.documentElement.lang, 'en')
    assert.equal(environment.window.location.hash, '#top')
    await act(async () => (environment.document.querySelectorAll('.locale-switch button')[1] as HTMLButtonElement).click())
    assert.equal(environment.window.location.hash, '#top&locale=ja')
    const beforeTop = environment.window.history.length
    await act(async () => (environment.document.querySelector('.brand') as HTMLAnchorElement).click())
    assert.equal(topScrolls, 1)
    assert.equal(environment.document.documentElement.lang, 'ja')
    assert.equal(environment.window.location.hash, '#top&locale=ja')
    assert.equal(environment.window.history.length, beforeTop)
    await act(async () => (environment.document.querySelector('.locale-switch button') as HTMLButtonElement).click())
    assert.equal(environment.window.location.hash, '#top&locale=en')
    assert.ok(environment.document.querySelector('.application-card')?.getAttribute('href')?.endsWith('#locale=en'))
    assert.ok(environment.document.querySelector('.sample-card-actions a')?.getAttribute('href')?.endsWith('&locale=en'))
    assert.equal(environment.window.localStorage.length, 0)
    assert.equal(environment.window.sessionStorage.length, 0)
  } finally {
    await environment.cleanup()
  }
})
