# Security reference

Condensed from the FastAPI security tutorial and OWASP API Security guidance. Sam (security) audits against these, so build to them from the start.

## Authentication

- Use FastAPI's security utilities (`OAuth2PasswordBearer`, `HTTPBearer`) so auth shows up correctly in the docs.
- For token auth, issue short-lived signed JWTs (or opaque session tokens stored server-side). Set an expiry, and verify signature, expiry, and audience on every request.
- Hash passwords with Argon2 (via `pwdlib`) or bcrypt. Never log, return, or store plain passwords.
- Return the same error for "user not found" and "wrong password" to avoid revealing which accounts exist.
- If using a managed auth provider, verify its tokens on the backend rather than trusting the frontend.

## Authorization

- Authentication says who the user is; authorization says what they can do. Check both.
- Check ownership on every object access: `GET /attempts/{id}` must confirm the attempt belongs to the current user, or return 404.
- Put role or permission checks in dependencies so they're reusable and hard to forget.
- Never trust ids, roles, or prices sent by the client.

## Input and output

- Validate everything with Pydantic constraints: `Field(min_length=1, max_length=200)`, `ge`/`le`, `EmailStr`, enums. Reject unknown fields where it matters (`model_config = ConfigDict(extra="forbid")`).
- Limit request body size and list lengths.
- Output schemas include only fields the client should see.
- Never pass user input to shell commands, `eval`, file paths, or raw SQL.

## Secrets and configuration

- Load config with `pydantic-settings` from environment variables. Required settings have no defaults, so a missing one fails at startup.
- `.env` is in `.gitignore`; commit a `.env.example` with placeholder values instead.
- Debug mode and detailed errors are off in production.

## Transport and headers

- CORS: explicit allowed origins from settings. Never `allow_origins=["*"]` together with credentials.
- Serve over HTTPS in production; set secure, HTTP-only, SameSite cookies if using cookies.

## Abuse protection

- Rate-limit login, signup, and any expensive endpoint.
- Paginate and cap list endpoints so one request can't dump the whole database.
- Log auth failures and suspicious activity without logging secrets or tokens.

## Dependencies

- Pin dependencies in `uv.lock`, and run `pip-audit` (or `uv` audit tooling) regularly to catch known vulnerabilities.
