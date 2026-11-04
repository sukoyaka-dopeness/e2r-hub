import assert from 'node:assert/strict'
import test from 'node:test'
import { initialHubLocale, withHubLocale } from '../src/services/startupLocale.ts'

test('Hub accepts one exact startup locale independently of unrelated fragment fields', () => {
  for (const locale of ['en', 'ja'] as const) {
    for (const hash of [`#locale=${locale}`, `#other=1&locale=${locale}`, `#locale=${locale}&datasetUrl=ignored`]) {
      assert.equal(initialHubLocale(hash), locale)
    }
  }
  assert.equal(initialHubLocale('#%6cocale=%6a%61'), 'ja')
})

test('manual locale changes replace only locale, repairing invalid/duplicate fields and preserving raw unknown segments', () => {
  for (const [input, expected] of [
    ['', '#locale=ja'], ['#top', '#top&locale=ja'],
    ['#locale=en', '#locale=ja'],
    ['#locale=%&x=1&locale=en', '#locale=ja&x=1'],
    ['#x=%2f&&%6cocale=en&datasetUrl=https%3A%2F%2Fx.test%2Fa.json&locale=fr&broken=%', '#x=%2f&&locale=ja&datasetUrl=https%3A%2F%2Fx.test%2Fa.json&broken=%'],
    ['#loc%ale=en&locale=en', '#loc%ale=en&locale=ja'],
  ]) assert.equal(withHubLocale(input, 'ja'), expected)
  assert.equal(withHubLocale('#locale=ja&other=kept', 'en'), '#locale=en&other=kept')
})

test('Hub safely defaults for anchors, missing, duplicate, unsupported and malformed requests', () => {
  for (const hash of ['', '#top', '#lang=ja', '#locale', '#locale=', '#locale=JA', '#locale=ja-JP',
    '#locale=fr', '#locale=ja&locale=ja', '#locale=en&locale=ja', '#locale=ja&%6cocale=en',
    '#locale=%E0%A4%A', '#locale=ja&locale=%', '#locale=ja+', '#locale=%00ja']) {
    assert.equal(initialHubLocale(hash), 'en', hash)
  }
})
