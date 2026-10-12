# TypeScript Academy

Updated 12 October 2026 · Project: academy-typescript

## Purpose

An ongoing practical academy for an experienced PHP/Laravel backend engineer returning to JavaScript and learning TypeScript, Node and browser development. The October interview crash course is the foundation; the interview has now taken place. Continue with exercises, small applications and deliberate revision, using PHP comparisons where useful.

## How these notes are organised

One main README holds the roadmap and progress. Each lesson has its own Markdown file, chapter estimates, exercises and notes. Shared revision material lives under reference/. Existing lessons keep their numbers. Lessons 0–9 are the original foundation; Lesson 10 records the browser refresher; Lesson 11 is the LRU reconstruction. Future lessons are currently outlines, not completed tutorials.

Put the extracted `notes/` directory at the root of the existing Git project. This documentation does not replace the project's operational README or alter Docker, package.json, tsconfig or source files.

| Path inside notes/ | Responsibility |
|---|---|
| README.md | Start here: roadmap, status and links |
| lessons/ | One file per lesson; chapter index lives in that file |
| reference/ | Shared solutions, quick reference, revision log and reading |
| templates/lesson-template.md | Structure for new lessons |
| archive/ | Untouched uploaded crash-course snapshot; historical, not the current index |

## Learning rhythm

Begin with 5–10 minutes of recall from an empty file. Read a short explanation, type and run an example, change a requirement, then attempt the exercise. Consult hints before solutions. Finish by recording one correction and one repeat task. Repetition and questions can take longer than the estimates.

Complete means material was covered and practised, not permanent mastery. The Lesson 9 session was a guided rehearsal, not proof of completing an unfamiliar task independently within 90 minutes. Keep independent attempts as a separate learning goal.

## Lesson index

Times are focused planning ranges excluding breaks. Completed totals are not remaining work. Future ranges are provisional and will be refined when their exercises and environment are chosen.

| Lesson | Status | Estimate |
|---|---|---:|
| [0. Environment and tools](lessons/00-environment.md) | Complete — covered | 50–80 min |
| [1. JavaScript data types and syntax](lessons/01-javascript-basics.md) | Complete — covered | 75–110 min |
| [2. Functions and modern syntax](lessons/02-functions.md) | Complete — covered | 65–95 min |
| [3. Arrays and collections](lessons/03-arrays-and-collections.md) | Complete — covered | 70–100 min |
| [4. TypeScript foundations](lessons/04-typescript-foundations.md) | Complete — covered | 60–95 min |
| [5. Unions and narrowing](lessons/05-unions-and-narrowing.md) | Complete — covered | 65–105 min |
| [6. Generics, utilities and classes](lessons/06-generics-and-classes.md) | Complete — covered | 95–130 min |
| [7. Modules, promises and external data](lessons/07-modules-and-async.md) | Complete — covered | 95–135 min |
| [8. Practical order application](lessons/08-order-application.md) | Complete — covered | 60–90 min |
| [9. Pairing rehearsal and review](lessons/09-pairing-rehearsal.md) | Covered — guided rehearsal | 110–120 min |
| [10. Browser and DOM refresher](lessons/10-browser-and-dom.md) | Covered — refresher | 30–45 min |
| [11. LRU cache reconstruction](lessons/11-lru-cache.md) | Next — scope ready | 90–135 min |
| [12. Deeper TypeScript types](lessons/12-deeper-types.md) | Planned outline | 120–180 min |
| [13. Async resilience](lessons/13-async-resilience.md) | Planned outline | 120–180 min |
| [14. Node HTTP API and debugging](lessons/14-node-http-api.md) | Planned outline | 180–270 min |
| [15. PostgreSQL and transactions](lessons/15-postgresql.md) | Planned outline | 180–300 min |
| [16. React foundations](lessons/16-react-foundations.md) | Planned outline | 240–360 min |

## Next step

Start [Lesson 11 — LRU cache](lessons/11-lru-cache.md). Its scope distinguishes remembered assessment requirements from reconstruction choices. Implement storage and API, then recency/eviction, then tests. Explore the classic hash-map/linked-list alternative after the initial version works.

Then deepen typing, async behaviour, Node HTTP development, PostgreSQL and React. These are learning directions; we can change their order when practical needs justify it. Keep adding small fresh exercises around earlier tools rather than introducing every advanced feature at once.

## Adding or updating lessons

1. Create a file from [the lesson template](templates/lesson-template.md), with a stable number and descriptive filename.
2. Put its chapters, time estimates, examples, exercise, hidden solution and completion checks in that file.
3. Add one row to this index; do not rewrite earlier lessons.
4. Update lesson notes and the index status after the session.

For planned Lessons 12–16, expand the existing outline rather than create another file with the same number. The next unallocated number is **17**. Do not renumber files when reordering the roadmap.

Ask for an independent new lesson by sharing this index or just its number, prerequisites and desired topic. For edits to an existing lesson, share that lesson; for cross-file index updates, share README too. You do not need to upload the entire course. Relative links work when the folder stays together, including in GitHub and Markdown previews.

For now there is one authoritative editable copy per lesson. The archive preserves the old single-file guide. Avoid maintaining a second manually edited combined guide; a combined export can be generated later if useful.

## References and progress notes

- [Core exercise solutions](reference/core-solutions.md)
- [Quick reference and PHP comparisons](reference/quick-reference.md)
- [Personal revision log](reference/revision-log.md)
- [Further reading](reference/further-reading.md)

## Environment reminder

The existing Docker project remains the environment. Inside /var/www: npm run typecheck checks configured source files; npm run test executes tests/*.test.ts; npm run lesson -- relative/file.ts executes a lesson. On the host, use the existing ./dev commands.

Tests must be directly under application/tests/ and end in .test.ts with our current script. Demonstration code should not run merely because a source module is imported. Browser HTML exercises run in the browser; compiled browser TypeScript and React setup will be introduced when needed. PhpStorm/Node Inspector debugging and PostgreSQL setup remain future work.

## Change record

- 12 October: split the supplied guide into lesson files and references; preserved its original bytes in archive.
- Added the actual Lesson 9 session notes, browser/DOM refresher and post-interview LRU scope.
- Replaced the expired interview schedule with a continuing roadmap and planned lesson outlines.
