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
    assert.equal(environment.document.querySelectorAll('.sample-info-link').length, 7)
    const sampleCards = [...environment.document.querySelectorAll<HTMLElement>('.sample-card')]
    assert.deepEqual(sampleCards.map((card) => card.querySelector('h3')?.textContent), [
      'History of the Berlin Wall', 'Apollo 11 Mission', 'Lighthouse Restoration Project',
      'The Ashen Crown', 'Titanic: Final Voyage', 'Cedar Observatory: An Open Night',
    ])
    const cedarCard = sampleCards
      .find((card) => card.querySelector('h3')?.textContent === 'Cedar Observatory: An Open Night')
    assert.ok(cedarCard)
    assert.equal(cedarCard.querySelector('small')?.textContent, 'Dataset: English')
    assert.equal(cedarCard.querySelectorAll('.sample-card-actions a').length, 2)
    assert.equal(cedarCard.querySelector('.sample-card-actions a')?.getAttribute('href'),
      'https://sukoyaka-dopeness.github.io/e2r-narrative-line/#datasetUrl=' +
      encodeURIComponent('https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-narrative-line/main/src/sample/cedar-observatory-showcase.en.e2r.json'))
    assert.equal(cedarCard.querySelectorAll('.sample-card-actions a')[1]?.getAttribute('href'),
      'https://sukoyaka-dopeness.github.io/e2r-liaison-scape/#datasetUrl=' +
      encodeURIComponent('https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-narrative-line/main/src/sample/cedar-observatory-showcase.en.e2r.json'))
    assert.equal(cedarCard.querySelector('.sample-info-link')?.textContent, 'Sources / License')
    const provenanceLinks = [...environment.document.querySelectorAll<HTMLAnchorElement>('.sample-info-link')]
    assert.ok(provenanceLinks.every((link) => link.getAttribute('href') === 'https://github.com/sukoyaka-dopeness/e2r-spec/blob/main/docs/public-samples/public-sample-provenance.md'))
    const sourceCard = [...environment.document.querySelectorAll('.documentation-card')]
      .find((card) => card.querySelector('h3')?.textContent === 'Sample Dataset sources')
    const sourceLinks = sourceCard?.querySelector('.sample-source-links')
    assert.equal(sourceLinks?.querySelectorAll('.documentation-actions a').length, 6)
    assert.deepEqual(
      [...(sourceLinks?.querySelectorAll<HTMLAnchorElement>('.documentation-actions a') ?? [])].map((link) => link.textContent),
      sampleCards.map((card) => card.querySelector('h3')?.textContent),
    )
    assert.equal(sourceLinks?.querySelector('.documentation-actions a:last-child')?.getAttribute('href'),
      'https://github.com/sukoyaka-dopeness/e2r-narrative-line/blob/main/src/sample/cedar-observatory-showcase.en.e2r.json')
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
    assert.deepEqual(
      [...environment.document.querySelectorAll('.self-description-section .documentation-actions a')]
        .slice(0, 2)
        .map((link) => link.textContent),
      ['Open NarrativeLine', 'Open LiaisonScape'],
    )

    const japaneseButton = [...environment.document.querySelectorAll<HTMLButtonElement>('.locale-switch button')]
      .find((button) => button.textContent === '日本語')
    assert.ok(japaneseButton)
    await act(async () => japaneseButton?.click())
    assert.equal(environment.document.querySelector('#choose-heading')?.textContent, 'どちらを使いますか？')
    const japaneseCedarCard = [...environment.document.querySelectorAll<HTMLElement>('.sample-card')]
      .find((card) => card.querySelector('h3')?.textContent === 'シダー天文台：公開観望会')
    assert.ok(japaneseCedarCard)
    assert.equal(japaneseCedarCard.querySelector('small')?.textContent, 'データセット: 日本語')
    assert.equal(japaneseCedarCard, environment.document.querySelector('.sample-card:last-child'))
    assert.deepEqual(
      [...environment.document.querySelectorAll('.sample-source-links .documentation-actions a')].map((link) => link.textContent),
      [...environment.document.querySelectorAll('.sample-card h3')].map((heading) => heading.textContent),
    )
    assert.equal(environment.document.querySelector('.sample-source-links .documentation-actions a:last-child')?.getAttribute('href'),
      'https://github.com/sukoyaka-dopeness/e2r-narrative-line/blob/main/src/sample/cedar-observatory-showcase.ja.e2r.json')
    assert.equal(japaneseCedarCard.querySelector('.sample-card-actions a')?.getAttribute('href'),
      'https://sukoyaka-dopeness.github.io/e2r-narrative-line/#datasetUrl=' +
      encodeURIComponent('https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-narrative-line/main/src/sample/cedar-observatory-showcase.ja.e2r.json'))
    assert.equal(japaneseCedarCard.querySelectorAll('.sample-card-actions a')[1]?.getAttribute('href'),
      'https://sukoyaka-dopeness.github.io/e2r-liaison-scape/#datasetUrl=' +
      encodeURIComponent('https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-narrative-line/main/src/sample/cedar-observatory-showcase.ja.e2r.json'))
    assert.equal(environment.document.querySelector('.application-card:nth-child(2) small')?.textContent, '編集にはPC画面が適しています。')
    assert.equal(environment.document.querySelectorAll('.application-card > p:not(.product-name)').length, 0)
    assert.equal(environment.document.querySelector('.site-support-link')?.textContent, 'GitHub SponsorsでE2Rを支援する')
    const japaneseSelfDescriptionActions = [...environment.document.querySelectorAll('.self-description-section .documentation-actions a')]
      .slice(0, 2)
      .map((link) => link.textContent ?? '')
    assert.ok(japaneseSelfDescriptionActions[0]?.includes('NarrativeLine'))
    assert.ok(japaneseSelfDescriptionActions[1]?.includes('LiaisonScape'))
  } finally {
    await environment.cleanup()
  }
})

