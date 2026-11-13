# PLAN.md

What we are building. The backend, frontend, and reviewer agents treat this file as the source of truth. Fill it in before asking an agent to build anything, and update it when a decision changes.

## 1. Goal

- **Problem:** [what problem this solves, and for whom]
- **Outcome:** [what a user can do when this is finished]
- **Success looks like:** [how we know it works, e.g. "a visitor can request a quote in under a minute"]

## 2. Scope

**In this version**
- [feature or page]
- [feature or page]

**Not in this version**
- [things we decided to leave out, so agents don't build them]

## 3. Pages and sections

List every page. For a landing page, list its sections in order.

| Page or section | Purpose | Content | Primary action |
|---|---|---|---|
| [Home / Hero] | [what it must communicate] | [headline, text, image] | [button label and where it goes] |
| [ ] | [ ] | [ ] | [ ] |

## 4. API contract

Delete this section if the project has no backend. The backend implements it exactly, and the frontend builds against it exactly.

Base URL: `[/api/v1]`

### [METHOD] [/path]

- **Purpose:** [what it does]
- **Auth:** [public / logged-in user / admin]
- **Request:**
  ```json
  { "field": "type and rules" }
  ```
- **Response [status code]:**
  ```json
  { "field": "type" }
  ```
- **Errors:** [e.g. 404 when not found, 409 when duplicate, 422 when invalid]

Copy the block above for each endpoint.

### Error format

All errors use the same shape:

```json
{ "detail": "Human-readable message" }
```

## 5. Data model

Delete this section if nothing is stored.

| Entity | Fields | Rules and relationships |
|---|---|---|
| [User] | [id, email, created_at] | [email is unique] |
| [ ] | [ ] | [ ] |

**Seed data:** [none, or what sample data to create]

## 6. Forms and integrations

| Form or service | What it does | Where the data goes |
|---|---|---|
| [Contact form] | [name, email, message] | [email to owner / database / third-party service] |

**Environment variables needed:** [names only, never values]

## 7. Tasks

Ordered list of work. Mark items done as you go.

- [ ] [task, and which agent does it]
- [ ] [task]

## 8. Decisions and open questions

**Decided**
- [date] [decision and the reason]

**Open**
- [question that needs the user's answer before building]
