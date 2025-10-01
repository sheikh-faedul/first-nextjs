import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("firstDB");

    // parse incoming JSON
    const body = await req.json();

    // Insert into "checkout" collection
    const result = await db.collection("checkout").insertOne(body);

    return new Response(
      JSON.stringify({ insertedId: result.insertedId }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// GET DATA FROM THIS COLLECTION BY SEARCH_PARAMS EMAIL
export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("firstDB");
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const query = email ? { email } : {};
    const myBookings = await db
      .collection("checkout")
      .find(query)
      .toArray();

    return new Response(
      JSON.stringify(myBookings),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
