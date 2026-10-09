import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));

export function createLocalAshenFixtureServer({
  sampleDirectory = resolve(repositoryRoot, '..', 'e2r-spec', 'examples'),
  allowedOrigin = 'http://localhost:4185',
  host = '127.0.0.1',
  port = 0,
} = {}) {
  const files = new Map([
    ['/ashen-crown.en.e2r.json', resolve(sampleDirectory, 'ashen-crown.en.e2r.json')],
    ['/ashen-crown.ja.e2r.json', resolve(sampleDirectory, 'ashen-crown.ja.e2r.json')],
  ]);

  const server = createServer(async (request, response) => {
    const origin = request.headers.origin;
    if (origin === allowedOrigin) {
      response.setHeader('Access-Control-Allow-Origin', allowedOrigin);
      response.setHeader('Vary', 'Origin');
    }

    if (request.method === 'OPTIONS') {
      response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      response.writeHead(204).end();
      return;
    }

    let pathname;
    try {
      pathname = new URL(request.url || '/', 'http://localhost').pathname;
    } catch {
      response.writeHead(400).end();
      return;
    }
    const file = files.get(pathname);
    if (request.method !== 'GET' || !file) {
      response.writeHead(404).end();
      return;
    }

    try {
      const body = await readFile(file);
      response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      }).end(body);
    } catch {
      response.writeHead(503).end();
    }
  });

  return { server, host, port };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT || 4192);
  const allowedOrigin = process.env.E2R_LOCAL_FIXTURE_ALLOWED_ORIGIN || 'http://localhost:4185';
  const sampleDirectory = process.env.E2R_SPEC_EXAMPLES_DIR
    ? resolve(process.env.E2R_SPEC_EXAMPLES_DIR)
    : undefined;
  const fixture = createLocalAshenFixtureServer({ port, allowedOrigin, sampleDirectory });
  fixture.server.listen(fixture.port, fixture.host, () => {
    console.log(`Local Ashen Crown fixture: http://${fixture.host}:${fixture.port}/`);
    console.log(`CORS origin: ${allowedOrigin}`);
  });
}
