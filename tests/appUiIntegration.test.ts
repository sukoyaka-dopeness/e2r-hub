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
    assert.equal(environment.document.querySelectorAll('.application-card > p:not(.product-name)').length, 0)
    assert.equal(environment.document.querySelector('.application-card:nth-child(2) small')?.textContent, 'Editing is best on a desktop screen.')
    const specificationLink = environment.document.querySelector('.action-link')
    assert.equal(specificationLink?.getAttribute('target'), '_blank')
    assert.equal(specificationLink?.getAttribute('rel'), 'noreferrer')
    assert.equal(environment.document.querySelectorAll('.sample-info-link').length, 6)
    const provenanceLinks = [...environment.document.querySelectorAll<HTMLAnchorElement>('.sample-info-link')]
    assert.ok(provenanceLinks.every((link) => link.getAttribute('href') === 'https://github.com/sukoyaka-dopeness/e2r-spec/blob/main/docs/public-sample-provenance.md'))
    const sourceCard = [...environment.document.querySelectorAll('.documentation-card')]
      .find((card) => card.querySelector('h3')?.textContent === 'Sample Dataset sources')
    const sourceLinks = sourceCard?.querySelector('.sample-source-links')
    assert.equal(sourceLinks?.querySelectorAll('.documentation-actions a').length, 5)
    assert.equal(sourceLinks?.firstElementChild?.className, 'documentation-actions')
    assert.equal(sourceLinks?.lastElementChild?.className, 'sample-info-link')
    const supportLink = environment.document.querySelector('.site-support-link')
    assert.equal(supportLink?.textContent, 'Support E2R on GitHub Sponsors')
    assert.equal(supportLink?.getAttribute('href'), 'https://github.com/sponsors/sukoyaka-dopeness')
    assert.equal(supportLink?.getAttribute('target'), '_blank')
    assert.equal(supportLink?.getAttribute('rel'), 'noreferrer')
    assert.equal(environment.document.querySelector('main')?.lastElementChild?.className, 'site-support')
    assert.equal(environment.document.querySelector('.site-footer')?.previousElementSibling?.tagName, 'MAIN')
    assert.equal(environment.document.querySelector('.self-description-section h2')?.textContent, 'E2R Self-Description')
    assert.ok(environment.document.querySelector('.self-description-section a[href*="public-sample-provenance.md"]'))

    const japaneseButton = [...environment.document.querySelectorAll<HTMLButtonElement>('.locale-switch button')]
      .find((button) => button.textContent === '日本語')
    assert.ok(japaneseButton)
    await act(async () => japaneseButton?.click())
    assert.equal(environment.document.querySelector('#choose-heading')?.textContent, 'どちらを使いますか？')
    assert.equal(environment.document.querySelector('.application-card:nth-child(2) small')?.textContent, '編集にはPC画面が適しています。')
    assert.equal(environment.document.querySelectorAll('.application-card > p:not(.product-name)').length, 0)
    assert.equal(environment.document.querySelector('.site-support-link')?.textContent, 'GitHub SponsorsでE2Rを支援する')
  } finally {
    await environment.cleanup()
  }
})
