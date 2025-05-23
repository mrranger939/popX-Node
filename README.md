# School Management API

Node.js API to add schools and list them by proximity using Express.js and PostgreSQL (Supabase).

## Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. Create a `.env` file based on `.env.example`:
   ```
   DATABASE_URL=your_supabase_database_url
   PORT=3000
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. API will be available at `http://localhost:3000` or your deployed URL.

---

## API Endpoints

### POST /addSchool

Add a new school.

**Request Body:**
```json
{
  "name": "ABC School",
  "address": "123 Main St",
  "latitude": 12.34,
  "longitude": 56.78
}
```

**Success Response:**
```json
{
  "message": "School added successfully"
}
```

**Error Response:**
```json
{
  "error": "Invalid input"
}
```

---

### GET /listSchools?lat=12.34&lon=56.78

List schools sorted by proximity to the specified latitude and longitude.

**Query Parameters:**
- `lat`: Latitude (required)
- `lon`: Longitude (required)

**Sample Response:**
```json
[
  {
    "id": 1,
    "name": "St. Joseph High School",
    "address": "5th Avenue, Hyderabad",
    "latitude": 17.385,
    "longitude": 78.4867,
    "distance": 0.90
  },
  {
    "id": 2,
    "name": "ABC High School",
    "address": "123 Street, City",
    "latitude": 12.34567,
    "longitude": 76.54321,
    "distance": 4.32
  }
]
```

---

## Notes

- Supabase PostgreSQL must be reachable.
- `DATABASE_URL` should be correctly set in `.env`.
- Repeated POSTs with the same data will create duplicates (no uniqueness enforced).
- Use Postman or similar tool for testing.
