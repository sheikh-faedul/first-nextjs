"use client";
 
import Image from "next/image";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";

export default function ServicesPage() {

    const [service,setService] = useState([]);

    const router = useRouter();

    useEffect(() => {
        fetch("/api/services")
            .then((res) => res.json())
            .then((data) => setService(data));
    }, []);

    return (
        
        <div>
            <h1 className="text-3xl font-bold text-center p-5">Services</h1>
            <ul className=" p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                {service.map((service) => (
                  <div className="shadow-lg rounded-lg" key={service._id}>
                    <Image className="rounded-lg" src={service.img} alt={service.img} width={500} height={300} unoptimized />
                    <h2 className="text-xl font-semibold">{service.title}</h2>
                    <div className="p-1 flex justify-between items-center">
                        <p className=" text-lg font-medium">${service.price}</p>
                        <button onClick={() => router.push(`/booking/${service._id}`)} className="btn p-2 text-white font-medium rounded-xl bg-orange-500 hover:bg-orange-600">Add to Cart</button>
                    </div>
                  </div>
                   
                ))}
            </ul>
        </div>
        
    );
}
