# Requirements

## Problem Statement

Small retail stores often manage sales, inventory, purchases, suppliers, and expenses using disconnected tools such as notebooks, spreadsheets, or basic POS software. This makes it difficult to know accurate stock levels, track profit, review supplier purchases, and understand business performance.

Retail ERP aims to centralize these operations into one modular system that supports day-to-day store work while keeping business records consistent and auditable.

The MVP should stay practical. It should cover core store operations without becoming a full accounting system, multi-company SaaS platform, or advanced enterprise ERP.

## Target Users

- Business Owner: needs visibility into sales, profit, low stock, expenses, and business performance.
- Store Manager: needs to manage products, suppliers, purchases, inventory, and operational reports.
- Cashier: needs to search products, create sales quickly, apply simple discounts, and choose payment methods.
- Inventory Staff: needs to review stock levels and record stock adjustments, damaged items, lost items, and initial stock.

## Core Modules

- Authentication and role-based authorization
- User management with simple roles
- Product management
- Category management
- Supplier management
- Optional customer support for sales
- Inventory tracking
- Stock movement ledger
- Purchase invoices
- Sales invoices/POS sale creation
- Expense tracking
- Basic operational reports
- Swagger/API documentation

## Business Flows

### Sale Flow

A cashier, manager, or admin creates a sale by searching products, adding items to a cart, optionally applying an invoice-level discount, selecting a payment method, and confirming the sale.

Important rules:

- A sale cannot be created for inactive products.
- A sale cannot be created if any item has insufficient stock.
- Unit selling price and unit cost must be stored on the sale item at the time of sale.
- Product stock must decrease only after sale confirmation.
- Sale creation, sale items, stock updates, and stock movements must happen in one transaction.

### Purchase Flow

A manager or admin creates a purchase by selecting a supplier, adding purchased products, entering quantities and unit costs, optionally recording the supplier invoice number, and confirming the purchase.

Important rules:

- A purchase must contain at least one item.
- Quantity must be greater than zero.
- Unit cost must be greater than or equal to zero.
- Product stock must increase after purchase confirmation.
- Purchase creation, purchase items, stock updates, and stock movements must happen in one transaction.

### Stock Adjustment Flow

An inventory staff user, manager, or admin records stock changes that are not caused by normal sales or purchases.

Supported adjustment types:

- `ADJUSTMENT_IN`
- `ADJUSTMENT_OUT`
- `DAMAGE`
- `LOSS`
- `INITIAL_STOCK`

Important rules:

- Every adjustment requires a reason or note.
- Adjustment quantity must be greater than zero.
- Stock cannot go below zero.
- Every stock adjustment must create a stock movement record.

## Out of Scope

The following are out of scope for the MVP unless a later ticket explicitly includes them:

- Full accounting system
- Payroll
- Manufacturing or MRP
- Multi-company SaaS
- Multi-branch support
- E-commerce storefront
- Delivery or shipping management
- Advanced tax calculations
- Advanced loyalty system
- AI recommendations
- Mobile app

The following are also out of scope for `ERP-001` specifically:

- Auth implementation
- Database schema
- Product APIs
- Frontend screens
- Deployment setup
