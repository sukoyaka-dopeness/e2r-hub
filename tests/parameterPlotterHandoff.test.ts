import assert from 'node:assert/strict'
import test from 'node:test'
import { parameterPlotterHandoffHref, resolveHandoffUrl } from '../src/services/parameterPlotterHandoff.ts'

test('ParameterPlotter Handoff accepts public HTTPS and development loopback URLs only', () => {
  assert.equal(resolveHandoffUrl('https://example.test/plotter'), 'https://example.test/plotter')
  assert.equal(resolveHandoffUrl('http://localhost:4180/', true), 'http://localhost:4180/')
  assert.equal(resolveHandoffUrl('http://localhost:4180/'), undefined)
  assert.equal(resolveHandoffUrl('http://example.test/plotter', true), undefined)
  assert.equal(resolveHandoffUrl('https://user:secret@example.test/plotter'), undefined)
  assert.equal(resolveHandoffUrl('javascript:alert(1)', true), undefined)
})

test('ParameterPlotter Handoff carries the selected Dataset URL and locale', () => {
  assert.equal(
    parameterPlotterHandoffHref('https://example.test/plotter/', 'https://data.test/cedar.ja.json', 'ja'),
    'https://example.test/plotter/#datasetUrl=https%3A%2F%2Fdata.test%2Fcedar.ja.json&locale=ja',
  )
})
