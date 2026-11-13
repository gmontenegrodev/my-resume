# Database reference

Condensed from the SQLAlchemy 2.0, Alembic, and FastAPI SQL database docs. Default stack: PostgreSQL, SQLAlchemy 2.0 (async), Alembic. If the project uses SQLModel or another ORM, follow it.

## Models

- Use SQLAlchemy 2.0 typed declarative style: `Mapped[...]` with `mapped_column(...)`.
- Every table gets a primary key, and `created_at` / `updated_at` timestamps when the data changes over time.
- Add database constraints, not just Python checks: `nullable=False`, `unique=True`, foreign keys, check constraints. The database is the last line of defense.
- Index columns you filter or join on often.
- Use enums for fixed sets of values (e.g. question type: `multiple_choice`, `fill_blank`).
- Keep ORM models (database shape) separate from Pydantic schemas (API shape). Convert explicitly, with `model_validate(obj)` and `from_attributes=True`.

## Sessions

- Create one engine at startup and a session factory (`async_sessionmaker`).
- One session per request, provided by a `yield` dependency. Commit on success, roll back on error, always close.
- Don't share sessions across requests or tasks.

## Queries

- Use the 2.0 style: `select(Question).where(Question.topic_id == topic_id)`, executed with `session.scalars(...)` or `session.execute(...)`.
- Load relationships explicitly with `selectinload` or `joinedload` to avoid N+1 queries. In async code, lazy loading raises errors, so plan loads up front.
- Always use parameterized queries (the ORM does this). Never build SQL with f-strings.
- For random selection on large tables, avoid `ORDER BY random()` on the whole table; sample ids or use a smarter strategy, and note the tradeoff.
- Paginate with `limit` and `offset`, or keyset pagination for large tables.

## Migrations (Alembic)

- Every schema change gets a migration: `alembic revision --autogenerate -m "add questions table"`, then review the generated file before applying. Autogenerate misses some changes (renames, some constraints).
- Migrations must be reversible: write the `downgrade`.
- Never edit a migration that has been applied to a shared database; create a new one.
- Run `alembic upgrade head` in the test setup and on deploy.

## Seed data

- Keep seed data in a script or a data migration that can run repeatedly without duplicating rows.
- Seed data matches the contract's examples so the frontend's mocks and the real API agree.

## Transactions

- Group related writes in one transaction so they succeed or fail together.
- Handle unique constraint violations by catching the integrity error and returning 409, not 500.
