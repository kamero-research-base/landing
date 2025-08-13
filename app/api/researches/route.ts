import { NextResponse } from "next/server";
import client from "../utils/db"; // Adjust path as needed

// Domain-specific related terms mapping
const DOMAIN_RELATIONSHIPS: Record<string, string[]> = {
  // Engineering & Construction
  "civil engineering": ["construction", "infrastructure", "buildings", "bridges", "structural", "concrete", "foundation", "geotechnical", "transportation", "highway", "urban planning", "surveying", "materials"],
  "mechanical engineering": ["machines", "mechanics", "thermodynamics", "robotics", "automation", "manufacturing", "design", "CAD", "materials", "dynamics", "fluids"],
  "electrical engineering": ["circuits", "electronics", "power systems", "signals", "telecommunications", "control systems", "semiconductors", "microprocessors"],
  "architecture": ["building design", "urban design", "landscape", "interior design", "sustainable design", "construction", "planning", "housing", "structures"],
  
  // Medical & Health
  "medicine": ["health", "medical", "clinical", "diagnosis", "treatment", "therapy", "patient care", "disease", "healthcare", "hospital"],
  "pregnancy": ["maternal health", "obstetrics", "prenatal", "childbirth", "midwifery", "reproductive health", "gynecology", "pediatrics", "neonatal"],
  "nursing": ["patient care", "healthcare", "clinical practice", "medical", "hospital", "health promotion", "community health"],
  
  // Technology & Computing
  "computer science": ["programming", "software", "algorithms", "data structures", "artificial intelligence", "machine learning", "databases", "networks", "cybersecurity"],
  "data science": ["analytics", "statistics", "machine learning", "big data", "visualization", "python", "R", "databases", "AI"],
  "web development": ["frontend", "backend", "javascript", "HTML", "CSS", "React", "Node.js", "database", "API", "responsive design"],
  
  // Business & Economics
  "business": ["management", "marketing", "finance", "economics", "entrepreneurship", "strategy", "operations", "leadership", "accounting"],
  "economics": ["finance", "markets", "trade", "policy", "macroeconomics", "microeconomics", "development", "statistics", "business"],
  "marketing": ["advertising", "branding", "digital marketing", "consumer behavior", "sales", "social media", "market research", "promotion"],
  
  // Sciences
  "biology": ["life sciences", "genetics", "ecology", "microbiology", "biochemistry", "molecular", "cell", "organisms", "evolution"],
  "chemistry": ["chemical", "reactions", "organic", "inorganic", "analytical", "physical chemistry", "biochemistry", "materials", "laboratory"],
  "physics": ["mechanics", "quantum", "thermodynamics", "electromagnetism", "optics", "relativity", "particles", "energy", "forces"],
  
  // Social Sciences
  "psychology": ["mental health", "behavior", "cognitive", "clinical", "developmental", "social psychology", "counseling", "therapy", "research"],
  "sociology": ["society", "social", "culture", "community", "demographics", "social behavior", "institutions", "research methods"],
  "education": ["teaching", "learning", "pedagogy", "curriculum", "assessment", "educational technology", "classroom", "students", "instruction"],
  
  // Environmental & Agricultural
  "agriculture": ["farming", "crops", "livestock", "soil", "irrigation", "sustainable agriculture", "food production", "horticulture", "agronomy"],
  "environmental": ["ecology", "sustainability", "climate", "conservation", "pollution", "renewable energy", "biodiversity", "natural resources"]
};

