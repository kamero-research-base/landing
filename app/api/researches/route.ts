import { NextResponse } from "next/server";
import client from "../utils/db"; // Adjust path as needed

// Domain-specific related terms mapping (expanded and improved)
const DOMAIN_RELATIONSHIPS: Record<string, string[]> = {
  // Engineering & Construction
  "civil engineering": ["construction", "infrastructure", "buildings", "bridges", "structural", "concrete", "foundation", "geotechnical", "transportation", "highway", "urban planning", "surveying", "materials", "earthquake", "seismic"],
  "mechanical engineering": ["machines", "mechanics", "thermodynamics", "robotics", "automation", "manufacturing", "design", "CAD", "materials", "dynamics", "fluids", "engine", "mechanical"],
  "electrical engineering": ["circuits", "electronics", "power systems", "signals", "telecommunications", "control systems", "semiconductors", "microprocessors", "electrical", "electronic"],
  "architecture": ["building design", "urban design", "landscape", "interior design", "sustainable design", "construction", "planning", "housing", "structures", "architectural"],
  
  // Medical & Health
  "medicine": ["health", "medical", "clinical", "diagnosis", "treatment", "therapy", "patient care", "disease", "healthcare", "hospital", "pharmaceutical", "drug"],
  "pregnancy": ["maternal health", "obstetrics", "prenatal", "childbirth", "midwifery", "reproductive health", "gynecology", "pediatrics", "neonatal", "fertility"],
  "nursing": ["patient care", "healthcare", "clinical practice", "medical", "hospital", "health promotion", "community health", "nurse", "nursing"],
  
  // Technology & Computing
  "computer science": ["programming", "software", "algorithms", "data structures", "artificial intelligence", "machine learning", "databases", "networks", "cybersecurity", "computing"],
  "data science": ["analytics", "statistics", "machine learning", "big data", "visualization", "python", "R", "databases", "AI", "data"],
  "web development": ["frontend", "backend", "javascript", "HTML", "CSS", "React", "Node.js", "database", "API", "responsive design", "web"],
  
  // Business & Economics
  "business": ["management", "marketing", "finance", "economics", "entrepreneurship", "strategy", "operations", "leadership", "accounting", "corporate"],
  "economics": ["finance", "markets", "trade", "policy", "macroeconomics", "microeconomics", "development", "statistics", "business", "economic"],
  "marketing": ["advertising", "branding", "digital marketing", "consumer behavior", "sales", "social media", "market research", "promotion"],
  
  // Sciences
  "biology": ["life sciences", "genetics", "ecology", "microbiology", "biochemistry", "molecular", "cell", "organisms", "evolution", "biological"],
  "chemistry": ["chemical", "reactions", "organic", "inorganic", "analytical", "physical chemistry", "biochemistry", "materials", "laboratory"],
  "physics": ["mechanics", "quantum", "thermodynamics", "electromagnetism", "optics", "relativity", "particles", "energy", "forces", "physical"],
  
  // Social Sciences
  "psychology": ["mental health", "behavior", "cognitive", "clinical", "developmental", "social psychology", "counseling", "therapy", "research", "psychological"],
  "sociology": ["society", "social", "culture", "community", "demographics", "social behavior", "institutions", "research methods", "sociological"],
  "education": ["teaching", "learning", "pedagogy", "curriculum", "assessment", "educational technology", "classroom", "students", "instruction", "educational"],
  
  // Environmental & Agricultural
  "agriculture": ["farming", "crops", "livestock", "soil", "irrigation", "sustainable agriculture", "food production", "horticulture", "agronomy", "agricultural"],
  "environmental": ["ecology", "sustainability", "climate", "conservation", "pollution", "renewable energy", "biodiversity", "natural resources", "environment"]
};

