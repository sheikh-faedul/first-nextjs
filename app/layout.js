
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";



export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </AuthProvider>
      </body>
    </html>

  );
}
