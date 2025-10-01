 'use client'
 import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container min-h-screen mt-5 flex flex-col lg:flex-row">
      <div className="lg:w-1/2 relative">
         <Image
          src="/about_us/person.jpg"
          alt="About Us"
          width={600}
          height={400}
          className=" w-3/4 rounded-lg shadow-2xl"
        />
        <Image
          src="/about_us/parts.jpg"
          alt="About Us"
          width={600}
          height={400}
          className="w-1/2 border-7 border-white absolute right-0 top-1/2 rounded-lg shadow-2xl"
        />
      </div>
      <div className='lg:w-1/2 space-y-5 p-3'>
                <h3 className='text-3xl font-bold text-amber-700'>About Us</h3>
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className=" p-2 text-black font-bold rounded-xl bg-orange-500 hover:bg-orange-600">Get More Info</button>
                </div>
    </div>
  );
}
