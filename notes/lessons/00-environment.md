# Lesson 0 — Environment and tools

[Academy index](../README.md)

Lesson ID: L00  
Status: **Complete — covered and practised**  
Prerequisites: None  
Estimated focused time: **50–80 minutes** (planning range, not a measured completion time)  
Last updated: 12 October 2026

## Chapter index

| Chapter | Topics | Estimate |
|---|---|---:|
| 0.1 | Tools and directory layout | 5–10 min |
| 0.2 | Create a project; authored versus generated files | 10–15 min |
| 0.3 | package.json, lockfile and dependencies | 10–15 min |
| 0.4 | tsconfig.json and strict checking | 10–15 min |
| 0.5 | Docker startup, execution and type-check commands | 10–15 min |
| 0.6 | Practical inspection and recap | 5–10 min |

### Goal

Understand what each tool does, which files we write, which files are generated, and how our Docker environment runs the code.

Do not run the project initialisation commands in our existing application directory. It is already initialised. They are explained here so you can recreate a project independently.

### 0.1 The tools and their responsibilities

| Tool | Responsibility | Familiar PHP comparison |
|---|---|---|
| Node.js | Executes JavaScript outside a browser | PHP CLI |
| npm | Manages packages and project commands | Composer, plus named scripts |
| TypeScript / `tsc` | Checks types and can compile TypeScript into JavaScript | Some overlap with PHPStan, but also compilation |
| tsx | Lets us run TypeScript without manually compiling first | A convenient execution tool; no direct equivalent needed |
| Docker | Provides the environment containing these tools | The same role as our PHP/Python containers |

Node.js is the runtime, not a framework. It provides JavaScript with capabilities such as filesystem access and server networking.

TypeScript adds type syntax and checking to JavaScript. Our setup uses `tsc` to check types and `tsx` to execute files. Running a file through tsx does not prove it passes type checking.

### 0.2 Where the application lives

On the laptop:

```text
academy-typescript/
  application/
```

Inside the container, that same directory is mounted at:

```text
/var/www
```

Therefore:

```text
Laptop:    application/lessons/01-basics.ts
Container: /var/www/lessons/01-basics.ts
```

Editing the laptop file changes what the container sees.

The Dockerfile installs the environment. The application directory contains the project that runs in that environment.

### 0.3 Creating a project from scratch

With Node.js and npm available, a typical initialisation sequence is:

```bash
mkdir example-project
cd example-project

npm init -y
npm install --save-dev typescript tsx @types/node
npx tsc --init
```

These commands have different jobs.

#### `npm init -y`

Creates `package.json` with default project metadata.

`-y` accepts defaults rather than asking interactive questions.

It does not install TypeScript or create application code.

#### `npm install --save-dev typescript tsx @types/node`

Installs three development dependencies:

- `typescript`: provides the compiler/type checker, `tsc`.
- `tsx`: runs TypeScript files.
- `@types/node`: tells TypeScript about Node APIs.

It also:

- Adds dependencies to `package.json`.
- Creates or updates `package-lock.json`.
- Installs packages into `node_modules/`.

`--save-dev` records these as development tools rather than runtime dependencies.

#### `npx tsc --init`

Invokes the installed TypeScript compiler and generates `tsconfig.json`.

The generated configuration is a starting point. We adjust it for our project.

`npx` can invoke package executables. Here it finds the locally installed `tsc`. When a requested package is missing, npx can offer to download it; it is not limited to local tools.

### 0.4 Which files do I write?

| File or directory | Created by | My responsibility |
|---|---|---|
| `package.json` | `npm init`, or written directly | Configure metadata/scripts; use npm to manage dependencies |
| `package-lock.json` | npm | Commit it; normally do not edit manually |
| `node_modules/` | npm | Do not edit or commit |
| `tsconfig.json` | `tsc --init`, or written directly | Choose appropriate compiler settings |
| `.ts` source files | Me | Write the application |
| Dockerfile and Compose file | Me or a template | Configure the environment |
| `dev` and startup scripts | Me or a template | Optional workflow helpers |

For our course, the supplied `package.json` and `tsconfig.json` were written in advance.

That is why our startup scripts do not run `npm init` or `tsc --init`: those files already exist.

### 0.5 Understanding `package.json`

This is similar in purpose to `composer.json`.

It declares dependencies and named commands. For example:

```json
"scripts": {
  "lesson": "tsx",
  "watch": "tsx watch",
  "typecheck": "tsc --noEmit",
  "test": "tsx --test tests/*.test.ts"
}
```

