# Academy: TypeScript practice — Docker environment

This follows the Python learning project's application/, docker-configuration/ and ./dev layout. It runs Node 24, TypeScript and tsx in one development container. Docker and Docker Compose v2 are the only required host tools; you do not need host Node/npm.

## First start

Extract the ZIP into your Code directory, then enter academy-typescript/:

```bash
cp .env.example .env
chmod +x dev
./dev check
./dev build
./dev start
./dev logs
```

Startup installs dependencies. Wait for npm to finish before running a lesson. Press Ctrl+C to leave logs; the background container keeps running. On first install npm creates application/package-lock.json. Keep that file in Git; subsequent starts use npm ci and honour the lockfile. Direct dependency versions are pinned in package.json; transitive versions become locked at your first install.

```bash
./dev lesson lessons/01-basics.ts
./dev typecheck
./dev test
```

Expected lesson output: Hello, Dimitrios. Quantity: 3

## Daily use

```bash
./dev start
./dev lesson lessons/01-basics.ts
./dev watch lessons/01-basics.ts
./dev app
./dev stop
```

Paths passed to lesson/watch are relative to application/. Edit source on your laptop; changes appear immediately in the container. JavaScript .js files can also be run using lesson. Type-checking covers .ts files only.

Each lesson starts with export {}; so it is treated as an independent module. Add that line to new standalone TS exercises to avoid repeated variable names conflicting across files. In a real application, imports/exports naturally provide module boundaries.

## Dependencies and permissions

Source is bind-mounted at /var/www. node_modules uses a project-scoped named volume so Linux dependencies do not mix with host packages. ./dev supplies your host UID/GID, and commands use it. The entrypoint starts as root only to set volume ownership, then drops privileges before npm or the long-running command. It does not recursively change source ownership. Do not run ./dev with sudo unless your local Docker setup specifically requires it; prefer normal configured Docker access.

To add a dependency after starting:

```bash
./dev npm install --save-dev <package>
```

This updates package.json and package-lock.json on the host. Do not create a fabricated lockfile. Startup uses npm ci when a lockfile exists: if you edit package.json manually and get a mismatch, run ./dev npm install in the running container. If startup has already exited, use ./dev run npm install to repair the lockfile in a disposable container. Usually adding dependencies through npm avoids this situation altogether.

There is no application port: these are terminal exercises, not an HTTP server. sleep infinity keeps the container available for ./dev commands; init: true handles process reaping. No database is included.

## Editor

Open the folder normally in VS Code. Dependencies exist inside Docker, so full project-aware TypeScript tooling is best obtained with VS Code Dev Containers: start the container, use “Dev Containers: Attach to Running Container”, and open /var/www. For a basic lesson the host editor's built-in TS support may suffice, but imported Node/package types can appear missing outside the container.

## Commands

Use ./dev help for the full list. ./dev check validates Compose; ./dev typecheck validates TS. They are separate checks. tsx runs TypeScript but does not type-check it, so run typecheck regularly.

./dev stop preserves the dependency volume. ./dev purge deletes that volume; your bind-mounted source remains on the laptop. Rebuild the image after changing the Dockerfile or entrypoint scripts.

## Validation limits

Shell syntax, JSON structure, YAML structure and helper argument forwarding were checked when preparing this bundle. Docker was unavailable in the preparation environment, so the actual image build, npm install and container-based compiler/test execution must be verified locally using the first-start commands above.

The included test is an environment smoke check, not a business test. Write meaningful behaviour checks as we build exercises.

## References

- https://nodejs.org/en/about/previous-releases
- https://docs.docker.com/compose/how-tos/environment-variables/envvars/
- https://www.typescriptlang.org/docs/
