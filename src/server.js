import "dotenv/config";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { getNotes, postNotes } from "./controllers/note.controller.js";
import { authenticateUser } from "./middlewares/authenticateUser.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Create Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Routes
app.get("/notes", authenticateUser, getNotes);
app.post("/notes", authenticateUser, postNotes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
