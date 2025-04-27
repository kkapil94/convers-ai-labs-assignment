import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET; // Using service role key for backend operations

export const getNotes = async (req, res) => {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const userId = req.user.id;

    // Fetch notes for the authenticated user
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching notes:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ notes: data });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const postNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    // Insert note
    const { data, error } = await supabase
      .from("notes")
      .insert({
        user_id: userId,
        title,
        content,
      })
      .select();

    if (error) {
      console.error("Error creating note:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ note: data[0] });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
