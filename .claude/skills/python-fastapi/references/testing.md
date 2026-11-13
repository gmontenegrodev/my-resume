# Testing reference

Condensed from the FastAPI testing docs and pytest conventions.

## Setup

- Use `pytest`. For async apps, use `httpx.AsyncClient` with `ASGITransport(app=app)` and an async test plugin (`pytest-asyncio` or `anyio`). For sync apps, `TestClient` is fine.
- Use a separate test database (a throwaway PostgreSQL in Docker, or a dedicated test schema). Run migrations at the start of the test session.
- Override dependencies in tests: `app.dependency_overrides[get_session] = get_test_session`. Clear overrides after each test.
- Isolate tests: wrap each one in a transaction that rolls back, or truncate tables between tests.

## Fixtures

- Put shared fixtures in `tests/conftest.py`: the client, a session, a logged-in user, sample data.
- Use factory functions or fixtures to create test data instead of repeating setup in every test.
- Keep fixtures small and composable.

## What to test for every endpoint

1. **Happy path:** correct status code and response body that matches the contract exactly.
2. **Invalid input:** missing fields, wrong types, out-of-range values return 422.
3. **Not found:** missing resources return 404.
4. **Auth:** no token returns 401; another user's resource returns 404.
5. **Edge cases:** empty lists, maximum lengths, duplicates (409).

## Contract tests

- Assert the response shape against the contract, field by field, so contract drift fails the build.
- Optionally snapshot the generated OpenAPI schema and fail if it changes unexpectedly.

## Unit tests

- Test business logic (scoring, selection, validation rules) as plain functions, without HTTP, so they run fast.
- Mock external services (email, payment, third-party APIs) at the boundary; never call real ones in tests.

## Running

- `uv run pytest` locally and in CI. Add coverage reporting and keep it meaningful, not just high.
- Tests must pass before reporting a task as done.