Running:

```bash
npm run typecheck
```

looks up `scripts.typecheck` and executes:

```bash
tsc --noEmit
```

npm makes locally installed executables from `node_modules/.bin` available to these scripts. TypeScript does not need to be installed globally.

Running:

```bash
npm run lesson -- lessons/01-basics.ts
```

executes:

```bash
tsx lessons/01-basics.ts
```

The `--` separates npm's arguments from arguments passed to the script.

### 0.6 Understanding the lockfile and dependency directory

`package.json` declares the packages we want.

`package-lock.json` records their resolved versions, including dependencies of those dependencies. Its role resembles `composer.lock`.

`node_modules/` contains installed packages. Its role resembles `vendor/`.

Our startup chooses:

```bash
if [[ -f package-lock.json ]]; then
    npm ci
else
    npm install
fi
```

- `npm install` installs dependencies and can create/update the lockfile.
- `npm ci` performs a clean installation from the lockfile and fails if it disagrees with `package.json`.

Commit both package files. Do not commit `node_modules/`.

In our Docker setup, installed dependencies live in a named volume mounted at `/var/www/node_modules`.

### 0.7 Understanding `tsconfig.json`

This configures TypeScript's compiler and checker.

For example:

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true
  },
  "include": [
    "lessons/**/*.ts",
    "exercises/**/*.ts",
    "mock-interviews/**/*.ts",
    "tests/**/*.ts"
  ]
}
```

This is an explanatory extract, not a replacement for our complete configuration.

- `strict` enables stricter type checking.
- `noEmit` prevents the compiler from writing generated JavaScript.
- `include` selects the project's starting source files.
- `**/*.ts` matches TypeScript files in a directory and its subdirectories.

Imported files can also become part of the project.

Running `tsc` without a filename uses the project configuration. Passing a source filename directly changes this behaviour: it does not use `tsconfig.json` in the normal project-based way.

For our course, use `./dev typecheck` to check the configured project.

### 0.8 Following our Docker startup

The startup sequence is:

1. Docker creates the container from our Node image.
2. Compose mounts `application/` at `/var/www`.
3. `start-container` prepares dependency-volume permissions.
4. It switches to our local user's numeric UID/GID.
5. `start-container-local` installs dependencies.
6. `sleep infinity` keeps the container available for commands.

We are not starting an HTTP server yet. These are terminal-based exercises.

The initialisation commands are absent because the project's configuration files were supplied already.

### 0.9 Following an execution command

```bash
./dev lesson lessons/01-basics.ts
```

The sequence is:

1. The laptop runs the Bash script `dev`.
2. The script executes a command inside the running app container.
3. Inside `/var/www`, npm reads `package.json`.
4. npm invokes `tsx lessons/01-basics.ts`.
5. The file executes and its console output appears in the terminal.

### 0.10 Following a type-checking command

```bash
./dev typecheck
```

The sequence is:

1. `dev` invokes `npm run typecheck` inside the container.
2. npm invokes `tsc --noEmit`.
3. tsc reads `tsconfig.json`.
4. It checks the selected TypeScript files.
5. It reports errors, or finishes successfully without error output.

It does not execute the lessons or their `console.log` statements.

| Command | What it checks or runs |
|---|---|
| `./dev check` | Validates Docker Compose configuration |
| `./dev typecheck` | Checks TypeScript types |
| `./dev lesson lessons/01-basics.ts` | Executes that source file |
| `./dev test` | Executes automated tests |

### 0.11 Practical inspection

Run these from the project root:

```bash
./dev node --version
./dev npm --version
./dev npm ls --depth=0
```

Then open:

```text
application/package.json
application/tsconfig.json
application/lessons/01-basics.ts
```

Locate the `lesson` and `typecheck` scripts. Trace each command using the explanations above.

Finally, run:

```bash
./dev lesson lessons/01-basics.ts
./dev typecheck
```

Observe the difference between execution output and type-checking output.

### Recap

Before moving to Lesson 1, be able to explain:

- Node executes JavaScript.
- npm installs dependencies and invokes named scripts.
- package.json describes the project.
- package-lock.json records resolved dependencies.
- node_modules contains installed packages.
- tsconfig.json configures TypeScript checking/compilation.
- tsx executes our TypeScript files.
- tsc checks them.
- Docker supplies the environment.
- dev is our convenience wrapper, not a TypeScript requirement.
