import clientPromise from "@/lib/mongodb";

export async function GET()  {  
    try {
        const client = await clientPromise;
        const db = client.db("firstDB");
        const services = await db.collection("services").find({}).toArray();
        return new Response(JSON.stringify(services), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }catch (e) {
        console.error(e);
        return new Response("Internal Server Error", { status: 500 });
    }
}