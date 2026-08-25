---
---

# API Authentication and Safety

The Console HTTP API is primarily an internal contract used by the browser application. It is not a public cloud API and should not be exposed directly to untrusted networks.

## Browser Session

The normal Console signs in through the authentication routes, receives an HTTP-only session cookie, and includes the current CSRF token on state-changing requests. A successful login may rotate the session/CSRF state.

## Integration Adapter

The optional Discord/integration adapter uses its own bearer token and role-to-policy mapping. It is disabled by default. Write commands require explicit enablement in addition to authentication.

## Response and Mutation Rules

- Read routes generally use `GET`; mutations use `POST`, `PUT`, or `DELETE`.
- Destructive actions can require an exact confirmation phrase.
- IDs that exceed JavaScript's safe integer range remain decimal strings.
- Permission checks map each route to a narrow IAM action.
- Mutations are rate-limited and audited.
- Errors are JSON responses with a safe `error` message; secrets are redacted.

See [Console HTTP API](http-api.md) for the complete endpoint reference.

