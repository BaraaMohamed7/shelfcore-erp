# Architecture

## Architecture Style

Retail ERP will use a modular monolith architecture.

The backend will be one deployable NestJS application, organized by business modules such as products, purchases, sales, and inventory. This gives the project clear boundaries without adding the operational complexity of microservices.

The frontend will be one Next.js application that consumes the backend API and presents role-appropriate workflows for owners, managers, cashiers, and inventory staff.

## Why Modular Monolith?

A modular monolith is the best fit for this project stage because:

- The product is small to medium-sized.
- One backend service is easier to build, test, deploy, and debug.
- Business domains can still be separated into clear modules.
- Cross-module transactions, especially stock updates during sales and purchases, are simpler and safer inside one application and one database.
- Microservices would add unnecessary complexity around networking, deployment, observability, and distributed transactions.

The goal is not to avoid structure. The goal is to keep strong module boundaries while maintaining a simple deployment model.

## Backend Modules

Expected backend module structure:

```txt
src/
  auth/
  users/
  products/
  categories/
  suppliers/
  customers/
  purchases/
  sales/
  inventory/
  expenses/
  reports/
  common/
    guards/
    decorators/
    filters/
    interceptors/
  prisma/
```

Module responsibility direction:

- `auth`: login, JWT issuing, and authentication strategy.
- `users`: user records, active status, and role assignment.
- `products`: product data, SKU/barcode rules, pricing, and active status.
- `categories`: product categorization.
- `suppliers`: supplier records used by purchases.
- `customers`: optional customer records for sales.
- `purchases`: purchase invoice creation and purchase items.
- `sales`: POS-style sale creation and sale items.
- `inventory`: stock movement ledger and stock adjustments.
- `expenses`: simple expense records.
- `reports`: operational reporting queries.
- `common`: shared guards, decorators, filters, interceptors, and reusable infrastructure.
- `prisma`: Prisma client, database access setup, and transaction support.

## Database Choice

PostgreSQL will be used as the primary database.

Reasons:

- The system is relational by nature.
- Sales, purchases, products, suppliers, customers, and stock movements require clear relationships.
- Transactions are essential for inventory correctness.
- Reporting requires reliable querying and aggregation.
- Constraints and indexes can protect business rules such as unique SKUs and invoice numbers.

## ORM Choice

Prisma will be used as the ORM.

Reasons:

- Strong TypeScript developer experience.
- Type-safe database access.
- Schema and migration management.
- Good support for transactional business flows.
- Clear generated types that help junior developers understand database shape.

Prisma does not replace database design. The schema still needs careful decisions around relationships, indexes, constraints, and transactional boundaries.

## Authentication Strategy

Authentication will use JWT in a later ticket.

Authorization will use simple role-based access control for the MVP with one enum-like role on the user model:

- `ADMIN`
- `MANAGER`
- `CASHIER`
- `INVENTORY_STAFF`

The MVP should avoid dynamic permission tables unless a future ticket proves they are needed. Simple RBAC is easier to reason about and sufficient for the current product scope.

## Stock Management Strategy

Stock will be stored in two ways:

- `Product.currentStock` for fast reads.
- `StockMovement` records for history, auditability, and debugging.

Every stock-changing operation must update both inside the same database transaction.

This rule applies to:

- Sales
- Purchases
- Stock adjustments
- Damaged items
- Lost items
- Initial stock entries

Direct stock updates without stock movement records are not allowed because they make inventory history impossible to audit.

## Error Handling Strategy

The backend should use consistent HTTP errors and validation responses.

Direction for later implementation:

- Validate request DTOs before business logic runs.
- Return clear `400` responses for invalid input.
- Return `401` for unauthenticated requests.
- Return `403` for authenticated users without the required role.
- Return `404` when a requested record does not exist.
- Return conflict-style errors for duplicate business identifiers such as SKU, barcode, or invoice number.
- Keep internal implementation details out of API responses.

Business rule failures should be explicit. For example, insufficient stock should return a clear message instead of a generic server error.

## API Documentation

Swagger/OpenAPI will be added when backend endpoints are implemented.

API documentation should describe:

- Endpoint purpose
- Required roles
- Request body shape
- Query parameters
- Response shape
- Common error responses

For `ERP-001`, no API implementation or Swagger setup is created yet. This document only records the planned direction.
