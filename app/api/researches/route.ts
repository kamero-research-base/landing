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
 
    // Return empty results for empty search
    const searchValue = search ? search.trim() : "";
    if (!searchValue) {
      // Return all results when no search query (for initial load)
      const allResultsQuery = `
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
          r.ratings * 2 AS relevance_score,
          100 AS match_coverage
        FROM researches r
        JOIN institutions i ON CAST(i.id AS TEXT) = r.institution
        JOIN schools s ON CAST(s.id AS TEXT) = r.school
        WHERE r.status = 'Published'
      `;
      
      let finalQuery = allResultsQuery;
      
      // Apply sorting for empty search
      if (sort) {
        if (sort === "new") {
          finalQuery += ` ORDER BY r.created_at DESC`;
        } else if (sort === "trends") {
          finalQuery += ` ORDER BY r.ratings DESC`;
        } else if (sort === "all") {
          finalQuery += ` ORDER BY r.ratings ASC, r.progress_status ASC`;
        } else if (sort === "recommends") {
          finalQuery += ` AND r.ratings > 2.5 ORDER BY r.ratings DESC`;
        } else {
          finalQuery += ` ORDER BY r.created_at DESC`;
        }
      } else {
        finalQuery += ` ORDER BY r.created_at DESC`;
      }
      
      finalQuery += ` LIMIT 100`;
      
      const allResults = await client.query(finalQuery);
      return NextResponse.json(allResults.rows, { status: 200 });
    }
 
    // Clean and prepare search terms
    const searchTerms = searchValue
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Remove special characters
      .split(/\s+/)
      .filter((term: string) => term.length > 0);
    
    if (searchTerms.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    let query = `
      WITH search_results AS (
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
          
          -- Enhanced scoring system
          (
            -- Exact phrase bonus (highest priority)
            CASE WHEN LOWER(r.title || ' ' || r.researcher || ' ' || r.abstract || ' ' || r.category) 
                 LIKE '%' || $1 || '%' THEN 50 ELSE 0 END +
            
            -- Title matches (high priority)
            (CASE WHEN similarity(LOWER(r.title), $1) > 0.1 THEN similarity(LOWER(r.title), $1) * 30 ELSE 0 END) +
            
            -- Researcher matches (high priority)
            (CASE WHEN similarity(LOWER(r.researcher), $1) > 0.1 THEN similarity(LOWER(r.researcher), $1) * 25 ELSE 0 END) +
            
            -- Abstract matches (medium priority)
            (CASE WHEN similarity(LOWER(r.abstract), $1) > 0.1 THEN similarity(LOWER(r.abstract), $1) * 15 ELSE 0 END) +
            
            -- Category matches (medium priority)
            (CASE WHEN similarity(LOWER(r.category), $1) > 0.1 THEN similarity(LOWER(r.category), $1) * 20 ELSE 0 END) +
            
            -- Document type matches (lower priority)
            (CASE WHEN similarity(LOWER(r.document_type), $1) > 0.1 THEN similarity(LOWER(r.document_type), $1) * 10 ELSE 0 END) +
            
            -- Individual word matches bonus
            (
              SELECT COALESCE(SUM(
                CASE 
                  WHEN LOWER(r.title) LIKE '%' || word || '%' THEN 8
                  WHEN LOWER(r.researcher) LIKE '%' || word || '%' THEN 6
                  WHEN LOWER(r.abstract) LIKE '%' || word || '%' THEN 4
                  WHEN LOWER(r.category) LIKE '%' || word || '%' THEN 5
                  WHEN LOWER(r.document_type) LIKE '%' || word || '%' THEN 2
                  WHEN LOWER(r.year::text) LIKE '%' || word || '%' THEN 3
                  ELSE 0
                END
              ), 0)
              FROM unnest($2::text[]) AS word
            ) +
            
            -- Ratings bonus (quality indicator)
            (r.ratings * 2)
            
          ) AS relevance_score,
          
          -- Match coverage (percentage of search terms found)
          (
            SELECT (COUNT(*)::float / array_length($2, 1)) * 100
            FROM unnest($2::text[]) AS word
            WHERE LOWER(r.title || ' ' || r.researcher || ' ' || r.abstract || ' ' || r.category || ' ' || r.document_type) 
                  LIKE '%' || word || '%'
          ) AS match_coverage
          
        FROM researches r
        JOIN institutions i ON CAST(i.id AS TEXT) = r.institution
        JOIN schools s ON CAST(s.id AS TEXT) = r.school
        WHERE r.status = 'Published'
          AND (
            -- Must match at least one search term
            EXISTS (
              SELECT 1 FROM unnest($2::text[]) AS word
              WHERE LOWER(r.title || ' ' || r.researcher || ' ' || r.abstract || ' ' || r.category || ' ' || r.document_type || ' ' || r.year::text) 
                    LIKE '%' || word || '%'
            )
            OR
            -- Or have good similarity scores
            similarity(LOWER(r.title), $1) > 0.2 OR
            similarity(LOWER(r.researcher), $1) > 0.2 OR
            similarity(LOWER(r.abstract), $1) > 0.15 OR
            similarity(LOWER(r.category), $1) > 0.3
          )
      )
      SELECT *
      FROM search_results
      WHERE relevance_score > 0 -- Only return results with some relevance
    `;

    const params: any[] = [searchValue.toLowerCase(), searchTerms];

    // Enhanced sorting logic
    if (sort) {
      if (sort === "new") {
        query += ` ORDER BY created_at DESC, relevance_score DESC`;
      } else if (sort === "trends") {
        query += ` ORDER BY ratings DESC, relevance_score DESC`;
      } else if (sort === "all") {
        query += ` ORDER BY relevance_score DESC, match_coverage DESC, ratings DESC`;
      } else if (sort === "recommends") {
        query += ` AND ratings > 2.5 ORDER BY ratings DESC, relevance_score DESC`;
      } else {
        // Default: best matches first
        query += ` ORDER BY relevance_score DESC, match_coverage DESC, ratings DESC, created_at DESC`;
      }
    } else {
      // Default sorting prioritizes relevance
      query += ` ORDER BY relevance_score DESC, match_coverage DESC, ratings DESC, created_at DESC`;
    }

    // Limit results to prevent overwhelming response
    query += ` LIMIT 100`;

    const result = await client.query(query, params);
    
    // Filter out very low relevance results
    const filteredResults = result.rows.filter((row: any ) => 
      row.relevance_score >= 1 || row.match_coverage >= 20
    );

    return NextResponse.json(filteredResults, { status: 200 });

  } catch (error) {
    console.error("Error retrieving researches:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}