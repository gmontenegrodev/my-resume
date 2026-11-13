# FastAPI reference

Condensed from the FastAPI tutorial and advanced user guide (fastapi.tiangolo.com).

## Path operations

- Declare path params, query params, and bodies with type hints; FastAPI validates and documents them.
- Use `Annotated` for metadata: `q: Annotated[str | None, Query(max_length=50)] = None`.
- Set `status_code=` on the decorator for non-200 success codes.
- Use `response_model` (or the return annotation) to filter output. Use `response_model_exclude_unset=True` for PATCH-style responses when useful.
- Add `summary`, `description`, and `responses={404: {...}}` so the OpenAPI docs are accurate. The frontend and other agents read them.

## Routers

```python
router = APIRouter(prefix="/questions", tags=["questions"])

@router.get("", response_model=list[QuestionRead])
async def list_questions(
    session: SessionDep,
    topic: str,
    count: Annotated[int, Query(ge=1, le=50)] = 10,
) -> list[QuestionRead]:
    ...
```

- One router per feature, included in `main.py` with `app.include_router(...)`.
- Put shared dependencies on the router (`dependencies=[Depends(get_current_user)]`) when every route needs them.
- Version the API with a prefix (`/api/v1`) when it's public or long-lived.

## Dependencies

- Define reusable aliases: `SessionDep = Annotated[AsyncSession, Depends(get_session)]`, `CurrentUser = Annotated[User, Depends(get_current_user)]`.
- Dependencies can depend on other dependencies; FastAPI caches each one per request.
- Use `yield` dependencies for resources that need cleanup (sessions, clients). Code after `yield` runs after the response.
- In tests, swap dependencies with `app.dependency_overrides`.

## App lifecycle

- Use the `lifespan` async context manager for startup and shutdown work (creating connection pools, HTTP clients, loading models). The old `@app.on_event` is deprecated.
- Store shared clients on `app.state` or expose them through dependencies.

## Responses and errors

- Return Pydantic models; FastAPI serializes them.
- For expected failures, `raise HTTPException(status_code=404, detail="Question not found")`.
- Define domain exceptions (e.g. `QuestionNotFound`) and register handlers with `@app.exception_handler` to map them to HTTP responses consistently.
- Keep a consistent error body shape across the API so the frontend can handle errors in one place.

## Background work

- `BackgroundTasks` is for small, quick jobs after a response (sending an email). Anything long, retried, or critical belongs in a real task queue.
- For streaming responses, use `StreamingResponse` or the built-in server-sent events support in recent versions.

## Middleware

- Keep middleware for cross-cutting concerns only: CORS, request ids, logging, timing.
- Add `CORSMiddleware` with explicit origins from settings.

## Running

- Development: `fastapi dev app/main.py` (auto-reload). Production: `fastapi run` or Uvicorn with multiple workers behind a proxy.
- Interactive docs live at `/docs`; use them to verify the contract after implementing.
