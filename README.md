# Retail ERP

## Overview

Retail ERP is a modular business management system for small retail stores that sell physical products such as accessories, bags, wallets, gifts, and similar retail items.

The goal is to build a realistic, portfolio-grade ERP/POS project that helps a store manage products, inventory, purchases, sales, suppliers, customers, expenses, and operational reports from one dashboard.

This repository is being built ticket by ticket. The current ticket, `ERP-001`, only establishes the initial repository structure and project documentation. Application code, database schema, authentication, APIs, and frontend screens are intentionally out of scope for this ticket.

## Tech Stack

Planned backend stack:

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT authentication
- Role-based access control
- Swagger/OpenAPI documentation

Planned frontend stack:

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Hook Form
- Zod
- TanStack Table
- Recharts

Architecture direction:

- Modular monolith
- Clear backend module boundaries
- Transactional business flows for sales, purchases, and stock updates

## Project Structure

```txt
retail-erp/
  backend/              # Backend application placeholder for NestJS app
  frontend/             # Frontend application placeholder for Next.js app
  docs/
    architecture.md     # Architecture decisions and technical direction
    requirements.md     # Product scope, users, modules, and business flows
    workflow.md         # Branch, commit, PR, and ticket workflow
  AGENTS.md             # Persistent project context for AI coding agents
  README.md             # Project overview
```

## Main Modules

The MVP is planned around these business modules:

- Authentication and users
- Products and categories
- Suppliers
- Customers
- Inventory and stock movements
- Purchases
- Sales/POS invoices
- Expenses
- Reports

Each module should stay focused on its own business responsibility. Cross-module flows such as purchases, sales, and stock adjustments must preserve data consistency and auditability.

## Getting Started

This ticket does not generate the backend or frontend applications yet. For now, use the repository as the source of project documentation and architecture direction.

Recommended first steps for a developer joining the project:

1. Read `AGENTS.md` to understand product scope, business rules, and ticket workflow.
2. Read `docs/requirements.md` to understand the product problem and MVP boundaries.
3. Read `docs/architecture.md` to understand the technical direction.
4. Read `docs/workflow.md` before starting a branch or PR.

Future setup commands will be added after the NestJS backend and Next.js frontend are generated in later tickets.

## Development Workflow

Development should follow a small-ticket workflow:

- Work on one ticket at a time.
- Keep branches focused and named clearly, for example `feature/products-crud` or `docs/architecture-decisions`.
- Use conventional-style commits, for example `docs(project): add initial architecture notes`.
- Keep pull requests small enough to review.
- Do not implement out-of-scope features without updating the ticket scope first.

Before opening a PR, confirm that the change matches the acceptance criteria, includes relevant documentation, and avoids unrelated changes.