// Function to find related terms for a search query
function findRelatedTerms(searchQuery: string): string[] {
  const query = searchQuery.toLowerCase();
  const relatedTerms: Set<string> = new Set();
  
  // Check each domain for matches
  for (const [domain, terms] of Object.entries(DOMAIN_RELATIONSHIPS)) {
    // Check if query contains the domain or if domain contains the query
    if (domain.includes(query) || query.includes(domain)) {
      terms.forEach(term => relatedTerms.add(term));
      relatedTerms.add(domain);
    }
    
    // Check if query matches any of the related terms
    for (const term of terms) {
      if (term.includes(query) || query.includes(term)) {
        // Add all terms from this domain
        terms.forEach(t => relatedTerms.add(t));
        relatedTerms.add(domain);
        break;
      }
    }
  }
  
  // If no specific domain found, try to find partial matches
  if (relatedTerms.size === 0) {
    const queryWords = query.split(/\s+/);
    for (const word of queryWords) {
      if (word.length < 3) continue; // Skip very short words
      
      for (const [domain, terms] of Object.entries(DOMAIN_RELATIONSHIPS)) {
        if (domain.includes(word)) {
          terms.slice(0, 5).forEach(term => relatedTerms.add(term));
        }
        for (const term of terms) {
          if (term.includes(word)) {
            relatedTerms.add(term);
            if (relatedTerms.size > 10) break;
          }
        }
      }
    }
  }
  
  return Array.from(relatedTerms).slice(0, 15); // Return up to 15 related terms
}

export async function POST(req: Request) {
  let requestBody;
       
  // Safe JSON parsing
  try {
    requestBody = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON format in request." }, { status: 400 });
  }
 
  try {
    const { search, sort, getSuggestions } = requestBody;
 
    // Handle suggestions request (when no results found)
    if (getSuggestions && search) {
      const searchValue = search.trim().toLowerCase();
      const relatedTerms = findRelatedTerms(searchValue);
      
      // If we found related terms, use them for suggestions
      if (relatedTerms.length > 0) {
        const suggestionQuery = `
          WITH suggestions AS (
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
              
              -- Scoring based on related terms
              (
                SELECT COALESCE(SUM(
                  CASE 
                    WHEN LOWER(r.title) LIKE '%' || term || '%' THEN 10
                    WHEN LOWER(r.abstract) LIKE '%' || term || '%' THEN 7
                    WHEN LOWER(r.category) LIKE '%' || term || '%' THEN 8
                    WHEN LOWER(r.researcher) LIKE '%' || term || '%' THEN 5
                    ELSE 0
                  END
                ), 0)
                FROM unnest($1::text[]) AS term
              ) AS relevance_score,
              
              r.ratings AS quality_score
              
            FROM researches r
            JOIN institutions i ON CAST(i.id AS TEXT) = r.institution
            JOIN schools s ON CAST(s.id AS TEXT) = r.school
            WHERE r.status = 'Published'
              AND r.ratings > 2.0  -- Only suggest quality content
          )
          SELECT *
          FROM suggestions
          WHERE relevance_score > 0  -- Must match at least one related term
          ORDER BY relevance_score DESC, quality_score DESC
          LIMIT 10
        `;
        
        const suggestions = await client.query(suggestionQuery, [relatedTerms]);
        
        // If we found related suggestions, return them
        if (suggestions.rows.length > 0) {
          return NextResponse.json(suggestions.rows, { status: 200 });
        }
      }
      
      // Fallback: If no related terms found or no matches, return top-rated in similar categories
      const fallbackQuery = `
        WITH category_suggestions AS (
          SELECT DISTINCT r.category
          FROM researches r
          WHERE r.status = 'Published'
            AND (
              similarity(LOWER(r.category), $1) > 0.2 OR
              similarity(LOWER(r.title), $1) > 0.1
            )
          LIMIT 5
        )
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
          r.ratings AS relevance_score,
          100 AS match_coverage
        FROM researches r
        JOIN institutions i ON CAST(i.id AS TEXT) = r.institution
        JOIN schools s ON CAST(s.id AS TEXT) = r.school
        WHERE r.status = 'Published'
          AND r.ratings > 3.0
          AND (
            r.category IN (SELECT category FROM category_suggestions)
            OR r.ratings > 4.0  -- Include highly rated papers as last resort
          )
        ORDER BY 
          CASE WHEN r.category IN (SELECT category FROM category_suggestions) THEN 0 ELSE 1 END,
          r.ratings DESC,
          r.created_at DESC
        LIMIT 10
      `;
      
      const fallbackSuggestions = await client.query(fallbackQuery, [searchValue]);
      return NextResponse.json(fallbackSuggestions.rows, { status: 200 });
    }
 
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