import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createLocalAshenFixtureServer } from '../scripts/serve-local-ashen-fixture.mjs'

test('local Ashen fixture serves only the two named files with scoped CORS', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'e2r-ashen-fixture-'))
  const en = Buffer.from('{"edition":"en"}')
  const ja = Buffer.from('{"edition":"ja"}')
  await Promise.all([
    writeFile(join(directory, 'ashen-crown.en.e2r.json'), en),
    writeFile(join(directory, 'ashen-crown.ja.e2r.json'), ja),
  ])
  const fixture = createLocalAshenFixtureServer({
    sampleDirectory: directory,
    allowedOrigin: 'http://localhost:4185',
  })
  await new Promise<void>((resolve) => fixture.server.listen(0, fixture.host, resolve))
  const address = fixture.server.address()
  assert.ok(address && typeof address === 'object')
  const base = `http://${fixture.host}:${address.port}`

  try {
    const allowed = await fetch(`${base}/ashen-crown.ja.e2r.json`, {
      headers: { Origin: 'http://localhost:4185' },
    })
    assert.equal(allowed.status, 200)
    assert.equal(allowed.headers.get('access-control-allow-origin'), 'http://localhost:4185')
    assert.deepEqual(Buffer.from(await allowed.arrayBuffer()), ja)

    const otherOrigin = await fetch(`${base}/ashen-crown.en.e2r.json`, {
      headers: { Origin: 'http://127.0.0.1:4191' },
    })
    assert.equal(otherOrigin.status, 200)
    assert.equal(otherOrigin.headers.get('access-control-allow-origin'), null)
    assert.deepEqual(Buffer.from(await otherOrigin.arrayBuffer()), en)

    assert.equal((await fetch(`${base}/missing.json`)).status, 404)
    assert.equal((await fetch(`${base}/../package.json`)).status, 404)
    assert.equal((await fetch(base, { method: 'POST' })).status, 404)
    const preflight = await fetch(`${base}/ashen-crown.en.e2r.json`, {
      method: 'OPTIONS',
      headers: { Origin: 'http://localhost:4185' },
    })
    assert.equal(preflight.status, 204)
    assert.equal(preflight.headers.get('access-control-allow-origin'), 'http://localhost:4185')
  } finally {
    await new Promise<void>((resolve, reject) => fixture.server.close(error => error ? reject(error) : resolve()))
    await rm(directory, { recursive: true, force: true })
  }
})
