# Development Workflow

This project should be developed ticket by ticket, similar to a small professional software team. Each change should have a clear scope, acceptance criteria, implementation notes, and testing notes.

## Branch Naming

Use short branch names that describe the type and purpose of the work.

Recommended pattern:

- `feature/module-name`
- `fix/bug-description`
- `refactor/area-name`
- `docs/topic-name`

Examples:

- `docs/project-setup`
- `feature/auth-rbac`
- `feature/products-crud`
- `feature/purchases-create`
- `fix/stock-negative-validation`

## Commit Style

Use conventional-style commits so project history stays readable.

Format:

```txt
type(scope): message
```

Common types:

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation-only change
- `refactor`: code change without behavior change
- `test`: test-only change
- `chore`: tooling, setup, or maintenance

Examples:

- `docs(project): add initial requirements`
- `feat(products): add product creation endpoint`
- `fix(inventory): prevent negative stock adjustment`
- `refactor(auth): simplify role guard`

## Pull Request Checklist

Before considering a PR ready, check:

- Feature matches the ticket acceptance criteria.
- Scope is limited to the current ticket.
- Input validation is added when API endpoints are involved.
- Authorization rules are enforced when protected endpoints are involved.
- Error handling is consistent.
- Database transactions are used for multi-step business operations.
- Swagger/OpenAPI docs are updated when API endpoints are added.
- Manual testing is completed and documented.
- Automated tests are added when the codebase has a test setup for the touched area.
- No unrelated changes are included.
- Documentation is updated when behavior or architecture changes.

For `ERP-001`, the checklist focuses on repository structure and documentation because no application code is implemented yet.

## Ticket Workflow

Each ticket should start with this structure:

```md
## My Understanding

## Assumptions

## Questions

## Implementation Plan

## Testing Plan

## PR Summary
```

Recommended working habits:

- Clarify ambiguity before coding.
- Keep the implementation smaller than the ticket, not larger.
- Prefer simple designs until the project proves it needs more abstraction.
- Document important decisions near the work.
- Test the important business rule, not only the happy path.
- Write the PR summary as if another engineer will review it.

For learning, treat each ticket as practice for professional engineering: understand requirements, identify edge cases, implement the smallest correct solution, verify it, then explain the trade-offs clearly.

## Mentorship Rhythm

For this project, the developer acts as a team member working through focused tickets. The AI assistant acts as a team lead and mentor.

Expected rhythm:

- Start each ticket by restating the requirement in your own words.
- Identify assumptions before implementation.
- Ask specific questions when requirements are unclear.
- Keep the code or documentation change scoped to the ticket.
- Write testing notes even for documentation-only tickets.
- Capture one or two learning topics after each ticket.

This is intended to build professional habits: clear communication, small PRs, business-rule thinking, and reviewable work.
