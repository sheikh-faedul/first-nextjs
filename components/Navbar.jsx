"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navitem = (
    <>
      <Link href="/" className="block px-4 py-2 hover:text-orange-400">
        Home
      </Link>
      <Link href="/about" className="block px-4 py-2 hover:text-orange-400">
        About
      </Link>
      {user?.email ? (
        <>
          <Link
            href="/bookings"
            className="block px-4 py-2 hover:text-orange-400"
          >
            My Bookings
          </Link>
          <button
            onClick={() => signOut(auth)}
            className="block px-4 py-2 hover:text-orange-400"
          >
            Log out
          </button>
        </>
      ) : (
        <Link href="/login" className="block px-4 py-2 hover:text-orange-400">
          Login
        </Link>
      )}
    </>
  );

  return (
    <nav className="bg-gray-800 text-white p-3">
      <div className="container mx-auto flex justify-between items-center">
        <Image src="/logo.svg" alt="Logo" width={60} height={60} />

        {/* Desktop Menu */}
        <div className="hidden md:flex font-bold items-center">
          {navitem}
        </div>

        <button className="hidden md:block p-2 px-4 text-white font-bold rounded-xl bg-orange-500 hover:bg-orange-600">
          Appointment
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 focus:outline-none"
        >
         {isOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}

        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 bg-gray-700 rounded-lg p-3">
          {navitem}
          <button className="w-full p-2 text-white font-bold rounded-xl bg-orange-500 hover:bg-orange-600">
            Appointment
          </button>
        </div>
      )}
    </nav>
  );
}
