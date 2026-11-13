# Structure and tooling reference

FastAPI doesn't enforce a structure. Pick one by looking at the project, then stay consistent. If the project already has a structure, follow it and don't reorganize without being asked.

## Step 1: assess the project

- How many distinct domains does the plan describe (questions, users, attempts, billing)?
- Will several agents or people work on different features in parallel?
- Is it expected to grow beyond the first version?

## Structure A: layered (small APIs, 1–3 domains)

```
backend/
├── app/
│   ├── main.py          # app, lifespan, routers, middleware
│   ├── config.py        # pydantic-settings
│   ├── db.py            # engine, session dependency
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── routers/         # one file per resource
│   └── services/        # business logic
├── alembic/
├── tests/
└── pyproject.toml
```

## Structure B: feature-based (larger or growing APIs)

Each domain owns its router, schemas, models, service, and dependencies, so changes stay local and parallel work doesn't collide.

```
backend/
├── app/
│   ├── main.py
│   ├── core/            # config, db, security, shared dependencies, errors
│   ├── questions/
│   │   ├── router.py
│   │   ├── schemas.py
│   │   ├── models.py
│   │   ├── service.py   # business logic, no HTTP
│   │   └── dependencies.py
│   └── attempts/
├── alembic/
├── tests/
│   ├── conftest.py
│   ├── questions/
│   └── attempts/
└── pyproject.toml
```

## Layering rules (either structure)

- Routers handle HTTP only: parse input, call a service, return a schema.
- Services hold business logic and take plain arguments, so they're testable without HTTP.
- Data access stays in services or a repository layer, not scattered through routers.
- Domains import each other only through their public service functions, not each other's models or internals.
- State which structure you chose and why in your report.

## Tooling

- **uv** for environments and dependencies (`uv add`, `uv run`, `uv.lock` committed).
- **Ruff** for formatting and linting, configured in `pyproject.toml`.
- **Type checker** (mypy or pyright) in strict mode for app code.
- **pytest** for tests.
- **pre-commit** or CI runs all of the above on every change.
- A `Dockerfile` and `docker-compose.yml` (API + PostgreSQL) for local development and deployment.

## Python style

- Follow PEP 8 via Ruff; let the formatter decide layout.
- Modules and functions in `snake_case`, classes in `PascalCase`, constants in `UPPER_SNAKE_CASE`.
- Docstrings on public functions that aren't obvious from their name and types.
- Prefer composition and plain functions over deep class hierarchies.
- Use `logging` (structured where possible), never `print`, in application code.