// Improved function to find related terms
function findRelatedTerms(searchQuery: string): string[] {
  const query = searchQuery.toLowerCase().trim();
  const relatedTerms: Set<string> = new Set();
  
  // ALWAYS include the original search term
  relatedTerms.add(query);
  
  // Direct domain matches - if query matches a domain exactly
  for (const [domain, terms] of Object.entries(DOMAIN_RELATIONSHIPS)) {
    if (domain === query || domain.includes(query) || query.includes(domain)) {
      relatedTerms.add(domain);
      // Add all related terms for exact domain matches
      terms.forEach(term => relatedTerms.add(term));
    }
  }
  
  // Check if query is a term in any domain
  for (const [domain, terms] of Object.entries(DOMAIN_RELATIONSHIPS)) {
    for (const term of terms) {
      if (term === query || term.includes(query) || query.includes(term)) {
        relatedTerms.add(domain);
        // Add related terms from the same domain
        terms.slice(0, 10).forEach(t => relatedTerms.add(t));
        break;
      }
    }
  }
  
  // Check individual words in the query for partial matches
  const queryWords = query.split(/\s+/).filter(word => word.length >= 3);
  
  for (const word of queryWords) {
    for (const [domain, terms] of Object.entries(DOMAIN_RELATIONSHIPS)) {
      // Check if word matches domain
      if (domain.includes(word)) {
        relatedTerms.add(domain);
        terms.slice(0, 5).forEach(term => relatedTerms.add(term));
      }
      
      // Check if word matches any term
      for (const term of terms) {
        if (term.includes(word) && term.length - word.length <= 3) { // Avoid too broad matches
          relatedTerms.add(term);
        }
      }
    }
  }
  
  // Ensure original query is always first
  const termsArray = Array.from(relatedTerms);
  const queryIndex = termsArray.indexOf(query);
  if (queryIndex > 0) {
    termsArray.splice(queryIndex, 1);
    termsArray.unshift(query);
  }
  
  return termsArray.slice(0, 25); // Increased to 25 for better coverage
}

