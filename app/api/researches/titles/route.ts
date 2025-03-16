import { NextResponse } from "next/server";
import client from "../../utils/db"; // Adjust path as needed

export async function POST(req: Request) {
  let requestBody;
    
  // Safe JSON parsing
  try {
    requestBody = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON format in request." }, { status: 400 });
  }

  try {
    const { search, sort } = requestBody;
    const searchValue = search ? search.trim() : "";
    const searchWords = searchValue.split(/\s+/).filter(Boolean);

    let query = `
      SELECT r.title
      FROM researches r
      WHERE r.status = 'Published'
    `;
    
    const params: string[] = [];

    if (searchWords.length > 0) {
      const conditions = searchWords.map((_: string, index: number) => `
        r.title ILIKE $${index + 1} OR
        r.researcher ILIKE $${index + 1} OR
        r.url ILIKE $${index + 1} OR
        r.category ILIKE $${index + 1} OR
        r.year ILIKE $${index + 1} OR
        r.document_type ILIKE $${index + 1} OR
        r.progress_status ILIKE $${index + 1} OR
        r.abstract ILIKE $${index + 1}
      `);
      query += ` AND (${conditions.join(" OR ")})`;
      params.push(...searchWords.map((word: string) => `%${word}%`));
    }

    // Sorting logic
    if (sort) {
      if (sort === "new") {
        query += " ORDER BY r.created_at DESC";
      } else if (sort === "trends") {
        query += " ORDER BY r.ratings DESC";
      } else if (sort === "all") {
        query += " ORDER BY r.ratings ASC, r.progress_status ASC";
      } else if (sort === "recommends") {
        query += " AND r.ratings > 2.5 ORDER BY r.ratings DESC";
      }
    }
    
    const result = await client.query(query, params);
    return NextResponse.json(result.rows.map((row: { title: string }) => row.title), { status: 200 });


  } catch (error) {
    console.error("Error retrieving titles:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
