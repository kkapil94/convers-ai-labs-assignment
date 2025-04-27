# Supabase Notes Service

A simple note-taking service built with Express.js and Supabase.

## Schema Design

The notes table has the following structure:

```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Why this schema?**

- UUID as primary key for security and distributed generation
- Required user_id to associate notes with specific users
- Optional title for flexible note organization
- Required content field for the actual note text
- Automatic timestamps for tracking creation and updates

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Supabase account

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Navigate to the SQL Editor in your Supabase dashboard
3. Execute the schema.sql query to create the notes table
4. Copy your project URL, anon key, and service role key from the API settings

### Local Development Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your Supabase credentials:
   ```
   PORT=3000
   SUPABASE_URL=your_project_url
   SUPABASE_KEY=your_anon_key
   SUPABASE_SECRET=your_service_role_key
   ```
4. Start the server:
   ```
   npm start
   ```
5. For development with auto-reload:
   ```
   npm run dev
   ```

## Project Structure

```
supabase-notes-express/
├── .env                  # Environment variables (not in repo)
├── .gitignore            # Git ignore file
├── package.json          # Node.js dependencies and scripts
├── server.js             # Express server setup
├── schema.sql            # Database schema definition
├── README.md             # This documentation file
└── functions/            # API route handlers
    ├── get_notes.js      # GET /notes handler
    └── post_notes.js     # POST /notes handler
```

## API Endpoints

### GET /notes

- **Purpose**: Retrieve all notes for the authenticated user
- **Auth**: Bearer token in Authorization header
- **Why this design**: Standard RESTful endpoint to retrieve user's notes, with authentication via header for security

### POST /notes

- **Purpose**: Create a new note
- **Auth**: Bearer token in Authorization header
- **Body**:
  ```json
  {
    "title": "Optional note title",
    "content": "Required note content"
  }
  ```
- **Why this design**: Standard RESTful endpoint to create resources, with data in request body for clean separation

## Example Usage

### Create a Note

```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Note","content":"This is the content of my first note"}'
```

Example response:

```json
{
  "note": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "user_id": "c4d5e1f2-3e4f-5a6b-7c8d-9e0f1a2b3c4d",
    "title": "My First Note",
    "content": "This is the content of my first note",
    "created_at": "2025-04-27T12:34:56.789Z",
    "updated_at": "2025-04-27T12:34:56.789Z"
  }
}
```

### Get All Notes

```bash
curl -X GET http://localhost:3000/notes \
```

Example response:

```json
{
  "notes": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "user_id": "c4d5e1f2-3e4f-5a6b-7c8d-9e0f1a2b3c4d",
      "title": "My First Note",
      "content": "This is the content of my first note",
      "created_at": "2025-04-27T12:34:56.789Z",
      "updated_at": "2025-04-27T12:34:56.789Z"
    }
  ]
}
```

## Deployment

For production deployment:

1. Deploy this Express app to a service like Heroku, Render, or DigitalOcean App Platform
2. Set the environment variables in your hosting provider's dashboard
3. Ensure proper CORS configuration for your frontend application

## Security Considerations

- The service uses Supabase's row-level security to ensure users can only access their own notes
- All API endpoints require authentication
- Service role key is used only on the server side and never exposed to clients

## Future Enhancements

- Add note update and delete endpoints
- Implement note categories or tags
- Add sorting and filtering options
- Create a frontend application
