import client from "../../utils/db"; // Adjust the path to your database client
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  let requestBody;

  // Safe JSON parsing
  try {
    requestBody = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON format in request." }, { status: 400 });
  }

  const { id } = requestBody;

  if (!id) {
    return NextResponse.json({ message: "Research ID is required." }, { status: 400 });
  }

  try {
    // ✅ SQL Query: Update Reviews & Scale Ratings with 5000 Max
    let query = `
      UPDATE researches 
      SET 
        reviews = reviews + 1 , 
        ratings = LEAST((reviews * 5.0) / 100, 5.0)
      WHERE hashed_id = $1 
      RETURNING *;
    `;

    // Execute query
    const researchResult = await client.query(query, [id]);

    // ✅ Check if the research exists
    if (researchResult.rows.length === 0) {
      return NextResponse.json({ message: "Research not found." }, { status: 404 });
    }

    // ✅ Return updated research
    return NextResponse.json(researchResult.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error updating research:", error);
    return NextResponse.json({ message: "Error updating Research", error: (error as Error).message }, { status: 500 });
  }
}
