"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyBookings() {
    const router = useRouter();
    const { user, loading } = useAuth();

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (loading) return;
        if (!user) {
            router.push("/login");
            return;
        }

        fetch(`/api/bookings?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Bookings:", data);
                setBookings(data);
                console.log(data);
            })
            .catch((err) => {
                console.error("Failed to fetch bookings:", err);
            });
    }, [user, loading, router]);
    if (loading) {
        return <p className="p-5">Checking authentication...</p>;
    }
    // Handle delete booking

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
            const data = await res.json();

            if (res.ok) {
                setBookings((prev) => prev.filter((booking) => booking._id !== id));
            } else {
                alert(data.error || "Failed to delete booking");
            }
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    // handle confirm booking
    const handleConfirm = async (id) => {
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "confirmed" }), 
            });

            const data = await res.json();

            if (res.ok && data.modifiedCount > 0) { 
                setBookings((prev) =>
                    prev.map((booking) =>
                        booking._id === id ? { ...booking, status: "confirmed" } : booking
                    )
                );

                console.log("Booking confirmed:", data);
            } else {
                console.error("Confirm failed:", data.error || "Unknown error");
            }
        } catch (err) {
            console.error("Confirm failed:", err);
        }
    };





    return (
        <div className="p-5 max-w-4xl mx-auto">
            <h1 className="text-2xl text-center font-bold mb-5">
                My Bookings : {bookings.length}
            </h1>

            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <table className="w-full border-separate border-spacing-y-3 border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Actions</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Confirm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50">
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => handleDelete(booking._id)}
                                        className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        X
                                    </button>
                                </td>
                                <td className="px-4 py-2 font-semibold">{booking.name}</td>
                                <td className="px-4 py-2">{booking.email}</td>
                                <td className="px-4 py-2">{booking.checkInDate}</td>
                                <td>
                                    {booking.status === "confirmed" ? (
                                        <span className="text-blue-400 font-semibold">Confirmed</span>
                                    ) : (
                                        <button
                                            onClick={() => handleConfirm(booking._id)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded "
                                        >
                                            Confirm
                                        </button>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
