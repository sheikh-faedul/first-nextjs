import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-8">
            <div className=" flex flex-col gap-4 md:flex-row justify-between container mx-auto mb-4">
                <div >
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="mb-5"
                    />
                    <p>
                        ACME Industries Ltd.
                        <br />
                        Providing reliable tech since 1992
                    </p>
                </div>
                <div className="flex flex-col">
                    <h6>Services</h6>
                    <a href="/branding">Branding</a>
                    <a href="/design">Design</a>
                    <a href="/marketing">Marketing</a>
                    <a href="/advertisement">Advertisement</a>
                </div>
                <div className="flex flex-col">
                    <h6>Company</h6>
                    <Link href="/about">About us</Link>
                    <a href="/contact">Contact</a>
                    <a href="/jobs">Jobs</a>
                    <a href="/press-kit">Press kit</a>
                </div>
                <div className="flex flex-col">
                    <h6>Resources</h6>
                    <a href="/blog">Blog</a>
                    <a href="/docs">Documentation</a>
                    <a href="/tutorials">Tutorials</a>
                    <a href="/faq">FAQ</a>
                </div>
            </div>

            <div className="container mx-auto text-center w-full">
                &copy; {new Date().getFullYear()} MyApp. All rights reserved.
            </div>
        </footer>
    );
}