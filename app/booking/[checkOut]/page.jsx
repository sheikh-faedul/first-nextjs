"use client";
import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import {   useEffect, useState } from "react";
import Swal from "sweetalert2";


export default function BookingPage() {
  const { checkOut } = useParams();  
  const { user } = useAuth();
  const router = useRouter();
  const [service, setService] = useState(null);

  useEffect(() => {

    fetch(`/api/services/${checkOut}`)  
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        console.log(data);
      });
  }, [checkOut]);

  if (!service) return <p className="p-5">Loading...</p>;

  const handleCheckOut = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const checkInDate = form.checkInDate.value;
    const price = form.price.value; 
    const checkOut ={
      name,
      email,
      checkInDate,
      price,
    }
    console.log(checkOut);

    // POST DATA TO THE SERVER API

    fetch('/api/bookings',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(checkOut)
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.insertedId){
               Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Added successfully',
            confirmButtonText: 'OK'
        })
      }
      form.reset();
      router.push('/');
    })
  }

  return (
    <div className="p-5 max-w-screen md:max-w-screen-lg mx-auto">
      <h1 className="text-2xl text-center font-bold mb-4">{service.title}</h1>
      <img src={service.img} alt={service.title} className="w-full rounded-lg" />
       

      <form onSubmit={handleCheckOut} className="mt-4 space-y-4">
        <div className="m-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input type="text" name="name" placeholder="Your Name" defaultValue={service?.name} className="border p-2 rounded" />
          </div>
          <div>
            <input type="date" name="checkInDate" required placeholder="Your Check-in Date" className="border p-2 rounded" />
          </div>
          <div>
            <input type="email" name="email" placeholder="Your Email" defaultValue={user?.email} className="border p-2 rounded" />
          </div>

          <div>
            <input type="text" name="price" placeholder="price" defaultValue={'$'+ service.price} className="border p-2 rounded" />
          </div>
        </div>

        <input className=" p-2 w-full text-black font-semibold rounded-lg bg-orange-500 hover:bg-orange-600" type="submit" value="Confirm Booking" />
      </form>
    </div>
  );
}
