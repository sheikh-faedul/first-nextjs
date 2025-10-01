'use client';
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {  useState } from "react";

export default function LoginPage() {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const router = useRouter();

   const handleSubmit = async (e) => {
     e.preventDefault();

     try {
       await signInWithEmailAndPassword(auth, email, password);
       router.push('/');
       console.log('User logged in successfully', { email, password });
     } catch (error) {
       console.error('Login error:', error);
     }
   };

  return (
    <div className="w-1/4 mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="enter your email"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="enter your password"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
        >
          Login
        </button>
      </form>
      <p className="flex justify-around mt-2">New here? <Link href="/singup" className="text-blue-500"> Sing up</Link></p>
    </div>
  );
}
