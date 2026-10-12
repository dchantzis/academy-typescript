# Lesson 9 — Pairing rehearsal and review

[Academy index](../README.md)

Lesson ID: L09  
Status: **Covered — guided rehearsal**  
Prerequisites: Lessons 0–8  
Estimated focused time: **110–120 minutes** (planning range, not a measured completion time)  
Last updated: 12 October 2026

## Chapter index

| Chapter | Topics | Estimate |
|---|---|---:|
| 9.1 | Mock: inspect project and clarify requirements | 10 min |
| 9.2 | Mock: implement first working version | 25 min |
| 9.3 | Mock: tests and debugging | 20 min |
| 9.4 | Mock: requirement change and async repository | 20 min |
| 9.5 | Mock: final checks and trade-offs | 15 min |
| 9.6 | Feedback and targeted revision | 20–30 min |

## Completed guided rehearsal: 5 October 2026

We worked through the task below in stages, with corrections and questions. This became a guided rehearsal with breaks; it was not a completed 90-minute independent benchmark. Coverage is complete; independent fluency remains a revision goal. The final mutation-test/typecheck confirmation should be recorded from the local project rather than inferred from these notes.

### Agreed transaction rules

| Concern | Rule used in our session |
|---|---|
| Fields | transactionId, customerId, amountMinor, status |
| Status | String enum: pending, completed, failed |
| Amount | Non-zero safe integer; negative amounts are refunds |
| Validation | Invalid amount throws, including for pending/failed records |
| Inclusion | Completed transactions only |
| Duplicate ID, matching fields | Count once |
| Duplicate ID, conflicting fields | Throw |
| Customer inclusion | Include those with completed transactions, even when their total is zero |
| Empty input | Empty Map<string, number> |
| Mutation | Leave the input array and transaction objects unchanged |

Working source was placed in `application/lessons/lesson-09-mock-interview/09-transactions.ts`; tests in `application/tests/09-transactions.test.ts`.

### Implementation approach

Use one Map keyed by transaction ID to remember seen records, and another keyed by customer ID to accumulate totals. Validate first; reject conflicting duplicates and skip matching duplicates; remember new records; skip excluded statuses; add the amount using `get(customerId) ?? 0`. Comparing object references with === is not comparing their fields.

### Async extension

```ts
export interface TransactionRepository {
  getAll(): Promise<Transaction[]>;
}
export type SummaryResult =
  | { kind: "ready"; totals: Map<string, number> }
  | { kind: "failure"; error: string };
```

loadTransactionSummary awaits getAll, calls the synchronous summariser and returns ready. Its try/catch covers both loading and summarising. Return success inside try: let/const declarations are block-scoped in JavaScript and TypeScript, unlike ordinary PHP try/if blocks.

### Tests and debugging from practice

- Group customers, include refunds, exclude pending/failed records.
- Empty input; completed transactions cancelling to zero.
- Matching duplicates represented by separate object literals.
- Conflicting duplicates and invalid pending amounts using assert.throws.
- Async service success, repository rejection and invalid loaded transactions using awaited results and assert.deepEqual.
- Snapshot input with `transactions.map(t => ({ ...t }))` for a mutation check.

Our test script matches `tests/*.test.ts`: `.tests.ts` does not match. When expecting an exception, call the function inside the callback passed to assert.throws; a prior direct call throws before the assertion can catch it. A returned failure result is asserted normally, not with assert.throws.

### Limits and review

Safe individual amounts do not guarantee a safe accumulated total. Check Number.isSafeInteger on the calculated sum when that guarantee is required. isInteger checks whole numbers; isSafeInteger also checks the representable safe range. Zero may be a valid total even though individual zero amounts are excluded by this brief.

Strong points: identifying business ambiguities, selecting Maps, and writing meaningful tests. Revision targets: control flow, remembering validation calls, Map accumulation, block scope and choosing where errors are caught. Use short fresh exercises with decreasing guidance.

## Reusable rehearsal brief

The original account-based mock below is retained as a separate practice variant. Its status names, sorting and field names differ from the customer-based session above.

### Working aloud

Start with: “Let me confirm the inputs and expected output. What should happen for an empty list or invalid quantity?” Give a small example, agree the simplest behaviour, and implement one step.

Useful language:

- “I'll start with a loop so the business rule is visible.”
- “This lookup can miss, so I'll model and handle that explicitly.”
- “The compiler is showing a possible undefined value; I'll check that branch.”
- “This assertion would hide the uncertainty. I'd rather validate the input.”
- “Is that lookup independent, or does the second operation depend on the first?”
- “Let me check the signature in the editor, then continue.”

Explain decisions at natural boundaries. You do not need to narrate every keystroke. Accept suggestions, clarify them and incorporate them. Ask whether documentation, internet search and AI assistance are permitted before using them during the actual interview.

### Primary mock: 90 minutes

Start from a small TypeScript repository with a brief and a few tests. The tutor acts as the interviewer: no complete solution up front, and requirement changes arrive after a working first version. Confirm assistance rules before starting. Reference lookup is useful in rehearsal, but follow the actual interview's rules.

| Time | Activity |
|---|---|
| 0–10 minutes | Inspect files, scripts and types; clarify inputs, outputs and edge cases |
| 10–35 minutes | Implement a small synchronous transaction summary and run checks |
| 35–55 minutes | Add meaningful tests and diagnose a failing case |
| 55–75 minutes | Handle deduplication and an async repository requirement |
| 75–90 minutes | Complete checks, explain trade-offs and discuss remaining limitations |

Task: group transactions by account and sum amounts in minor units. Each has id, accountId, amountMinor and status (pending/settled/reversed). Include settled transactions only; sort accounts by total descending. Agree negative-amount and tie behaviour. Use Map for grouping, with explicit missing-value handling.

Requirement change: deduplicate by transaction id; clarify which record wins when duplicates disagree and whether deduplication happens before filtering status. Add a test showing that chosen policy. Then inject an async transaction repository. Validate unknown boundary data if supplied; do not assert it into a domain type. The session includes one seeded defect to investigate using tests and compiler feedback.

Do not browse the solution during the mock. Explain decisions at natural boundaries, invite feedback and keep a working increment. A task not fully finished can still be reviewed for correctness, collaboration and diagnosis; record incomplete work honestly.

### Alternative fresh practice: feature evaluator

For a second shorter session, implement a global enabled flag and per-user boolean overrides. Explicit false overrides must take precedence just like true. Clarify missing features/users. Then add segments and agree precedence. Use your domain experience, but practise writing a small TS implementation without translating a large PHP solution.

### Review and revision: 20–30 minutes after the mock

Identify three concrete gaps, reproduce each correction in a small fresh example, and choose one task for another attempt. Prioritise Map APIs, array outputs, return statements, union narrowing, async errors and test assertions if they caused difficulty. Avoid adding advanced material merely because the core lesson headings are complete.

### Review rubric

- Did I clarify behaviour before choosing a data structure?
- Did I write a working small step early?
- Did I handle missing values and edge cases?
- Did I explain types and runtime checks separately?
- Did I use compiler feedback rather than bypass it?
- Did I check behaviour with examples?
- Did I collaborate when requirements changed?