export async function POST(req: Request) {
  let requestBody;
       
  try {
    requestBody = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON format in request." }, { status: 400 });
  }
 
  try {
    const { search, sort, getSuggestions } = requestBody;
 
    // Handle suggestions request (when no results found)
    if (getSuggestions && search) {
      console.log("Getting suggestions for:", search);
      
      const searchValue = search.trim().toLowerCase();
      const relatedTerms = findRelatedTerms(searchValue);
      
      console.log("Related terms found:", relatedTerms);
      
      // Simplified suggestion query using basic LIKE and ILIKE
      const suggestionQuery = `
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
          
          -- Improved scoring for exact and partial matches
          (
            -- Exact word match in title (highest priority)
            CASE 
              WHEN LOWER(r.title) LIKE '% ' || $1 || ' %' OR
                   LOWER(r.title) LIKE $1 || ' %' OR
                   LOWER(r.title) LIKE '% ' || $1 OR
                   LOWER(r.title) = $1 
              THEN 50 
              ELSE 0 
            END +
            -- Partial match in title
            CASE WHEN LOWER(r.title) LIKE '%' || $1 || '%' THEN 25 ELSE 0 END +
            -- Exact word match in category
            CASE 
              WHEN LOWER(r.category) LIKE '% ' || $1 || ' %' OR
                   LOWER(r.category) LIKE $1 || ' %' OR
                   LOWER(r.category) LIKE '% ' || $1 OR
                   LOWER(r.category) = $1 
              THEN 30 
              ELSE 0 
            END +
            -- Partial match in category
            CASE WHEN LOWER(r.category) LIKE '%' || $1 || '%' THEN 15 ELSE 0 END +
            -- Abstract matches
            CASE WHEN LOWER(r.abstract) LIKE '%' || $1 || '%' THEN 10 ELSE 0 END +
            -- Researcher matches
            CASE WHEN LOWER(r.researcher) LIKE '%' || $1 || '%' THEN 8 ELSE 0 END +
            -- Quality bonus (reduced to avoid overshadowing relevance)
            (r.ratings * 2)
          ) AS base_score,
          
          r.ratings AS quality_score
          
        FROM researches r
        JOIN institutions i ON CAST(i.id AS TEXT) = r.institution
        JOIN schools s ON CAST(s.id AS TEXT) = r.school
        WHERE r.status = 'Published'
          AND r.ratings > 1.0  -- Lowered to be more inclusive
          AND (
            LOWER(r.title || ' ' || r.category || ' ' || r.abstract || ' ' || r.researcher) LIKE '%' || $1 || '%'
          )
        ORDER BY base_score DESC, r.ratings DESC
        LIMIT 10  -- Increased from 5
      `;
      
      let suggestions = await client.query(suggestionQuery, [searchValue]);
      
      // If no direct matches and we have related terms, try those
      if (suggestions.rows.length === 0 && relatedTerms.length > 0) {
        console.log("Trying related terms search...");
        
        // The related terms are already ordered with most relevant first
        const relatedTermsToSearch = relatedTerms.slice(0, 20);
        
        // FIXED: Include the ORDER BY CASE expression in SELECT and remove DISTINCT
        const relatedTermsQuery = `
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
            
            -- Include the ordering expression in SELECT
            CASE 
              WHEN LOWER(r.title || ' ' || r.category || ' ' || r.abstract) LIKE '%' || $2 || '%' 
              THEN 0 
              ELSE 1 
            END AS original_match_order,
            
            (
              -- Prioritize papers that match the original search term or primary domain
              CASE 
                WHEN LOWER(r.title || ' ' || r.category || ' ' || r.abstract) LIKE '%' || $2 || '%' 
                THEN 100 
                ELSE 0 
              END +
              
              -- Score for matching related terms with weighted importance
              (
                SELECT SUM(
                  CASE 
                    -- First few terms in array are most important (original query and direct domain)
                    WHEN term_with_idx.idx <= 3 AND 
                         LOWER(r.title || ' ' || r.category) LIKE '%' || term_with_idx.term || '%'
                    THEN 20
                    -- Title matches are most valuable
                    WHEN LOWER(r.title) LIKE '%' || term_with_idx.term || '%'
                    THEN 15
                    -- Category matches are very important
                    WHEN LOWER(r.category) LIKE '%' || term_with_idx.term || '%'
                    THEN 12
                    -- Abstract matches
                    WHEN LOWER(r.abstract) LIKE '%' || term_with_idx.term || '%'
                    THEN 5
                    -- Researcher matches
                    WHEN LOWER(r.researcher) LIKE '%' || term_with_idx.term || '%'
                    THEN 3
                    ELSE 0
                  END
                )
                FROM (
                  SELECT term, row_number() OVER () as idx
                  FROM unnest($1::text[]) AS term
                ) term_with_idx
              ) +
              
              -- Small bonus for quality, but not dominant
              (r.ratings * 1.5)
            ) AS relevance_score,
            
            -- Count distinct matching terms
            (
              SELECT COUNT(DISTINCT term)
              FROM unnest($1::text[]) AS term
              WHERE LOWER(r.title || ' ' || r.category || ' ' || r.abstract || ' ' || r.researcher) 
                    LIKE '%' || term || '%'
            ) AS terms_matched
            
          FROM researches r
          JOIN institutions i ON CAST(i.id AS TEXT) = r.institution
          JOIN schools s ON CAST(s.id AS TEXT) = r.school
          WHERE r.status = 'Published'
            AND r.ratings >= 1.0  -- Very inclusive
            AND (
              -- Must match at least one related term
              EXISTS (
                SELECT 1
                FROM unnest($1::text[]) AS term
                WHERE LOWER(r.title || ' ' || r.category || ' ' || r.abstract || ' ' || r.researcher) 
                      LIKE '%' || term || '%'
              )
            )
          ORDER BY 
            original_match_order,
            relevance_score DESC,
            terms_matched DESC,
            r.year DESC
          LIMIT 30  -- Get more results for better variety
        `;
        
        // Pass both the related terms array and the original search value
        suggestions = await client.query(relatedTermsQuery, [relatedTermsToSearch, searchValue]);
      }
      
      // Final fallback: get top-rated papers from similar categories
      if (suggestions.rows.length === 0) {
        console.log("Using fallback suggestions...");
        
        const fallbackQuery = `
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
            1 AS terms_matched
          FROM researches r
          JOIN institutions i ON CAST(i.id AS TEXT) = r.institution
          JOIN schools s ON CAST(s.id AS TEXT) = r.school
          WHERE r.status = 'Published'
            AND r.ratings >= 2.0  -- Lowered threshold for more variety
          ORDER BY 
            r.created_at DESC,  -- Prioritize recent research
            r.ratings DESC
          LIMIT 20  -- Increased from 6 to 20
        `;
        
        suggestions = await client.query(fallbackQuery);
      }
      
      console.log("Returning", suggestions.rows.length, "suggestions");
      return NextResponse.json(suggestions.rows, { status: 200 });
    }
 
    // Main search logic (unchanged from your original)
    const searchValue = search ? search.trim() : "";
    if (!searchValue) {
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
 
    // Regular search logic (simplified to remove similarity function dependencies)
    const searchTerms = searchValue
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((term: string) => term.length > 0);
    
    if (searchTerms.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Simplified search query without similarity functions
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
          
          -- Simplified scoring system using only LIKE matches
          (
            -- Exact phrase bonus
            CASE WHEN LOWER(r.title || ' ' || r.researcher || ' ' || r.abstract || ' ' || r.category) 
                 LIKE '%' || $1 || '%' THEN 40 ELSE 0 END +
            
            -- Individual field matches
            CASE WHEN LOWER(r.title) LIKE '%' || $1 || '%' THEN 20 ELSE 0 END +
            CASE WHEN LOWER(r.researcher) LIKE '%' || $1 || '%' THEN 15 ELSE 0 END +
            CASE WHEN LOWER(r.category) LIKE '%' || $1 || '%' THEN 12 ELSE 0 END +
            CASE WHEN LOWER(r.abstract) LIKE '%' || $1 || '%' THEN 8 ELSE 0 END +
            CASE WHEN LOWER(r.document_type) LIKE '%' || $1 || '%' THEN 5 ELSE 0 END +
            
            -- Individual word matches
            (
              SELECT COALESCE(SUM(
                CASE 
                  WHEN LOWER(r.title) LIKE '%' || word || '%' THEN 6
                  WHEN LOWER(r.researcher) LIKE '%' || word || '%' THEN 4
                  WHEN LOWER(r.category) LIKE '%' || word || '%' THEN 4
                  WHEN LOWER(r.abstract) LIKE '%' || word || '%' THEN 2
                  WHEN LOWER(r.document_type) LIKE '%' || word || '%' THEN 1
                  ELSE 0
                END
              ), 0)
              FROM unnest($2::text[]) AS word
            ) +
            
            -- Quality bonus
            (r.ratings * 1.5)
            
          ) AS relevance_score,
          
          -- Match coverage
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
            EXISTS (
              SELECT 1 FROM unnest($2::text[]) AS word
              WHERE LOWER(r.title || ' ' || r.researcher || ' ' || r.abstract || ' ' || r.category || ' ' || r.document_type || ' ' || r.year::text) 
                    LIKE '%' || word || '%'
            )
          )
      )
      SELECT *
      FROM search_results
      WHERE relevance_score > 0
    `;

    const params: any[] = [searchValue.toLowerCase(), searchTerms];

    // Sorting
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
        query += ` ORDER BY relevance_score DESC, match_coverage DESC, ratings DESC, created_at DESC`;
      }
    } else {
      query += ` ORDER BY relevance_score DESC, match_coverage DESC, ratings DESC, created_at DESC`;
    }

    query += ` LIMIT 100`;

    const result = await client.query(query, params);
    
    const filteredResults = result.rows.filter((row: any) => 
      row.relevance_score >= 1 || row.match_coverage >= 15
    );

    return NextResponse.json(filteredResults, { status: 200 });

  } catch (error) {
    console.error("Error retrieving researches:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}