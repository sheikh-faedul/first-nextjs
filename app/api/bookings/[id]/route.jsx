import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    try {
        const client= await clientPromise;
        const db = client.db("firstDB");
        const { id } = params;
        const result = await db.collection("checkout").deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            return new Response(JSON.stringify({ message: "Booking deleted successfully" }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        }
    } catch (err) {
            return new Response(JSON.stringify({ message: "Booking not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }
    };

    // PATCH FOR UPDATED CONFIRMED BUTTON
  
export async function PATCH(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("firstDB");

    const { id } = params;
    const { status } = await req.json(); // get status from request

    const result = await db.collection("checkout").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    return new Response(
      JSON.stringify({ modifiedCount: result.modifiedCount }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