test('renders localized Credits metadata with one Close action and restores focus on every dismissal path', async () => {
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
    await act(async () => root.render(React.createElement(App)))

    const opener = environment.document.querySelector<HTMLButtonElement>('.site-footer button')
    assert.ok(opener)
    const openCredits = async () => act(async () => {
      opener.focus()
      opener.click()
    })
    const assertOneClose = () => {
      const dialog = environment.document.querySelector<HTMLElement>('.credits-modal')
      assert.ok(dialog)
      const buttons = [...dialog.querySelectorAll('button')]
      assert.equal(buttons.length, 1)
      assert.equal(buttons[0]?.textContent, 'Close')
      return dialog
    }

    await openCredits()
    let dialog = assertOneClose()
    for (const expected of [
      'Application: E2R Hub 0.2.0',
      'Creator: sukoyaka-dopeness',
      'First release: 2026-08-18',
      'Updated: 2026-09-30',
      'With gratitude to all the AI systems that contributed to this project.',
      'E2R specification repository',
    ]) assert.ok(dialog.textContent?.includes(expected), `Expected Credits to include: ${expected}`)
    assert.equal(dialog.querySelector('a')?.getAttribute('href'), 'https://github.com/sukoyaka-dopeness/e2r-spec')

    await act(async () => environment.window.dispatchEvent(new environment.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })))
    assert.equal(environment.document.querySelector('.credits-modal'), null)
    assert.equal(environment.document.activeElement, opener)

    await openCredits()
    const backdrop = environment.document.querySelector<HTMLElement>('.modal-backdrop')
    assert.ok(backdrop)
    const backdropMouseDown = new environment.window.MouseEvent('mousedown', { bubbles: true, cancelable: true })
    await act(async () => backdrop.dispatchEvent(backdropMouseDown))
    assert.equal(backdropMouseDown.defaultPrevented, true)
    assert.equal(environment.document.querySelector('.credits-modal'), null)
    assert.equal(environment.document.activeElement, opener)

    await openCredits()
    dialog = assertOneClose()
    await act(async () => dialog.querySelector('button')?.click())
    assert.equal(environment.document.querySelector('.credits-modal'), null)
    assert.equal(environment.document.activeElement, opener)

    const japaneseButton = environment.document.querySelector<HTMLButtonElement>('.locale-switch button:last-child')
    assert.ok(japaneseButton)
    await act(async () => japaneseButton.click())
    await openCredits()
    dialog = environment.document.querySelector<HTMLElement>('.credits-modal')!
    for (const expected of [
      '\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3: E2R Hub 0.2.0',
      '\u4f5c\u6210\u8005: sukoyaka-dopeness',
      '\u521d\u56de\u30ea\u30ea\u30fc\u30b9: 2026-08-18',
      '\u66f4\u65b0\u65e5: 2026-09-30',
      '\u3053\u306e\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u306b\u8ca2\u732e\u3057\u305f\u3059\u3079\u3066\u306eAI\u30b7\u30b9\u30c6\u30e0\u306b\u611f\u8b1d\u3057\u307e\u3059\u3002',
      'E2R\u4ed5\u69d8\u30ea\u30dd\u30b8\u30c8\u30ea',
    ]) assert.ok(dialog.textContent?.includes(expected), `Expected Japanese Credits to include: ${expected}`)
    assert.equal(dialog.querySelectorAll('button').length, 1)
    assert.equal(dialog.querySelector('button')?.textContent, '\u9589\u3058\u308b')
    assert.equal(dialog.querySelector('a')?.getAttribute('href'), 'https://github.com/sukoyaka-dopeness/e2r-spec')
  } finally {
    await environment.cleanup()
  }
})
