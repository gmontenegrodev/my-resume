---
name: python-fastapi
description: Best practices for building backends with modern Python and FastAPI, based on the official FastAPI, Pydantic, SQLAlchemy, and Python documentation. Use this skill for ANY backend work in a Python project, including creating API endpoints, request and response models, database models and migrations, dependencies, authentication, background work, configuration, error handling, tests, or project structure, even if the request doesn't mention FastAPI by name.
---

# Python + FastAPI Backend Practices

These rules come from the official FastAPI, Pydantic, and SQLAlchemy docs plus modern Python conventions, condensed into how to work day to day. Follow the core rules on every task, and read the matching reference file when a task touches that area.

## Before you write code

1. Read the project's CLAUDE.md and PLAN.md. The API contract in PLAN.md is the source of truth: paths, methods, request bodies, response shapes, and status codes. Implement it exactly.
2. If the contract seems wrong or incomplete, stop and report it. Never change it on your own; the frontend is building against it.
3. Check `pyproject.toml` for the actual Python, FastAPI, Pydantic, and SQLAlchemy versions before using a newer API. If the project bundles agent docs or skills for a library, prefer those over memory.
4. Follow the project's existing structure and patterns.

## Core rules (always apply)

**Python**
- Type-hint every function signature and return value. The code must pass the type checker.
- Use modern syntax: `list[str]`, `str | None`, f-strings, `pathlib`, dataclasses or Pydantic models instead of loose dicts.
- Manage dependencies with `uv` and `pyproject.toml`. Format and lint with Ruff.
- Small functions, clear names, no clever one-liners. Raise specific exceptions; never use a bare `except:`.

**API design**
- Every endpoint declares a Pydantic request model and a `response_model` (or return type). Never return raw ORM objects or dicts with unknown fields.
- Use separate schemas for input and output (`QuestionCreate`, `QuestionRead`) so internal fields like password hashes can never leak.
- Use correct HTTP methods and status codes: 201 for creation, 204 for deletion with no body, 404 when missing, 422 for invalid input, 409 for conflicts.
- Group endpoints with `APIRouter` per feature, with tags, so the OpenAPI docs stay organized.
- Paginate any endpoint that returns a list.

**Dependencies**
- Use `Depends` with `Annotated` types for shared logic: database sessions, the current user, settings, pagination params.
- Database sessions come from a dependency that closes them reliably (a `yield` dependency).

**Async**
- Use `async def` only when everything inside is async (async DB driver, `httpx.AsyncClient`). For blocking libraries, use plain `def` so FastAPI runs it in a thread pool.
- Never call blocking code (`requests`, `time.sleep`, sync DB calls) inside an `async def` endpoint.

**Data**
- All schema changes go through Alembic migrations. Never edit the database by hand or call `create_all` in production code.
- Avoid N+1 queries: load related data explicitly.

**Security**
- Validate all input with Pydantic, with sensible constraints (lengths, ranges, enums).
- Secrets come from environment variables loaded through `pydantic-settings`. Never hardcode them or commit `.env`.
- Hash passwords with a modern algorithm (Argon2 or bcrypt); never store or log them in plain text.
- Check authorization inside the endpoint or its dependency, for every protected resource, not just authentication.
- Configure CORS with an explicit list of allowed origins, never `*` with credentials.

**Errors**
- Raise `HTTPException` with a clear message for expected errors. Add exception handlers for domain errors so endpoints stay clean.
- Never expose stack traces, SQL, or internal details in responses. Log them server-side instead.

**Tests**
- Every endpoint gets tests for the happy path, invalid input, not found, and unauthorized cases.
- Tests use a separate test database and dependency overrides, never the real one.

## When to read the reference files

| Task touches... | Read |
|---|---|
| Endpoints, routers, dependencies, lifespan, responses, background tasks | `references/fastapi.md` |
| Models, sessions, queries, relationships, migrations, seed data | `references/database.md` |
| Auth, passwords, tokens, CORS, rate limits, secrets | `references/security.md` |
| Writing and running tests | `references/testing.md` |
| Folder structure, config, tooling, Python style | `references/structure.md` |

## Before reporting back

- Run Ruff, the type checker, and the full test suite; fix what fails.
- Confirm every endpoint in the contract exists and matches it exactly (check `/docs` or the generated OpenAPI schema).
- Report what you built, the files changed, the endpoints now available, any new migrations or env vars, and anything in PLAN.md that seemed wrong or missing.
