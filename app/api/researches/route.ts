import { NextResponse } from "next/server";
import client from "../utils/db"; // Adjust path as needed

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

    // Default search value (to avoid empty params issue)
    const searchValue = search ? search.trim() : "";

    let query = `
      SELECT 
          r.id,
          r.title,
          r.researcher,
          r.status,
          r.progress_status,
          r.year,
          r.abstract,
          r.document,
          r.document_type,
          r.url,
          r.category,
          r.ratings,
          r.hashed_id,
          r.created_at,
          i.id AS institution_id,
          i.name AS institute,
          s.name AS school,
          s.id AS school_id,
          -- Count word matches
          (
              COALESCE((
                  LENGTH(LOWER(r.title || ' ' || r.researcher || ' ' || r.url || ' ' || r.category || ' ' || r.year || ' ' || r.document_type || ' ' || r.progress_status || ' ' || r.abstract)) - 
                  LENGTH(REPLACE(LOWER(r.title || ' ' || r.researcher || ' ' || r.url || ' ' || r.category || ' ' || r.year || ' ' || r.document_type || ' ' || r.progress_status || ' ' || r.abstract), $1, ''))
              ) / NULLIF(LENGTH($1), 0), 0)
          ) AS match_count,
          -- Compute similarity for each word
          (
            SELECT SUM(
                GREATEST(
                    similarity(r.title, word),
                    similarity(r.researcher, word),
                    similarity(r.abstract, word),
                    similarity(r.category, word),
                    similarity(r.document_type, word)
                )
            ) 
            FROM unnest(string_to_array($1, ' ')) AS word
          ) AS similarity_score
      FROM researches r
      JOIN institutions i ON CAST(i.id AS TEXT) = r.institution
      JOIN schools s ON CAST(s.id AS TEXT) = r.school
      WHERE r.status = 'Published'
    `;

    const params: string[] = [searchValue];

    if (search) {
      // Split search into words
      const searchWords = search.split(/\s+/).map((word:string) => `%${word}%`);
      
      // Create WHERE conditions
      const conditions = searchWords.map((_:string, index:number) => `
        r.title ILIKE $${index + 2} OR 
        r.researcher ILIKE $${index + 2} OR 
        r.url ILIKE $${index + 2} OR 
        r.category ILIKE $${index + 2} OR 
        r.year ILIKE $${index + 2} OR
        r.document_type ILIKE $${index + 2} OR
        r.progress_status ILIKE $${index + 2} OR
        r.abstract ILIKE $${index + 2}
      `);

      // Append conditions
      query += ` AND (${conditions.join(" OR ")})`;
      params.push(...searchWords);
    }

    // Sorting logic
    if (sort) {
      if (sort === "new") {
        query += ` ORDER BY r.created_at DESC`;
      } else if (sort === "trends") {
        query += ` ORDER BY r.ratings DESC`;
      } else if (sort === "all") {
        query += ` ORDER BY r.ratings ASC, r.progress_status ASC`;
      } else if (sort === "recommends") {
        query += ` AND r.ratings > 2.5 ORDER BY r.ratings DESC`;
      } else {
        query += ` ORDER BY match_count DESC, similarity_score DESC, r.created_at DESC`; // Default sorting
      }
    } else {
      query += ` ORDER BY match_count DESC, similarity_score DESC, r.created_at DESC`;
    }

    const result = await client.query(query, params);
    return NextResponse.json(result.rows, { status: 200 });

  } catch (error) {
    console.error("Error retrieving researches:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
