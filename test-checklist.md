## Authentication API Tests

Tested with Postman.

Base URL:

```txt
http://localhost:3000
```

### Test 1 — Register student

Endpoint:

```txt
POST /api/auth/register
```

Result:

```txt
Passed
```

Notes:

```txt
A new user was created with role = student.
The response returned a safe user object.
password_hash was not returned.
```

### Test 2 — Current user after register

Endpoint:

```txt
GET /api/auth/me
```

Result:

```txt
Passed
```

Notes:

```txt
The session cookie was saved by Postman.
The API returned the logged-in student user.
```

### Test 3 — Logout

Endpoint:

```txt
POST /api/auth/logout
```

Result:

```txt
Passed
```

Notes:

```txt
The user session was destroyed successfully.
```

### Test 4 — Current user after logout

Endpoint:

```txt
GET /api/auth/me
```

Result:

```txt
Passed
```

Expected:

```txt
401 Unauthorized
```

### Test 5 — Login student

Endpoint:

```txt
POST /api/auth/login
```

Result:

```txt
Passed
```

Notes:

```txt
Student login works with email and password.
The response returned role = student.
```

### Test 6 — Register cannot create admin

Endpoint:

```txt
POST /api/auth/register
```

Result:

```txt
Passed
```

Notes:

```txt
Even when the request body sent role = admin, the backend created the user as role = student.
This confirms that public registration cannot create admin users.
```

### Test 7 — Login admin

Endpoint:

```txt
POST /api/auth/login
```

Result:

```txt
Passed
```

Notes:

```txt
Admin login works using the seeded admin account from .env.
The response returned role = admin.
```

### Test 8 — Admin authorization

Endpoint:

```txt
GET /api/admin/me
```

Result:

```txt
Passed
```

Notes:

```txt
Admin users can access admin session verification.
Student users cannot access admin-only routes.
```

## Final result

```txt
Authentication API tests passed.
Register, login, logout, session check, student role protection, and admin role access are working.
```

## UI and CRUD Checklist

- [ ] Bootstrap CSS loads correctly on the main pages.
- [ ] Existing custom OSBT design still looks correct after adding Bootstrap classes.
- [ ] Admin can create a new event.
- [ ] Admin can view/list events in the dashboard.
- [ ] Admin can edit an event title, category, date, and description.
- [ ] Admin can delete an event.
- [ ] Public/user Events page can view events.
- [ ] Student user cannot access admin event create/edit/delete tools.
- [ ] Student request submission still works.
- [ ] Admin can still view requests.
- [ ] Admin can still mark requests as pending/done.
